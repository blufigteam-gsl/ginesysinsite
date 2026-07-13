"use client";

import React, { useState } from "react";
import "./resourceTabs.css";
import { urlFor } from "@/lib/sanity";

type ResourceItem = {
    title: string;
    slug: string;
    featuredImage?: any;
    dateText?: string;
    footerText?: string;
    link: string;
};

type ResourceTabsClientProps = {
    heading?: any;
    subHeading?: any;
    initialBlogs: ResourceItem[];
    initialEvents: ResourceItem[];
    backgroundColor?: string;
    textColor?: string;
    paddingTop?: number;
    paddingBottom?: number;
};

export default function ResourceTabsClient({
    heading,
    subHeading,
    initialBlogs = [],
    initialEvents = [],
    backgroundColor = "#ffffff",
    textColor = "#111111",
    paddingTop = 60,
    paddingBottom = 60,
}: ResourceTabsClientProps) {
    const [activeTab, setActiveTab] = useState<"blogs" | "events" | "news" | "videos">("blogs");

    // Heading fallbacks
    const isHeadingObj = typeof heading === "object" && heading !== null;
    const headingText = isHeadingObj ? heading.text : heading;
    const HeadingTag: any = isHeadingObj ? (heading.tag || "h2") : "h2";
    const headingColor = isHeadingObj ? heading.color : undefined;

    const isSubHeadingObj = typeof subHeading === "object" && subHeading !== null;
    const subHeadingText = isSubHeadingObj ? subHeading.text : subHeading;
    const subHeadingColor = isSubHeadingObj ? subHeading.color : undefined;
    const subHeadingOpacity = isSubHeadingObj ? ((subHeading.opacity ?? 70) / 100) : undefined;

    // Determine what to display
    const getActiveItems = () => {
        switch (activeTab) {
            case "blogs":
                return initialBlogs;
            case "events":
                return initialEvents;
            case "news":
            case "videos":
            default:
                return [];
        }
    };

    const currentItems = getActiveItems();

    return (
        <section
            className="resource-tabs-section"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
                paddingTop: `${paddingTop}px`,
                paddingBottom: `${paddingBottom}px`,
            }}
        >
            <div className="resource-tabs-container">
                {/* Header */}
                {(headingText || subHeadingText) && (
                    <div className="resource-tabs-header">
                        {subHeadingText && (
                            <span
                                className="resource-tabs-subheading"
                                style={{
                                    color: subHeadingColor || textColor,
                                    opacity: subHeadingOpacity ?? 0.7,
                                }}
                            >
                                {subHeadingText}
                            </span>
                        )}
                        {headingText && (
                            <HeadingTag
                                className="resource-tabs-heading"
                                style={{
                                    color: headingColor || textColor,
                                }}
                            >
                                {headingText}
                            </HeadingTag>
                        )}
                    </div>
                )}

                {/* Tab Pill Controllers */}
                <div className="resource-tabs-controller">
                    <button
                        className={`resource-tab-pill ${activeTab === "blogs" ? "active" : ""}`}
                        onClick={() => setActiveTab("blogs")}
                    >
                        Blogs
                    </button>
                    <button
                        className={`resource-tab-pill ${activeTab === "events" ? "active" : ""}`}
                        onClick={() => setActiveTab("events")}
                    >
                        Events
                    </button>
                    <button
                        className={`resource-tab-pill ${activeTab === "news" ? "active" : ""}`}
                        onClick={() => setActiveTab("news")}
                    >
                        News
                    </button>
                    <button
                        className={`resource-tab-pill ${activeTab === "videos" ? "active" : ""}`}
                        onClick={() => setActiveTab("videos")}
                    >
                        Videos
                    </button>
                </div>

                {/* Content Grid */}
                {currentItems.length > 0 ? (
                    <div className="resources-grid">
                        {currentItems.map((item, idx) => {
                            const imgUrl = item.featuredImage ? urlFor(item.featuredImage).url() : null;
                            return (
                                <a key={idx} href={item.link} className="resource-card">
                                    <div className="resource-card-img-wrap">
                                        {imgUrl ? (
                                            <img
                                                src={imgUrl}
                                                alt={item.title}
                                                className="resource-card-img"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="resource-card-content">
                                        {item.dateText && (
                                            <span className="resource-card-meta">{item.dateText}</span>
                                        )}
                                        <h3 className="resource-card-title">{item.title}</h3>
                                        {item.footerText && (
                                            <div className="resource-card-footer">
                                                <span>{item.footerText}</span>
                                                <span>Read More →</span>
                                            </div>
                                        )}
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <div className="resources-grid">
                        <div className="resources-empty-state">
                            <p className="resources-empty-title">
                                {activeTab === "news" || activeTab === "videos"
                                    ? `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Coming Soon!`
                                    : `No ${activeTab} found.`}
                            </p>
                            <p className="resources-empty-desc">
                                {activeTab === "news" || activeTab === "videos"
                                    ? "We are currently setting up these content types and will post updates shortly."
                                    : "Please check back later."}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
