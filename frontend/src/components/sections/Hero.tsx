import "./hero.css";
import { urlFor } from "@/lib/sanity";
import Button from "./Button";

type HeroProps = {
    heading?: {
        text?: string;
        tag?: string;
        color?: string;
        // alignment?: string;
    };

    subHeading?: {
        text?: string;
        color?: string;
        opacity?: number;
        // alignment?: string;
    };

    description?: {
        text?: string;
        color?: string;
        opacity?: number;
        // alignment?: string;
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

    backgroundImage?: any;
    backgroundColor?: string;
    paddingTop?: number;
    paddingBottom?: number;
    contentAlignment?: string;
    layoutType?: "fullWidth" | "contained";
    innerPaddingTop?: number;
    innerPaddingBottom?: number;
};

export default function Hero({
    heading,
    subHeading,
    description,
    listBlock,
    primaryButton,
    secondaryButton,
    backgroundImage,
    backgroundColor,
    paddingTop,
    paddingBottom,
    contentAlignment,
    layoutType = "fullWidth",
    innerPaddingTop,
    innerPaddingBottom,
}: HeroProps) {

    const HeadingTag: any = heading?.tag || "h1";

    const backgroundImageUrl = backgroundImage
        ? urlFor(backgroundImage).url()
        : null;

    const alignment = contentAlignment || "left";
    const isContained = layoutType === "contained";

    const backgroundStyle = {
        backgroundColor: backgroundColor || "#ffffff",
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    const padTop = paddingTop !== undefined ? `${paddingTop}px` : "100px";
    const padBottom = paddingBottom !== undefined ? `${paddingBottom}px` : "100px";
    const innerPadTop = innerPaddingTop !== undefined ? `${innerPaddingTop}px` : "80px";
    const innerPadBottom = innerPaddingBottom !== undefined ? `${innerPaddingBottom}px` : "80px";

    return (
        <section
            className={`hero ${isContained ? "is-contained" : ""}`}
            style={{
                paddingTop: padTop,
                paddingBottom: padBottom,
                ...(!isContained ? backgroundStyle : {})
            }}
        >

            <div
                className={`hero-container ${isContained ? "is-contained" : ""}`}
                style={{
                    textAlign: alignment as any,
                    ...(isContained ? {
                        ...backgroundStyle,
                        paddingTop: innerPadTop,
                        paddingBottom: innerPadBottom,
                    } : {})
                }}
            >

                {subHeading?.text && (
                    <div
                        className="hero-subtitle"
                        style={{
                            color:
                                subHeading.color,
                            opacity:
                                (subHeading.opacity || 100) / 100,
                        }}
                    >
                        {subHeading.text}
                    </div>
                )}

                {heading?.text && (
                    <HeadingTag
                        className="hero-title"
                        style={{
                            color: heading?.color,
                            // textAlign: heading?.alignment as any,
                        }}
                    >
                        {heading?.text}
                    </HeadingTag>
                )}

                {description?.text && (
                    <div
                        className="hero-description"
                        style={{
                            color:
                                description.color,
                            opacity:
                                (description.opacity || 100) / 100,
                            maxWidth:
                                description.maxWidth
                                    ? `${description.maxWidth}px`
                                    : "undefined",
                        }}
                    >
                        {description.text}
                    </div>
                )}

                {listBlock?.heading && (
                    <h4
                        className="hero-list-heading"
                        style={{
                            color: "#222222",
                        }}
                    >
                        {listBlock.heading}
                    </h4>
                )}

                {listBlock?.items?.length ? (
                    <ul
                        className={`hero-list hero-list-${listBlock?.iconType || "dot"}`}
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
                    className="hero-buttons"
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

        </section>
    );
}