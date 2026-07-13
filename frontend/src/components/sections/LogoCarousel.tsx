"use client";

import "./logoCarousel.css";
import { urlFor } from "@/lib/sanity";

type LogoItem = {
    image?: any;
    altText?: string;
    link?: string;
};

type LogoCarouselProps = {
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
    logos?: LogoItem[];
    ctaText?: string;
    ctaLink?: string;
    backgroundColor?: string;
    textColor?: string;
    paddingTop?: number;
    paddingBottom?: number;
    speed?: number;
};

export default function LogoCarousel({
    heading,
    subHeading,
    logos = [],
    ctaText,
    ctaLink,
    backgroundColor = "#0c453c",
    textColor = "#ffffff",
    paddingTop = 60,
    paddingBottom = 60,
    speed = 30,
}: LogoCarouselProps) {
    const padTop = `${paddingTop}px`;
    const padBottom = `${paddingBottom}px`;
    const animationDuration = `${speed}s`;

    // To make a marquee infinite and seamless, we duplicate the logo list.
    // If the list is small, we duplicate it multiple times to fill screen width.
    const displayLogos = [...logos, ...logos, ...logos, ...logos];

    // Heading fallbacks
    const isHeadingObj = typeof heading === "object" && heading !== null;
    const headingText = isHeadingObj ? (heading as any).text : heading;
    const HeadingTag: any = isHeadingObj ? ((heading as any).tag || "h2") : "h2";
    const headingColor = isHeadingObj ? (heading as any).color : undefined;

    // Subheading fallbacks
    const isSubHeadingObj = typeof subHeading === "object" && subHeading !== null;
    const subHeadingText = isSubHeadingObj ? (subHeading as any).text : subHeading;
    const subHeadingColor = isSubHeadingObj ? (subHeading as any).color : "rgba(255,255,255,0.7)";
    const subHeadingOpacity = isSubHeadingObj ? (((subHeading as any).opacity ?? 70) / 100) : undefined;

    return (
        <section
            className="logo-carousel-section"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
                paddingTop: padTop,
                paddingBottom: padBottom,
                // Pass background color as a CSS variable for the gradient overlays
                ["--carousel-bg" as any]: backgroundColor,
            }}
        >
            {/* Header Section (Centered) */}
            {(headingText || subHeadingText) && (
                <div className="logo-carousel-container">
                    <div className="logo-carousel-header">
                        {subHeadingText && (
                            <span 
                                className="logo-carousel-subheading" 
                                style={{ 
                                    color: subHeadingColor,
                                    opacity: subHeadingOpacity,
                                }}
                            >
                                {subHeadingText}
                            </span>
                        )}
                        {headingText && (
                            <HeadingTag 
                                className="logo-carousel-heading"
                                style={{
                                    color: headingColor,
                                }}
                            >
                                {headingText}
                            </HeadingTag>
                        )}
                    </div>
                </div>
            )}

            {/* Marquee/Carousel Container (Full Width) */}
            {logos.length > 0 && (
                <div className="logo-carousel-marquee-wrapper">
                    <div 
                        className="logo-carousel-track"
                        style={{ animationDuration: animationDuration }}
                    >
                        {displayLogos.map((logo, index) => {
                            const logoUrl = logo.image ? urlFor(logo.image).url() : null;
                            if (!logoUrl) return null;

                            const cardContent = (
                                <div className="logo-carousel-card">
                                    <img
                                        src={logoUrl}
                                        alt={logo.altText || "Brand Logo"}
                                        className="logo-carousel-img"
                                    />
                                </div>
                            );

                            return logo.link ? (
                                <a
                                    href={logo.link}
                                    key={index}
                                    className="logo-carousel-card-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {cardContent}
                                </a>
                            ) : (
                                <div key={index} className="logo-carousel-card-wrap">
                                    {cardContent}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* CTA Link Section (Centered) */}
            {ctaText && ctaLink && (
                <div className="logo-carousel-container">
                    <div className="logo-carousel-cta">
                        <a href={ctaLink} className="logo-carousel-cta-link">
                            {ctaText} <span className="arrow">→</span>
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
}
