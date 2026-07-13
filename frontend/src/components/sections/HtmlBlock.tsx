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
    if (!htmlCode) return null;

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
