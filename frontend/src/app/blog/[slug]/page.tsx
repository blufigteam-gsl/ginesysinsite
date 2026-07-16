import Link from "next/link";
import { client } from "@/lib/sanity";
import { BLOG_DETAIL_QUERY } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import { notFound } from "next/navigation";

import "./blog-detail.css"

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const blog = await client.fetch(
        BLOG_DETAIL_QUERY,
        { slug }
    );

    const categories = await client.fetch(`
        *[_type == "category"]
        | order(title asc){
            _id,
            title
        }
    `);

    if (!blog) {
        notFound();
    }

    const prevNext = await client.fetch(`
        {
            "prev": *[_type == "blog" && publishDate < $currentDate] | order(publishDate desc)[0]{
                title,
                "slug": slug.current
            },
            "next": *[_type == "blog" && publishDate > $currentDate] | order(publishDate asc)[0]{
                title,
                "slug": slug.current
            }
        }
    `, { currentDate: blog.publishDate || "" });

    return (
        <main
            style={{
                maxWidth: "1320px",
                margin: "0 auto",
                padding: "60px 20px",
            }}
        >
            <div className="blog-detail-layout">
                {/* LEFT CONTENT */}
                <div>

                    <h1
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        {blog.title}
                    </h1>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            marginBottom: "20px",
                            color: "#666",
                            flexWrap: "wrap",
                        }}
                    >

                        {blog.author?.profileImage && (
                            <img
                                src={urlFor(blog.author.profileImage)
                                    .width(50)
                                    .height(50)
                                    .url()}
                                alt={blog.author.name}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                        )}

                        {blog.author?.name && (
                            <span
                                style={{
                                    fontWeight: "600",
                                }}
                            >
                                {blog.author.name}
                            </span>
                        )}

                        {blog.readingTime && (
                            <span>{blog.readingTime}</span>
                        )}

                        {blog.publishDate && (
                            <span>
                                {new Date(
                                    blog.publishDate
                                ).toLocaleDateString()}
                            </span>
                        )}

                    </div>

                    {blog.excerpt && (
                        <p
                            style={{
                                fontSize: "20px",
                                marginBottom: "30px",
                                color: "#555",
                            }}
                        >
                            {blog.excerpt}
                        </p>
                    )}

                    {blog.featuredImage && (
                        <img
                            src={urlFor(blog.featuredImage)
                                .width(1200)
                                .url()}
                            alt={
                                blog.featuredImageAlt ||
                                blog.title
                            }
                            style={{
                                width: "100%",
                                borderRadius: "12px",
                                marginBottom: "30px",
                            }}
                        />
                    )}

                    <div
                        className="blog-content-body"
                        dangerouslySetInnerHTML={{
                            __html: blog.content || "",
                        }}
                    />

                    {/* Tags Box */}
                    {blog.tags?.length > 0 && (
                        <div className="blog-tags-box">
                            <h3 className="blog-tags-title">Tags</h3>
                            <div className="blog-tags-list">
                                {blog.tags.map((tag: any) => (
                                    <Link
                                        key={tag.title}
                                        href={`/blog?tag=${encodeURIComponent(tag.title)}`}
                                        className="blog-tag-link"
                                    >
                                        {tag.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation & Share Row */}
                    <div className="blog-footer-nav-share">
                        {/* Prev / Next Buttons */}
                        <div className="blog-nav-buttons">
                            {prevNext?.prev ? (
                                <Link href={`/blog/${prevNext.prev.slug}`} className="blog-nav-btn prev-btn">
                                    PREVIOUS
                                </Link>
                            ) : (
                                <span className="blog-nav-btn prev-btn disabled">PREVIOUS</span>
                            )}
                            {prevNext?.next ? (
                                <Link href={`/blog/${prevNext.next.slug}`} className="blog-nav-btn next-btn">
                                    NEXT
                                </Link>
                            ) : (
                                <span className="blog-nav-btn next-btn disabled">NEXT</span>
                            )}
                        </div>

                        {/* Share Widget */}
                        <div className="blog-share-widget">
                            <span className="blog-share-label">Share</span>
                            <div className="blog-share-links">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.ginesys.in/blog/${slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-icon share-facebook"
                                    title="Share on Facebook"
                                >
                                    <svg viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.ginesys.in/blog/${slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-icon share-linkedin"
                                    title="Share on LinkedIn"
                                >
                                    <svg viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://www.ginesys.in/blog/${slug}`)}&text=${encodeURIComponent(blog.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-icon share-twitter"
                                    title="Share on X"
                                >
                                    <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${blog.title} - https://www.ginesys.in/blog/${slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-icon share-whatsapp"
                                    title="Share on WhatsApp"
                                >
                                    <svg viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                                </a>
                                <a
                                    href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(`Check out this blog: https://www.ginesys.in/blog/${slug}`)}`}
                                    className="share-icon share-email"
                                    title="Share via Email"
                                >
                                    <svg viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <aside
                    style={{
                        position: "sticky",
                        top: "120px",
                    }}
                >
                    <h3
                        style={{
                            marginBottom: "25px",
                        }}
                    >
                        View Blogs By Category
                    </h3>

                    {categories.map((category: any) => (
                        <Link
                            key={category._id}
                            href={`/blog?category=${encodeURIComponent(
                                category.title
                            )}`}
                            className="sidebar-category-link"
                        >
                            {category.title}
                        </Link>
                    ))}
                </aside>
            </div>
        </main>
    );
}