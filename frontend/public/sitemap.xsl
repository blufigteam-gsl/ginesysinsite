<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/rec-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #444;
            margin: 0;
            padding: 40px;
            background: #fdfdfd;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          h1 {
            font-size: 26px;
            margin-bottom: 5px;
            color: #111;
            font-weight: 700;
          }
          p {
            color: #666;
            margin-bottom: 30px;
            font-size: 15px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            background: #fff;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #eee;
          }
          th {
            background: #f8f9fa;
            text-align: left;
            padding: 14px 18px;
            font-weight: 600;
            color: #222;
            border-bottom: 2px solid #eaeaea;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
          }
          td {
            padding: 14px 18px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 13.5px;
          }
          tr:hover td {
            background: #fafafa;
          }
          a {
            color: #65cb00;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            color: #57ad00;
            text-decoration: underline;
          }
          .highlight {
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>XML Sitemap</h1>
          <p>This sitemap contains <strong style="color: #65cb00;"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URLs. Generated dynamically from Sanity CMS.</p>
          <table>
            <thead>
              <tr>
                <th width="65%">URL Location</th>
                <th width="15%">Last Modified</th>
                <th width="10%">Frequency</th>
                <th width="10%">Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td class="highlight">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <strong style="color: #444;"><xsl:value-of select="sitemap:priority"/></strong>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
