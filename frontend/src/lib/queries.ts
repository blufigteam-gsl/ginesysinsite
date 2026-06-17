export const BLOG_PAGE_QUERY = `
{
  "blogs": *[_type == "blog"] | order(publishDate desc){
    _id,
    title,
    slug,
    excerpt,
    publishDate,
    readingTime,
    featuredImage,
    featuredImageAlt,

    author->{
      name
    },

    categories[]->{
      _id,
      title
    }
  },

  "featuredBlogs": *[
    _type == "blog" &&
    featuredBlog == true
  ] | order(publishDate desc)[0...6]{
    _id,
    title,
    slug,
    featuredImage,
    featuredImageAlt
  },

  "categories": *[_type == "category"]{
    _id,
    title
  }
}
`;

export const BLOG_DETAIL_QUERY = `
*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  content,
  portableContent,
  publishDate,
  readingTime,
  featuredImage,
  featuredImageAlt,
  bannerImage,
  author->{
    name,
    profileImage
  },
  categories[]->{
    title
  },
  tags[]->{
    title
  }
}
`