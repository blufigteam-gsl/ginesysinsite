import "./featuresGrid.css";
import { urlFor } from "@/lib/sanity";
import Button, { ButtonConfig } from "./Button";

type GridItem = {
    icon?: any;
    title?: string;
    description?: string;
};

type FeaturesGridProps = {
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
    items?: GridItem[];
    primaryButton?: ButtonConfig;
    secondaryButton?: ButtonConfig;
    backgroundColor?: string;
    layoutType?: "fullWidth" | "contained";
    iconStyle?: "left" | "topLeft" | "topCenter";
    paddingTop?: number;
    paddingBottom?: number;
    innerPaddingTop?: number;
    innerPaddingBottom?: number;
};

export default function FeaturesGrid({
    heading,
    subHeading,
    items,
    primaryButton,
    secondaryButton,
    backgroundColor = "#ffffff",
    layoutType = "fullWidth",
    iconStyle = "left",
    paddingTop,
    paddingBottom,
    innerPaddingTop,
    innerPaddingBottom,
}: FeaturesGridProps) {
    const isContained = layoutType === "contained";

    const backgroundStyle = {
        backgroundColor: backgroundColor,
    };

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
            className={`features-grid-section ${isContained ? "is-contained" : ""}`}
            style={{
                paddingTop: padTop,
                paddingBottom: padBottom,
                ...(!isContained ? backgroundStyle : {}),
            }}
        >
            <div
                className={`features-grid-container ${isContained ? "is-contained" : ""}`}
                style={{
                    ...(isContained ? {
                        ...backgroundStyle,
                        paddingTop: innerPadTop,
                        paddingBottom: innerPadBottom,
                    } : {}),
                }}
            >
                {(headingText || subHeadingText) && (
                    <div className="features-grid-header">
                        {subHeadingText && (
                            <span 
                                className="features-grid-subheading"
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
                                className="features-grid-heading"
                                style={{
                                    color: headingColor,
                                }}
                            >
                                {headingText}
                            </HeadingTag>
                        )}
                    </div>
                )}

                {items && items.length > 0 && (
                    <div className={`features-grid-items icon-style-${iconStyle}`}>
                        {items.map((item, index) => {
                            const iconUrl = item.icon ? urlFor(item.icon).url() : null;
                            return (
                                <div key={index} className="features-grid-item">
                                    {iconUrl && (
                                        <div className="features-grid-icon-wrap">
                                            <img src={iconUrl} alt={item.title || "Benefit Icon"} />
                                        </div>
                                    )}
                                    <div className="features-grid-info">
                                        {item.title && (
                                            <h3 className="features-grid-item-title">{item.title}</h3>
                                        )}
                                        {item.description && (
                                            <p className="features-grid-item-desc">{item.description}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {(primaryButton?.text || secondaryButton?.text) && (
                    <div className="features-grid-cta" style={{ gap: "15px" }}>
                        <Button button={primaryButton} fallbackType="primary" className="features-btn-primary" />
                        <Button button={secondaryButton} fallbackType="secondary" className="features-btn-secondary" />
                    </div>
                )}
            </div>
        </section>
    );
}
