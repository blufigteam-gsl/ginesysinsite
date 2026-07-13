import React from "react";
import { client } from "@/lib/sanity";
import ResourceTabsClient from "./ResourceTabsClient";

type ResourceItem = {
    title: string;
    slug: string;
    featuredImage?: any;
    dateText?: string;
    footerText?: string;
    link: string;
};

type ResourceTabsProps = {
    heading?: {
        text?: string;
        tag?: string;
        color?: string;
    } | string;
    subHeading?: {
        text?: string;
        color?: string;
        opacity?: number;
    } | string;
    limit?: number;
    backgroundColor?: string;
    textColor?: string;
    paddingTop?: number;
    paddingBottom?: number;
};

export default async function ResourceTabs({
    heading,
    subHeading,
    limit = 3,
    backgroundColor = "#ffffff",
    textColor = "#111111",
    paddingTop = 60,
    paddingBottom = 60,
}: ResourceTabsProps) {
    let blogs: ResourceItem[] = [];
    let events: ResourceItem[] = [];

    try {
        // Fetch Blogs on the server side
        const fetchedBlogs = await client.fetch(
            `*[_type == "blog"] | order(publishDate desc) [0...$limit] {
                title,
                "slug": slug.current,
                featuredImage,
                publishDate
            }`,
            { limit }
        );

        // Fetch Events on the server side
        const fetchedEvents = await client.fetch(
            `*[_type == "event"] | order(eventStartDate desc) [0...$limit] {
                title,
                "slug": slug.current,
                featuredImage,
                eventStartDate,
                venueName
            }`,
            { limit }
        );

        // Format Blogs
        blogs = (fetchedBlogs || []).map((b: any) => ({
            title: b.title,
            slug: b.slug,
            featuredImage: b.featuredImage,
            dateText: b.publishDate 
                ? new Date(b.publishDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })
                : undefined,
            footerText: "Blog Post",
            link: `/blog/${b.slug}`
        }));

        // Format Events
        events = (fetchedEvents || []).map((e: any) => ({
            title: e.title,
            slug: e.slug,
            featuredImage: e.featuredImage,
            dateText: e.eventStartDate 
                ? new Date(e.eventStartDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })
                : undefined,
            footerText: e.venueName || "Event",
            link: `/events/${e.slug}`
        }));
    } catch (error) {
        console.error("Error fetching resource tabs data on server:", error);
    }

    return (
        <ResourceTabsClient
            heading={heading}
            subHeading={subHeading}
            initialBlogs={blogs}
            initialEvents={events}
            backgroundColor={backgroundColor}
            textColor={textColor}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
        />
    );
}
