import { client } from "@/lib/sanity";
import { BLOG_DETAIL_QUERY } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import { notFound } from "next/navigation";

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

    if (!blog) {
        notFound();
    }

    return (
        <main
            style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "60px 20px",
            }}
        >

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

            <h1
                style={{
                    fontSize: "42px",
                    marginBottom: "20px",
                }}
            >
                {blog.title}
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "20px",
                    color: "#666",
                    flexWrap: "wrap",
                }}
            >

                {blog.author?.name && (
                    <span>
                        {blog.author.name}
                    </span>
                )}

                {blog.readingTime && (
                    <span>
                        {blog.readingTime}
                    </span>
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

            <div
                dangerouslySetInnerHTML={{
                    __html: blog.content || "",
                }}
            />

            {blog.categories?.length > 0 && (
                <>
                    <h3
                        style={{
                            marginTop: "40px",
                            marginBottom: "10px",
                        }}
                    >
                        Categories
                    </h3>

                    <div>
                        {blog.categories.map(
                            (category: any) => (
                                <span
                                    key={category.title}
                                    style={{
                                        marginRight: "10px",
                                    }}
                                >
                                    {category.title}
                                </span>
                            )
                        )}
                    </div>
                </>
            )}

            {blog.tags?.length > 0 && (
                <>
                    <h3
                        style={{
                            marginTop: "30px",
                            marginBottom: "10px",
                        }}
                    >
                        Tags
                    </h3>

                    <div>
                        {blog.tags.map(
                            (tag: any) => (
                                <span
                                    key={tag.title}
                                    style={{
                                        marginRight: "10px",
                                    }}
                                >
                                    #{tag.title}
                                </span>
                            )
                        )}
                    </div>
                </>
            )}

        </main>
    );
}