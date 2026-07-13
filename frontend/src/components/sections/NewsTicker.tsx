import React from "react";
import "./newsTicker.css";

type NewsTickerProps = {
    messages?: string[];
    speed?: number;
    backgroundColor?: string;
    textColor?: string;
    fontSize?: number;
    pauseOnHover?: boolean;
    paddingTop?: number;
    paddingBottom?: number;
};

export default function NewsTicker({
    messages = [],
    speed = 20,
    backgroundColor = "#f3f4f6",
    textColor = "#374151",
    fontSize = 14,
    pauseOnHover = true,
    paddingTop = 12,
    paddingBottom = 12,
}: NewsTickerProps) {
    if (!messages || messages.length === 0) return null;

    // Duplicate messages to ensure a seamless infinite scrolling width
    const displayMessages = [...messages, ...messages, ...messages, ...messages];

    return (
        <section
            className="news-ticker-section"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
                fontSize: `${fontSize}px`,
                paddingTop: `${paddingTop}px`,
                paddingBottom: `${paddingBottom}px`,
            }}
        >
            <div className="news-ticker-wrapper">
                <div
                    className={`news-ticker-track ${pauseOnHover ? "pause-on-hover" : ""}`}
                    style={{
                        animationDuration: `${speed}s`,
                    }}
                >
                    {displayMessages.map((msg, index) => (
                        <span key={index} className="news-ticker-item">
                            {msg}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
