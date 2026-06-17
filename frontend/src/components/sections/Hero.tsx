type HeroProps = {
    title: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
};

export default function Hero({
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
}: HeroProps) {
    return (
        <section
            style={{
                padding: "120px 20px",
                textAlign: "center",
                background: "#f5f7fa",
            }}
        >
            {subtitle && (
                <p>{subtitle}</p>
            )}

            <h1>{title}</h1>

            {description && (
                <p>{description}</p>
            )}

            {ctaText && (
                <a
                    href={ctaLink}
                    style={{
                        display: "inline-block",
                        marginTop: "20px",
                        padding: "14px 28px",
                        background: "#66cc00",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "50px",
                    }}
                >
                    {ctaText}
                </a>
            )}
        </section>
    );
}