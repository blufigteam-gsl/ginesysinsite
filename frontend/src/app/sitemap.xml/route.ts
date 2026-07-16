import { NextRequest } from 'next/server'
import { client } from '@/lib/sanity'

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET(request: NextRequest) {
  // Dynamically detect the host (localhost vs live production)
  const host = request.headers.get('host') || 'www.ginesys.in'
  const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https')
  const baseUrl = `${protocol}://${host}`

  // Fetch blogs from Sanity
  const blogs = await client.fetch(`
    *[_type == "blog" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }
  `)

  // Base XML headers linking the XSL stylesheet
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  xml += `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  // Add home path
  xml += `  <url>\n`
  xml += `    <loc>${escapeXml(baseUrl)}</loc>\n`
  xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`
  xml += `    <changefreq>daily</changefreq>\n`
  xml += `    <priority>1.0</priority>\n`
  xml += `  </url>\n`

  // Add blog page path
  xml += `  <url>\n`
  xml += `    <loc>${escapeXml(`${baseUrl}/blog`)}</loc>\n`
  xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`
  xml += `    <changefreq>daily</changefreq>\n`
  xml += `    <priority>0.8</priority>\n`
  xml += `  </url>\n`

  // Map each blog post route
  blogs.forEach((blog: any) => {
    xml += `  <url>\n`
    xml += `    <loc>${escapeXml(`${baseUrl}/blog/${blog.slug}`)}</loc>\n`
    xml += `    <lastmod>${new Date(blog._updatedAt).toISOString()}</lastmod>\n`
    xml += `    <changefreq>weekly</changefreq>\n`
    xml += `    <priority>0.7</priority>\n`
    xml += `  </url>\n`
  })

  xml += `</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
