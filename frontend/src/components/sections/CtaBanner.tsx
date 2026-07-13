import "./ctaBanner.css";
import { urlFor } from "@/lib/sanity";
import Button, { ButtonConfig } from "./Button";

type CtaBannerProps = {
    heading?: {
        text?: string;
        tag?: string;
        color?: string;
    };
    title?: string; // Fallback for old data
    description?: {
        text?: string;
        color?: string;
        opacity?: number;
        maxWidth?: number;
    } | string;
    primaryButton?: ButtonConfig;
    secondaryButton?: ButtonConfig;
    backgroundImage?: any;
    backgroundColor?: string;
    textAlign?: "left" | "center" | "right";
    layoutType?: "fullWidth" | "contained";
    paddingTop?: number;
    paddingBottom?: number;
    innerPaddingTop?: number;
    innerPaddingBottom?: number;
};

export default function CtaBanner({
    heading,
    title,
    description,
    primaryButton,
    secondaryButton,
    backgroundImage,
    backgroundColor = "#66cc00",
    textAlign = "center",
    layoutType = "fullWidth",
    paddingTop,
    paddingBottom,
    innerPaddingTop,
    innerPaddingBottom,
}: CtaBannerProps) {
    const backgroundImageUrl = backgroundImage
        ? urlFor(backgroundImage).url()
        : null;

    const alignment = textAlign || "center";
    const isContained = layoutType === "contained";

    // Decide text and button colors based on background
    const isGreenBg = backgroundColor.toLowerCase() === "#66cc00" || backgroundColor.toLowerCase() === "rgb(102, 204, 0)";
    
    // Heading styling fallback
    const headingText = heading?.text || title;
    const HeadingTag: any = heading?.tag || "h2";
    const headingColor = heading?.color || "#ffffff";

    // Description styling fallback
    const isDescObject = typeof description === "object" && description !== null;
    const descriptionText = isDescObject ? (description as any).text : description;
    const descriptionColor = isDescObject ? (description as any).color : "#ffffff";
    const descriptionOpacity = isDescObject ? ((description as any).opacity ?? 90) / 100 : 0.9;
    const descriptionMaxWidth = isDescObject && (description as any).maxWidth ? `${(description as any).maxWidth}px` : undefined;

    // Style helper for the background elements
    const backgroundStyle = {
        backgroundColor: backgroundImageUrl ? "transparent" : backgroundColor,
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
    };

    const padTop = paddingTop !== undefined ? `${paddingTop}px` : "100px";
    const padBottom = paddingBottom !== undefined ? `${paddingBottom}px` : "100px";
    const innerPadTop = innerPaddingTop !== undefined ? `${innerPaddingTop}px` : "80px";
    const innerPadBottom = innerPaddingBottom !== undefined ? `${innerPaddingBottom}px` : "80px";

    return (
        <section
            className={`cta-banner-section ${isContained ? "is-contained" : ""}`}
            style={{
                paddingTop: padTop,
                paddingBottom: padBottom,
                ...(!isContained ? backgroundStyle : {})
            }}
        >
            {!isContained && backgroundImageUrl && <div className="cta-banner-overlay" />}

            <div 
                className={`cta-banner-container ${isContained ? "is-contained" : ""}`} 
                style={{ 
                    textAlign: alignment,
                    ...(isContained ? {
                        ...backgroundStyle,
                        paddingTop: innerPadTop,
                        paddingBottom: innerPadBottom,
                    } : {})
                }}
            >
                {isContained && backgroundImageUrl && <div className="cta-banner-overlay" />}

                <div style={{ position: "relative", zIndex: 3 }}>
                    {headingText && (
                        <HeadingTag 
                            className="cta-banner-title" 
                            style={{ color: headingColor }}
                        >
                            {headingText}
                        </HeadingTag>
                    )}

                    {descriptionText && (
                        <p 
                            className="cta-banner-description" 
                            style={{ 
                                color: descriptionColor, 
                                opacity: descriptionOpacity,
                                maxWidth: descriptionMaxWidth || "800px",
                                marginLeft: alignment === "center" ? "auto" : undefined,
                                marginRight: alignment === "center" ? "auto" : undefined,
                            }}
                        >
                            {descriptionText}
                        </p>
                    )}

                    {(primaryButton?.text || secondaryButton?.text) && (
                        <div 
                            className="cta-banner-button-wrap"
                            style={{
                                justifyContent: alignment === "center" 
                                    ? "center" 
                                    : alignment === "right" 
                                        ? "flex-end" 
                                        : "flex-start",
                                flexWrap: "wrap"
                            }}
                        >
                            <Button button={primaryButton} fallbackType={backgroundImageUrl || isGreenBg ? "secondary" : "primary"} />
                            <Button button={secondaryButton} fallbackType={backgroundImageUrl || isGreenBg ? "primary" : "secondary"} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
