"use client";

import { useEffect, useState, useRef } from "react";
import "./counter.css";

type CounterItem = {
    stat: string;
    description: string;
};

type CounterProps = {
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
    items?: CounterItem[];
    backgroundColor?: string;
    textColor?: string;
    statColor?: string;
    paddingTop?: number;
    paddingBottom?: number;
};

function AnimatedNumber({ val }: { val: string }) {
    const [displayVal, setDisplayVal] = useState("0");
    const elementRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        // Regex to separate numeric part from prefix/suffix
        const match = val.match(/^([^0-9.-]*)([0-9.-]+)([^0-9]*)$/);
        
        if (!match) {
            setDisplayVal(val);
            return;
        }

        const prefix = match[1] || "";
        const targetNumber = parseFloat(match[2]);
        const suffix = match[3] || "";

        if (isNaN(targetNumber)) {
            setDisplayVal(val);
            return;
        }

        // Determine decimal places
        const decimalIndex = match[2].indexOf('.');
        const decimals = decimalIndex !== -1 ? match[2].length - decimalIndex - 1 : 0;

        let observer: IntersectionObserver | null = null;

        const startAnimation = () => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;

            const duration = 1500; // 1.5 seconds animation duration
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // easeOutQuad curve
                const easedProgress = progress * (2 - progress);
                const currentCount = targetNumber * easedProgress;
                
                setDisplayVal(`${prefix}${currentCount.toFixed(decimals)}${suffix}`);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setDisplayVal(val); // Ensure exact final value is set at the end
                }
            };

            requestAnimationFrame(animate);
        };

        if (typeof window !== "undefined" && "IntersectionObserver" in window) {
            observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    startAnimation();
                    if (observer && elementRef.current) {
                        observer.unobserve(elementRef.current);
                    }
                }
            }, { threshold: 0.1 });

            if (elementRef.current) {
                observer.observe(elementRef.current);
            }
        } else {
            startAnimation();
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [val]);

    return <span ref={elementRef}>{displayVal}</span>;
}

export default function Counter({
    heading,
    subHeading,
    items = [],
    backgroundColor = "#ffffff",
    textColor = "#333333",
    statColor = "#6cc24a",
    paddingTop = 80,
    paddingBottom = 80,
}: CounterProps) {
    const padTop = `${paddingTop}px`;
    const padBottom = `${paddingBottom}px`;

    // Heading fallbacks
    const isHeadingObj = typeof heading === "object" && heading !== null;
    const headingText = isHeadingObj ? (heading as any).text : heading;
    const HeadingTag: any = isHeadingObj ? ((heading as any).tag || "h2") : "h2";
    const headingColor = isHeadingObj ? (heading as any).color : undefined;

    // Subheading fallbacks
    const isSubHeadingObj = typeof subHeading === "object" && subHeading !== null;
    const subHeadingText = isSubHeadingObj ? (subHeading as any).text : subHeading;
    const subHeadingColor = isSubHeadingObj ? (subHeading as any).color : undefined;
    const subHeadingOpacity = isSubHeadingObj ? (((subHeading as any).opacity ?? 100) / 100) : undefined;

    return (
        <section
            className="counter-section"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
                paddingTop: padTop,
                paddingBottom: padBottom,
            }}
        >
            <div className="counter-container">
                {/* Header (Heading & Subheading) */}
                {(headingText || subHeadingText) && (
                    <div className="counter-header">
                        {subHeadingText && (
                            <span 
                                className="counter-subheading"
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
                                className="counter-heading"
                                style={{
                                    color: headingColor,
                                }}
                            >
                                {headingText}
                            </HeadingTag>
                        )}
                    </div>
                )}

                {/* Dynamic Counter Grid */}
                {items.length > 0 && (
                    <div
                        className="counter-items"
                        style={{
                            // Pass item count to CSS for dynamic grid columns
                            ["--stats-count" as any]: items.length,
                        }}
                    >
                        {items.map((item, index) => (
                            <div key={index} className="counter-item-card">
                                <div
                                    className="counter-number"
                                    style={{ color: statColor }}
                                >
                                    <AnimatedNumber val={item.stat} />
                                </div>
                                <div className="counter-desc">
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
