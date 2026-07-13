import React from "react";
import "./splitCardHero.css";
import { urlFor } from "@/lib/sanity";

type SplitCardHeroProps = {
    subHeading?: {
        text?: string;
        color?: string;
        opacity?: number;
    } | string;
    heading?: {
        text?: string;
        tag?: string;
        color?: string;
    } | string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    contentCardBg?: string;
    contentCardTextColor?: string;
    image?: any;
    mediaCardBg?: string;
    reverse?: boolean;
    paddingTop?: number;
    paddingBottom?: number;
};

export default function SplitCardHero({
    subHeading,
    heading,
    description,
    buttonText,
    buttonLink,
    contentCardBg = "#0c453c",
    contentCardTextColor = "#ffffff",
    image,
    mediaCardBg = "#e5e7eb",
    reverse = false,
    paddingTop = 60,
    paddingBottom = 60,
}: SplitCardHeroProps) {
    const imageUrl = image ? urlFor(image).url() : null;

    // Heading fallbacks
    const isHeadingObj = typeof heading === "object" && heading !== null;
    const headingText = isHeadingObj ? heading.text : heading;
    const HeadingTag: any = isHeadingObj ? (heading.tag || "h2") : "h2";
    const headingColor = isHeadingObj ? heading.color : undefined;

    // Subheading fallbacks
    const isSubHeadingObj = typeof subHeading === "object" && subHeading !== null;
    const subHeadingText = isSubHeadingObj ? subHeading.text : subHeading;
    const subHeadingColor = isSubHeadingObj ? subHeading.color : undefined;
    const subHeadingOpacity = isSubHeadingObj ? ((subHeading.opacity ?? 100) / 100) : undefined;

    return (
        <section
            className="split-card-hero-section"
            style={{
                paddingTop: `${paddingTop}px`,
                paddingBottom: `${paddingBottom}px`,
            }}
        >
            <div className={`split-card-hero-container ${reverse ? "reverse" : ""}`}>
                {/* Content Card */}
                <div
                    className="split-card split-card-content-block"
                    style={{
                        backgroundColor: contentCardBg,
                        color: contentCardTextColor,
                    }}
                >
                    {subHeadingText && (
                        <span
                            className="split-card-subheading"
                            style={{
                                color: subHeadingColor || "inherit",
                                opacity: subHeadingOpacity ?? 0.8,
                            }}
                        >
                            {subHeadingText}
                        </span>
                    )}

                    {headingText && (
                        <HeadingTag
                            className="split-card-heading"
                            style={{
                                color: headingColor || "inherit",
                            }}
                        >
                            {headingText}
                        </HeadingTag>
                    )}

                    {buttonText && buttonLink && (
                        <div className="split-card-btn-wrap">
                            <a href={buttonLink} className="split-card-button">
                                {buttonText}
                            </a>
                        </div>
                    )}

                    {description && (
                        <p className="split-card-description">{description}</p>
                    )}
                </div>

                {/* Media Card */}
                <div
                    className="split-card split-card-media-block"
                    style={{
                        backgroundColor: mediaCardBg,
                    }}
                >
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={headingText || "Split Card media illustration"}
                            className="split-card-media-image"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
