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
                        dangerouslySetInnerHTML={{
                            __html: blog.content || "",
                        }}
                    />

                    {blog.tags?.length > 0 && (
                        <>
                            <h3
                                style={{
                                    marginTop: "40px",
                                    marginBottom: "10px",
                                }}
                            >
                                Tags
                            </h3>

                            <div>
                                {blog.tags.map((tag: any) => (
                                    <Link
                                        key={tag.title}
                                        href={`/blog?tag=${encodeURIComponent(
                                            tag.title
                                        )}`}
                                        style={{
                                            display: "inline-block",
                                            marginRight: "10px",
                                            marginBottom: "10px",
                                            padding: "8px 14px",
                                            background: "#f5f5f5",
                                            borderRadius: "30px",
                                            textDecoration: "none",
                                            color: "#222",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {tag.title}
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
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
                            fontSize: "32px",
                            lineHeight: "1.2",
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
                            style={{
                                display: "block",
                                padding: "14px 18px",
                                background: "#f5f5f5",
                                marginBottom: "8px",
                                textDecoration: "none",
                                color: "#222",
                                fontWeight: "600",
                                borderRadius: "4px",
                            }}
                        >
                            {category.title}
                        </Link>
                    ))}
                </aside>
            </div>
        </main>
    );
}