import "./splitHero.css";
import { urlFor } from "@/lib/sanity";
import Button from "./Button";

type SplitHeroProps = {
    heading?: {
        text?: string;
        tag?: string;
        color?: string;
    };

    subHeading?: {
        text?: string;
        color?: string;
        opacity?: number;
    };

    description?: {
        text?: string;
        color?: string;
        opacity?: number;
        maxWidth?: number;
    };

    listBlock?: {
        heading?: string;
        headingColor?: string;
        headingTag?: string;
        listColor?: string;
        iconType?: string;
        items?: string[];
    };

    primaryButton?: {
        text?: string;
        link?: string;
        openInNewTab?: boolean;
    };

    secondaryButton?: {
        text?: string;
        link?: string;
        openInNewTab?: boolean;
    };

    image?: any;

    imagePosition?: string;

    imageBorderRadius?: number;

    backgroundColor?: string;

    paddingTop?: number;

    paddingBottom?: number;

    contentAlignment?: string;

    layoutType?: "fullWidth" | "contained";
    innerPaddingTop?: number;
    innerPaddingBottom?: number;
};

export default function SplitHero({
    heading,
    subHeading,
    description,
    image,
    imagePosition,
    imageBorderRadius,
    backgroundColor,
    paddingTop,
    paddingBottom,
    contentAlignment,
    listBlock,
    primaryButton,
    secondaryButton,
    layoutType = "fullWidth",
    innerPaddingTop,
    innerPaddingBottom,
}: SplitHeroProps) {

    const HeadingTag: any = heading?.tag || "h2";

    const imageUrl = image
        ? urlFor(image).url()
        : null;

    const alignment = contentAlignment || "left";
    const isContained = layoutType === "contained";

    const backgroundStyle = {
        backgroundColor: backgroundColor || "#ffffff",
    };

    const padTop = paddingTop !== undefined ? `${paddingTop}px` : "100px";
    const padBottom = paddingBottom !== undefined ? `${paddingBottom}px` : "100px";
    const innerPadTop = innerPaddingTop !== undefined ? `${innerPaddingTop}px` : "80px";
    const innerPadBottom = innerPaddingBottom !== undefined ? `${innerPaddingBottom}px` : "80px";

    return (
        <section
            className={`split-hero ${isContained ? "is-contained" : ""}`}
            style={{
                paddingTop: padTop,
                paddingBottom: padBottom,
                ...(!isContained ? backgroundStyle : {})
            }}
        >
            <div
                className={`split-hero-container ${imagePosition === "left" ? "reverse" : ""} ${isContained ? "is-contained" : ""}`}
                style={isContained ? {
                    ...backgroundStyle,
                    paddingTop: innerPadTop,
                    paddingBottom: innerPadBottom,
                } : undefined}
            >

                <div
                    className="split-hero-content"
                    style={{
                        textAlign: alignment as any,
                    }}
                >

                    {subHeading?.text && (
                        <div
                            className="split-hero-subtitle"
                            style={{
                                color: subHeading.color,
                                opacity:
                                    (subHeading.opacity || 100) / 100,
                            }}
                        >
                            {subHeading.text}
                        </div>
                    )}

                    {heading?.text && (
                        <HeadingTag
                            className="split-hero-title"
                            style={{
                                color: heading.color,
                            }}
                        >
                            {heading.text}
                        </HeadingTag>
                    )}

                    {description?.text && (
                        <div
                            className="split-hero-description"
                            style={{
                                color:
                                    description.color,
                                opacity:
                                    (description.opacity || 100) / 100,

                                maxWidth:
                                    description.maxWidth
                                        ? `${description.maxWidth}px`
                                        : undefined,
                            }}
                        >
                            {description.text}
                        </div>
                    )}

                    {listBlock?.heading && (
                        <h4
                            className="split-hero-list-heading"
                            style={{
                                color: "#222222",
                            }}
                        >
                            {listBlock.heading}
                        </h4>
                    )}

                    {listBlock?.items?.length ? (
                        <ul
                            className={`split-hero-list hero-list-${listBlock?.iconType || "dot"}`}
                            style={{
                                marginLeft:
                                    alignment === "center"
                                        ? "auto"
                                        : undefined,
                                marginRight:
                                    alignment === "center"
                                        ? "auto"
                                        : undefined,
                                textAlign: alignment as any,
                            }}
                        >
                            {listBlock.items.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    <div
                        className="split-hero-buttons"
                        style={{
                            justifyContent:
                                alignment === "center"
                                    ? "center"
                                    : alignment === "right"
                                        ? "flex-end"
                                        : "flex-start",
                        }}
                    >
                        <Button button={primaryButton} fallbackType="primary" className="hero-btn-primary" />
                        <Button button={secondaryButton} fallbackType="secondary" className="hero-btn-secondary" />
                    </div>
                </div>

                <div className="split-hero-image">

                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Split Hero"
                            style={{
                                borderRadius:
                                    imageBorderRadius
                                        ? `${imageBorderRadius}px`
                                        : "0px",
                            }}
                        />
                    )}

                </div>

            </div>
        </section>
    );
}