"use client";

import React, { useState, useEffect } from "react";
import "./accordionTabsShowcase.css";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";

type LinkItem = {
    labelText?: string;
    url?: string;
};

type ShowcaseItem = {
    tabName: string;
    description: string;
    image: any;
    links?: LinkItem[];
};

type AccordionTabsShowcaseProps = {
    heading?: string;
    items?: ShowcaseItem[];
    paddingTop?: number;
    paddingBottom?: number;
};

export default function AccordionTabsShowcase({
    heading = "One omnichannel cloud suite that works for you",
    items = [],
    paddingTop = 60,
    paddingBottom = 60,
}: AccordionTabsShowcaseProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [fadeState, setFadeState] = useState("fade-in");

    // Default placeholder items if items array is empty
    const showcaseItems = items.length > 0 ? items : [
        {
            tabName: "ERP",
            description: "Ginesys ERP is a comprehensive retail ERP software covering procurement, inventory, warehouse management, sales, distribution, and finance in a single integrated database.",
            image: null,
            links: [{ labelText: "Explore ERP →", url: "#" }]
        },
        {
            tabName: "Web and MPOS",
            description: "Ginesys One's Zwing offers a cloud-based POS with both mPOS and web POS options. Zwing mPOS provides mobile billing on Android devices, while web POS delivers a seamless retail experience through any browser, ensuring modern, secure, and efficient management.",
            image: null,
            links: [
                { labelText: "Explore WebPOS →", url: "#" },
                { labelText: "Explore MPOS →", url: "#" }
            ]
        }
    ];

    // Trigger fade-in animation on right-side image when activeIndex changes
    useEffect(() => {
        setFadeState("fade-out");
        const timer = setTimeout(() => {
            setFadeState("fade-in");
        }, 150);
        return () => clearTimeout(timer);
    }, [activeIndex]);

    const activeItem = showcaseItems[activeIndex] || showcaseItems[0];
    const activeImageUrl = activeItem?.image ? urlFor(activeItem.image).url() : null;

    return (
        <section
            className="accordion-tabs-section"
            style={{
                paddingTop: `${paddingTop}px`,
                paddingBottom: `${paddingBottom}px`,
            }}
        >
            <div className="accordion-tabs-container">
                {heading && <h2 className="accordion-tabs-section-heading">{heading}</h2>}

                <div className="accordion-tabs-grid">
                    
                    {/* Left Column: Accordion Lists */}
                    <div className="accordion-tabs-list">
                        {showcaseItems.map((item, index) => {
                            const isOpen = index === activeIndex;
                            return (
                                <div
                                    key={index}
                                    className={`accordion-tabs-item ${isOpen ? "is-open" : ""}`}
                                >
                                    <button
                                        type="button"
                                        className="accordion-tabs-trigger"
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        <span className="accordion-tabs-item-title">{item.tabName}</span>
                                        <span className="accordion-tabs-toggle-icon">
                                            {isOpen ? "−" : "+"}
                                        </span>
                                    </button>

                                    <div
                                        className="accordion-tabs-content-wrapper"
                                        style={{
                                            gridTemplateRows: isOpen ? "1fr" : "0fr",
                                        }}
                                    >
                                        <div className="accordion-tabs-content-inner">
                                            <p className="accordion-tabs-item-desc">{item.description}</p>
                                            
                                            {item.links && item.links.length > 0 && (
                                                <div className="accordion-tabs-links-wrap">
                                                    {item.links.map((link, linkIdx) => (
                                                        <Link
                                                            key={linkIdx}
                                                            href={link.url || "#"}
                                                            className="accordion-tabs-cta-link"
                                                        >
                                                            <span>{link.labelText}</span>
                                                            <svg 
                                                                className="accordion-tabs-cta-arrow" 
                                                                width="15" 
                                                                height="15" 
                                                                viewBox="0 0 24 24" 
                                                                fill="none" 
                                                                stroke="currentColor" 
                                                                strokeWidth="2.5"
                                                            >
                                                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Device Screen Showcase Mockup */}
                    <div className="accordion-tabs-showcase-mockup">
                        <div className="monitor-frame-bezel">
                            <div className="monitor-inner-screen">
                                {activeImageUrl ? (
                                    <img
                                        src={activeImageUrl}
                                        alt={activeItem.tabName}
                                        className={`monitor-dashboard-image ${fadeState}`}
                                    />
                                ) : (
                                    <div className="monitor-placeholder-screen">
                                        <div className="monitor-placeholder-content">
                                            <span>Dashboard View</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Monitor base pedestal stand */}
                        <div className="monitor-pedestal-stand">
                            <div className="monitor-stand-neck"></div>
                            <div className="monitor-stand-base"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
