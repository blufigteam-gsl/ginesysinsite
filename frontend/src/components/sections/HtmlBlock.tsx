"use client";

import React, { useState, useEffect, useRef } from "react";

type HtmlBlockProps = {
    htmlCode?: string;
    layoutType?: "fullWidth" | "contained";
    paddingTop?: number;
    paddingBottom?: number;
    innerPaddingTop?: number;
    innerPaddingBottom?: number;
};

export default function HtmlBlock({
    htmlCode,
    layoutType = "fullWidth",
    paddingTop,
    paddingBottom,
    innerPaddingTop,
    innerPaddingBottom,
}: HtmlBlockProps) {
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && containerRef.current) {
            const container = containerRef.current;
            const scripts = container.querySelectorAll("script");
            scripts.forEach((oldScript) => {
                const newScript = document.createElement("script");
                
                // Copy all attributes
                Array.from(oldScript.attributes).forEach((attr) => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                // Copy inline javascript code
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                
                // Replace old tag to force browser script execution
                oldScript.parentNode?.replaceChild(newScript, oldScript);
            });
        }
    }, [isMounted, htmlCode]);

    if (!htmlCode) return null;
    if (!isMounted) return null; // Bypass SSR rendering to prevent hydration mismatches from dynamic CSS/JS blocks

    const isContained = layoutType === "contained";
    const padTop = paddingTop !== undefined ? `${paddingTop}px` : "80px";
    const padBottom = paddingBottom !== undefined ? `${paddingBottom}px` : "80px";
    const innerPadTop = innerPaddingTop !== undefined ? `${innerPaddingTop}px` : "80px";
    const innerPadBottom = innerPaddingBottom !== undefined ? `${innerPaddingBottom}px` : "80px";

    return (
        <section 
            className="html-block-section"
            style={{
                paddingTop: padTop,
                paddingBottom: padBottom,
            }}
        >
            <div 
                ref={containerRef}
                className={isContained ? "html-block-container is-contained" : "html-block-container"}
                style={{
                    maxWidth: isContained ? "1320px" : "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    ...(isContained ? {
                        paddingTop: innerPadTop,
                        paddingBottom: innerPadBottom,
                    } : {}),
                }}
                dangerouslySetInnerHTML={{ __html: htmlCode }}
            />
        </section>
    );
}
