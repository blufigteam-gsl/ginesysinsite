"use client";

import React, { useState, useEffect, useRef } from "react";
import "./owlCarousel.css";
import { urlFor } from "@/lib/sanity";

type CarouselItem = {
    image?: any;
    altText?: string;
    title?: string;
    subtitle?: string;
    detailText?: string;
    link?: string;
};

type OwlCarouselProps = {
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
    items?: CarouselItem[];
    autoplay?: boolean;
    autoplayTimeout?: number;
    loop?: boolean;
    showNav?: boolean;
    showDots?: boolean;
    itemsDesktop?: number;
    itemsTablet?: number;
    itemsMobile?: number;
    gap?: number;
    backgroundColor?: string;
    textColor?: string;
    paddingTop?: number;
    paddingBottom?: number;
};

export default function OwlCarousel({
    heading,
    subHeading,
    items = [],
    autoplay = true,
    autoplayTimeout = 5000,
    loop = true,
    showNav = true,
    showDots = true,
    itemsDesktop = 4,
    itemsTablet = 2,
    itemsMobile = 1,
    gap = 24,
    backgroundColor = "#ffffff",
    textColor = "#111111",
    paddingTop = 60,
    paddingBottom = 60,
}: OwlCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(itemsDesktop);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const trackRef = useRef<HTMLDivElement>(null);
    const dragStart = useRef<number | null>(null);
    const dragOffset = useRef<number>(0);
    const isDragging = useRef<boolean>(false);

    // Responsive items count calculation
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 640) {
                setVisibleItems(itemsMobile);
            } else if (width <= 1024) {
                setVisibleItems(itemsTablet);
            } else {
                setVisibleItems(itemsDesktop);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [itemsDesktop, itemsTablet, itemsMobile]);

    // Handle Autoplay
    useEffect(() => {
        if (!autoplay || items.length === 0 || isHovered) return;

        const interval = setInterval(() => {
            handleNext();
        }, autoplayTimeout);

        return () => clearInterval(interval);
    }, [autoplay, autoplayTimeout, currentIndex, visibleItems, items.length, isHovered, loop]);

    const totalSlides = items.length;
    
    // Slide helpers
    const handlePrev = () => {
        if (totalSlides <= visibleItems) return;
        
        setCurrentIndex((prev) => {
            if (prev === 0) {
                return loop ? totalSlides - visibleItems : 0;
            }
            return prev - 1;
        });
    };

    const handleNext = () => {
        if (totalSlides <= visibleItems) return;

        setCurrentIndex((prev) => {
            const maxIndex = totalSlides - visibleItems;
            if (prev >= maxIndex) {
                return loop ? 0 : maxIndex;
            }
            return prev + 1;
        });
    };

    const handleDotClick = (index: number) => {
        const maxIndex = totalSlides - visibleItems;
        setCurrentIndex(Math.min(index, maxIndex));
    };

    // Touch & Mouse drag actions
    const getPositionX = (event: React.TouchEvent | React.MouseEvent) => {
        return "touches" in event ? event.touches[0].clientX : event.clientX;
    };

    const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
        dragStart.current = getPositionX(e);
        isDragging.current = true;
        setIsTransitioning(false);
    };

    const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging.current || dragStart.current === null) return;
        const currentX = getPositionX(e);
        dragOffset.current = currentX - dragStart.current;

        // Apply visual feedback
        if (trackRef.current) {
            const trackWidth = trackRef.current.clientWidth;
            const slideWidth = (trackWidth - gap * (visibleItems - 1)) / visibleItems;
            const currentTranslate = -currentIndex * (slideWidth + gap);
            trackRef.current.style.transform = `translateX(${currentTranslate + dragOffset.current}px)`;
        }
    };

    const handleDragEnd = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        setIsTransitioning(true);

        const threshold = 50; // threshold for swap trigger
        if (dragOffset.current < -threshold) {
            handleNext();
        } else if (dragOffset.current > threshold) {
            handlePrev();
        } else {
            // Reset to current index translation
            if (trackRef.current) {
                const trackWidth = trackRef.current.clientWidth;
                const slideWidth = (trackWidth - gap * (visibleItems - 1)) / visibleItems;
                const currentTranslate = -currentIndex * (slideWidth + gap);
                trackRef.current.style.transform = `translateX(${currentTranslate}px)`;
            }
        }

        dragStart.current = null;
        dragOffset.current = 0;
    };

    // Heading and Subheading configurations
    const isHeadingObj = typeof heading === "object" && heading !== null;
    const headingText = isHeadingObj ? heading.text : heading;
    const HeadingTag: any = isHeadingObj ? (heading.tag || "h2") : "h2";
    const headingColor = isHeadingObj ? heading.color : undefined;

    const isSubHeadingObj = typeof subHeading === "object" && subHeading !== null;
    const subHeadingText = isSubHeadingObj ? subHeading.text : subHeading;
    const subHeadingColor = isSubHeadingObj ? subHeading.color : undefined;
    const subHeadingOpacity = isSubHeadingObj ? ((subHeading.opacity ?? 70) / 100) : undefined;

    // Dynamic width styling for slides
    const slideWidthStyle = `calc((100% - ${gap * (visibleItems - 1)}px) / ${visibleItems})`;
    const translateValue = `calc(-${currentIndex} * (${slideWidthStyle} + ${gap}px))`;

    // Number of dots to display
    const numDots = Math.max(0, totalSlides - visibleItems + 1);

    return (
        <section
            className="owl-carousel-section"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
                paddingTop: `${paddingTop}px`,
                paddingBottom: `${paddingBottom}px`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="owl-carousel-container">
                {/* Header Section */}
                {(headingText || subHeadingText) && (
                    <div className="owl-carousel-header">
                        {subHeadingText && (
                            <span
                                className="owl-carousel-subheading"
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
                                className="owl-carousel-heading"
                                style={{
                                    color: headingColor || textColor,
                                }}
                            >
                                {headingText}
                            </HeadingTag>
                        )}
                    </div>
                )}

                {/* Slider Wrapper */}
                {items.length > 0 && (
                    <div className="owl-carousel-slider-wrapper">
                        {/* Left Nav Button */}
                        {showNav && totalSlides > visibleItems && (
                            <button
                                className="owl-carousel-nav-btn prev"
                                onClick={handlePrev}
                                aria-label="Previous Slide"
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                                </svg>
                            </button>
                        )}

                        {/* Viewport */}
                        <div
                            className="owl-carousel-viewport"
                            onTouchStart={handleDragStart}
                            onTouchMove={handleDragMove}
                            onTouchEnd={handleDragEnd}
                            onMouseDown={handleDragStart}
                            onMouseMove={handleDragMove}
                            onMouseUp={handleDragEnd}
                            onMouseLeave={handleDragEnd}
                        >
                            <div
                                className="owl-carousel-track"
                                ref={trackRef}
                                style={{
                                    transform: `translateX(${translateValue})`,
                                    gap: `${gap}px`,
                                    transition: isTransitioning
                                        ? "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                                        : "none",
                                }}
                            >
                                {items.map((item, idx) => {
                                    const imgUrl = item.image ? urlFor(item.image).url() : null;

                                    const cardContent = (
                                        <div className="owl-carousel-card">
                                            {imgUrl && (
                                                <div className="owl-carousel-img-wrap">
                                                    <img
                                                        src={imgUrl}
                                                        alt={item.altText || item.title || "carousel-logo"}
                                                        className="owl-carousel-img"
                                                    />
                                                </div>
                                            )}
                                            {item.title && (
                                                <p className="owl-carousel-card-title">{item.title}</p>
                                            )}
                                            {item.subtitle && (
                                                <h4 className="owl-carousel-card-subtitle">{item.subtitle}</h4>
                                            )}
                                            {item.detailText && (
                                                <p className="owl-carousel-card-detail">{item.detailText}</p>
                                            )}
                                        </div>
                                    );

                                    return (
                                        <div
                                            key={idx}
                                            className="owl-carousel-slide"
                                            style={{ width: slideWidthStyle }}
                                        >
                                            {item.link ? (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    {cardContent}
                                                </a>
                                            ) : (
                                                cardContent
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Nav Button */}
                        {showNav && totalSlides > visibleItems && (
                            <button
                                className="owl-carousel-nav-btn next"
                                onClick={handleNext}
                                aria-label="Next Slide"
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Pagination Dots */}
                {showDots && numDots > 1 && (
                    <div className="owl-carousel-dots">
                        {Array.from({ length: numDots }).map((_, idx) => (
                            <button
                                key={idx}
                                className={`owl-carousel-dot ${
                                    currentIndex === idx ? "active" : ""
                                }`}
                                onClick={() => handleDotClick(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
