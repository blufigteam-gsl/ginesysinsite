import Link from "next/link";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";

import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";

import "./blog.css";

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        category?: string;
        tag?: string;
    }>;
}) {

    const params = await searchParams;

    const currentPage = Number(params.page || 1);
    const selectedCategory = params.category || "";
    const selectedTag = params.tag || "";

    const pageSize = 6;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const categoryFilter = selectedCategory
        ? ` && "${selectedCategory}" in categories[]->title`
        : "";

    const tagFilter = selectedTag
        ? ` && "${selectedTag}" in tags[]->title`
        : "";

    const blogs = await client.fetch(`
        *[
            _type == "blog"
            ${categoryFilter}
            ${tagFilter}
        ]
        | order(publishDate desc)
        [${start}...${end}]{
            _id,
            title,
            slug,
            excerpt,
            publishDate,
            readingTime,
            featuredImage,
            featuredImageAlt,
            author->{
                name,
                profileImage
            }
        }
    `);

    const totalBlogs = await client.fetch(`
        count(
            *[
                _type == "blog"
                ${categoryFilter}
                ${tagFilter}
            ]
        )
    `);

    const totalPages =
        Math.ceil(totalBlogs / pageSize);

    const featuredBlogs = await client.fetch(`
        *[
            _type == "blog" &&
            featuredBlog == true
        ]
        | order(publishDate desc)[0...6]{
            _id,
            title,
            slug,
            featuredImage,
            featuredImageAlt
        }
    `);

    const categories = await client.fetch(`
        *[_type == "category"]
        | order(title asc){
            _id,
            title
        }
    `);

    return (
        <main className="blog-page">

            <div className="blog-filter">

                <h2>
                    View Posts by Category
                </h2>

                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                />

            </div>

            <div className="blog-layout">

                <div className="blog-left">

                    <div className="blog-grid">

                        {blogs.map((blog: any) => (
                            <article
                                key={blog._id}
                                className="blog-card"
                            >

                                {blog.featuredImage && (
                                    <img
                                        src={urlFor(blog.featuredImage)
                                            .width(600)
                                            .height(350)
                                            .url()}
                                        alt={
                                            blog.featuredImageAlt ||
                                            blog.title
                                        }
                                    />
                                )}

                                <h2>
                                    <Link
                                        href={`/blog/${blog.slug.current}`}
                                    >
                                        {blog.title}
                                    </Link>
                                </h2>

                                <p>
                                    {blog.excerpt}
                                </p>

                                <div className="blog-meta">

                                    {blog.author?.profileImage ? (
                                        <img
                                            src={urlFor(blog.author.profileImage)
                                                .width(40)
                                                .height(40)
                                                .url()}
                                            alt={blog.author?.name}
                                            className="author-avatar"
                                        />
                                    ) : (
                                        <div className="author-avatar-placeholder" />
                                    )}

                                    <span>
                                        {blog.author?.name || "Ginesys"}
                                    </span>

                                    {blog.readingTime && (
                                        <span>
                                            {blog.readingTime}
                                        </span>
                                    )}

                                    <span>
                                        {new Date(
                                            blog.publishDate
                                        ).toLocaleDateString()}
                                    </span>

                                </div>

                            </article>
                        ))}

                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        basePath="/blog"
                        searchParams={
                            selectedCategory
                                ? {
                                    category:
                                        selectedCategory,
                                }
                                : {}
                        }
                    />

                </div>

                <aside className="blog-sidebar">

                    <h3>
                        Most Popular Blogs
                    </h3>

                    {featuredBlogs.map(
                        (blog: any) => (

                            <div
                                key={blog._id}
                                className="sidebar-blog"
                            >

                                {blog.featuredImage && (
                                    <img
                                        src={urlFor(blog.featuredImage)
                                            .width(120)
                                            .height(80)
                                            .url()}
                                        alt={blog.title}
                                    />
                                )}

                                <Link
                                    href={`/blog/${blog.slug.current}`}
                                >
                                    {blog.title}
                                </Link>

                            </div>

                        )
                    )}

                </aside>

            </div>

        </main>
    );
}