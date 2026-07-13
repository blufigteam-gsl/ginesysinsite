"use client";

import { useState } from "react";

export type ButtonConfig = {
    text?: string;
    link?: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderRadius?: number;
    hoverBackgroundColor?: string;
    hoverTextColor?: string;
    hoverBorderColor?: string;
    openInNewTab?: boolean;
};

type ButtonProps = {
    button?: ButtonConfig;
    fallbackType?: "primary" | "secondary";
    className?: string;
};

export default function Button({
    button,
    fallbackType = "primary",
    className = "",
}: ButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    if (!button || !button.text || !button.link) {
        return null;
    }

    // Default Fallbacks
    const isPrimary = fallbackType === "primary";
    const defaultBg = isPrimary ? "#66cc00" : "transparent";
    const defaultText = isPrimary ? "#ffffff" : "#66cc00";
    const defaultBorder = "#66cc00";
    const defaultBorderRadius = 6;

    // Hover defaults (swap primary/secondary or keep fallback pattern)
    const defaultHoverBg = isPrimary ? "transparent" : "#66cc00";
    const defaultHoverText = isPrimary ? "#66cc00" : "#ffffff";
    const defaultHoverBorder = "#66cc00";

    // Destructure properties from config or use defaults
    const bg = button.backgroundColor || defaultBg;
    const textCol = button.textColor || defaultText;
    const borderCol = button.borderColor || defaultBorder;
    const borderRadius = button.borderRadius !== undefined ? button.borderRadius : defaultBorderRadius;

    const hoverBg = button.hoverBackgroundColor || defaultHoverBg;
    const hoverTextCol = button.hoverTextColor || defaultHoverText;
    const hoverBorderCol = button.hoverBorderColor || defaultHoverBorder;

    // Build dynamic style object
    const buttonStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 28px",
        fontSize: "16px",
        fontWeight: 600,
        textDecoration: "none",
        border: "2px solid",
        borderRadius: `${borderRadius}px`,
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        cursor: "pointer",
        
        // Dynamic colors based on hover state
        backgroundColor: isHovered ? hoverBg : bg,
        color: isHovered ? hoverTextCol : textCol,
        borderColor: isHovered ? hoverBorderCol : borderCol,
    };

    return (
        <a
            href={button.link}
            style={buttonStyle}
            className={`custom-styled-button ${className}`}
            target={button.openInNewTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {button.text}
        </a>
    );
}
