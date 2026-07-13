import "./contentBlock.css";
import { PortableText } from "@portabletext/react";

type ContentBlockProps = {
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
    content?: any[];
    textAlign?: "left" | "center" | "right";
    layoutType?: "fullWidth" | "contained";
    paddingTop?: number;
    paddingBottom?: number;
    innerPaddingTop?: number;
    innerPaddingBottom?: number;
};

export default function ContentBlock({
    heading,
    subHeading,
    content,
    textAlign = "left",
    layoutType = "fullWidth",
    paddingTop,
    paddingBottom,
    innerPaddingTop,
    innerPaddingBottom,
}: ContentBlockProps) {
    const isContained = layoutType === "contained";
    
    const padTop = paddingTop !== undefined ? `${paddingTop}px` : "80px";
    const padBottom = paddingBottom !== undefined ? `${paddingBottom}px` : "80px";
    const innerPadTop = innerPaddingTop !== undefined ? `${innerPaddingTop}px` : "80px";
    const innerPadBottom = innerPaddingBottom !== undefined ? `${innerPaddingBottom}px` : "80px";

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
            className={`content-block-section ${isContained ? "is-contained" : ""}`}
            style={{
                paddingTop: padTop,
                paddingBottom: padBottom,
            }}
        >
            <div 
                className={`content-block-container ${isContained ? "is-contained" : ""}`}
                style={{ 
                    textAlign,
                    ...(isContained ? {
                        paddingTop: innerPadTop,
                        paddingBottom: innerPadBottom,
                    } : {})
                }}
            >
                {subHeadingText && (
                    <span 
                        className="content-block-subheading"
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
                        className="content-block-heading"
                        style={{
                            color: headingColor,
                        }}
                    >
                        {headingText}
                    </HeadingTag>
                )}

                {content && content.length > 0 && (
                    <div className="content-block-body">
                        <PortableText value={content} />
                    </div>
                )}
            </div>
        </section>
    );
}