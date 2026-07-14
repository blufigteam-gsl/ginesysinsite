"use client";

import React, { useState, useEffect } from "react";
import "./becomePartnerForm.css";
import { urlFor } from "@/lib/sanity";

type BecomePartnerFormProps = {
    leftSubHeading?: {
        text?: string;
        color?: string;
        opacity?: number;
    } | string;
    leftHeading?: {
        text?: string;
        tag?: string;
        color?: string;
    } | string;
    leftDescription?: string;
    leftBgColor?: string;
    leftTextColor?: string;
    bgImage?: any;
    formHeading?: string;
    formSubHeading?: string;
    paddingTop?: number;
    paddingBottom?: number;
    bgColor?: string;
    formBgColor?: string;
};

export default function BecomePartnerForm({
    leftSubHeading,
    leftHeading,
    leftDescription,
    leftBgColor = "#ffffff",
    leftTextColor = "#1e293b",
    bgImage,
    paddingTop = 60,
    paddingBottom = 60,
    bgColor = "#ffffff",
    formBgColor = "",
}: BecomePartnerFormProps) {
    const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        yourName: "",
        yourEmail: "",
        yourPhone: "",
        companyName: "",
        partnerType: "",
        yourMessage: "",
    });

    const bgImageUrl = bgImage ? urlFor(bgImage).url() : null;

    // Track UTM parameters
    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
            
            utmParams.forEach((param) => {
                const val = urlParams.get(param);
                if (val) {
                    sessionStorage.setItem(param, val);
                }
            });

            if (!sessionStorage.getItem("first_landing_page")) {
                sessionStorage.setItem("first_landing_page", window.location.href);
            }
        }
    }, []);

    // Heading fallbacks for left column
    const isLeftHeadingObj = typeof leftHeading === "object" && leftHeading !== null;
    const leftHeadingText = isLeftHeadingObj ? leftHeading.text : leftHeading;
    const LeftHeadingTag: any = isLeftHeadingObj ? (leftHeading.tag || "h2") : "h2";
    const leftHeadingColor = isLeftHeadingObj ? leftHeading.color : undefined;

    // Subheading fallbacks
    const isLeftSubHeadingObj = typeof leftSubHeading === "object" && leftSubHeading !== null;
    const leftSubHeadingText = isLeftSubHeadingObj ? leftSubHeading.text : leftSubHeading;
    const leftSubHeadingColor = isLeftSubHeadingObj ? leftSubHeading.color : undefined;
    const leftSubHeadingOpacity = isLeftSubHeadingObj ? ((leftSubHeading.opacity ?? 100) / 100) : undefined;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus("submitting");
        setErrorMessage("");

        const utmSource = sessionStorage.getItem("utm_source") || "";
        const utmMedium = sessionStorage.getItem("utm_medium") || "";
        const utmCampaign = sessionStorage.getItem("utm_campaign") || "";
        const utmContent = sessionStorage.getItem("utm_content") || "";
        const utmTerm = sessionStorage.getItem("utm_term") || "";
        const firstLandingPage = sessionStorage.getItem("first_landing_page") || "";

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    formType: "partner",
                    utmSource,
                    utmMedium,
                    utmCampaign,
                    utmContent,
                    utmTerm,
                    firstLandingPage,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setSubmitStatus("success");
                setFormData({
                    yourName: "",
                    yourEmail: "",
                    yourPhone: "",
                    companyName: "",
                    partnerType: "",
                    yourMessage: "",
                });
            } else {
                setSubmitStatus("error");
                setErrorMessage(data.error || "Failed to submit. Please try again.");
            }
        } catch (error) {
            console.error("Form submit error:", error);
            setSubmitStatus("error");
            setErrorMessage("An unexpected network error occurred.");
        }
    };

    const parentBgStyle = bgImageUrl
        ? `linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.97) 100%), url(${bgImageUrl})`
        : bgColor;

    return (
        <section
            className="become-partner-form-section"
            style={{
                paddingTop: `${paddingTop}px`,
                paddingBottom: `${paddingBottom}px`,
                background: parentBgStyle,
                backgroundSize: bgImageUrl ? "cover" : undefined,
                backgroundPosition: bgImageUrl ? "center" : undefined,
                backgroundRepeat: bgImageUrl ? "no-repeat" : undefined,
            }}
        >
            <div className="become-partner-form-container">
                
                {/* Left content block */}
                <div className="become-partner-left-block animate-fade-in-up">
                    <div className="become-partner-left-content">
                         {leftSubHeadingText && (
                            <span
                                className="become-partner-left-subtitle"
                                style={{
                                    color: leftSubHeadingColor || leftTextColor,
                                    opacity: leftSubHeadingOpacity ?? 0.8,
                                }}
                            >
                                {leftSubHeadingText}
                            </span>
                        )}
                        {leftHeadingText && (
                            <LeftHeadingTag
                                className="become-partner-left-title"
                                style={{
                                    color: leftHeadingColor || leftTextColor,
                                }}
                            >
                                {leftHeadingText}
                            </LeftHeadingTag>
                        )}
                        {leftDescription && (
                            <p 
                                className="become-partner-left-desc"
                                style={{
                                    color: leftTextColor,
                                }}
                            >
                                {leftDescription}
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Green Slanted Form block */}
                <div 
                    className="become-partner-right-block animate-fade-in-up"
                    style={{
                        backgroundColor: formBgColor || "transparent",
                    }}
                >
                    <form onSubmit={handleSubmit} className="become-partner-inputs-grid">
                        {submitStatus === "success" && (
                            <div className="become-partner-success-alert">
                                Thank you! Your partner request has been submitted successfully.
                            </div>
                        )}

                        {submitStatus === "error" && (
                            <div className="become-partner-error-alert">
                                {errorMessage}
                            </div>
                        )}

                        <div className="become-partner-field-wrap">
                            <input
                                type="text"
                                name="yourName"
                                placeholder="Your Name"
                                className="become-partner-input"
                                value={formData.yourName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="become-partner-field-wrap">
                            <input
                                type="email"
                                name="yourEmail"
                                placeholder="Your Email"
                                className="become-partner-input"
                                value={formData.yourEmail}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="become-partner-field-wrap">
                            <input
                                type="tel"
                                name="yourPhone"
                                placeholder="Your Phone Number"
                                className="become-partner-input"
                                value={formData.yourPhone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="become-partner-field-wrap">
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                className="become-partner-input"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Partner Options */}
                        <div className="become-partner-field-wrap full-width">
                            <label className="become-partner-select-label">You want to Partner for</label>
                            <select
                                name="partnerType"
                                className="become-partner-select"
                                value={formData.partnerType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>- Select -</option>
                                <option value="Solutions Partner">Solutions Partner</option>
                                <option value="Sales Partner">Sales Partner</option>
                            </select>
                        </div>

                        <div className="become-partner-field-wrap full-width">
                            <textarea
                                name="yourMessage"
                                placeholder="Your message"
                                className="become-partner-textarea"
                                value={formData.yourMessage}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="become-partner-submit-wrap">
                            <button 
                                type="submit" 
                                className="become-partner-submit-btn"
                                disabled={submitStatus === "submitting"}
                            >
                                {submitStatus === "submitting" ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </section>
    );
}
