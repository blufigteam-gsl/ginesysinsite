"use client";

import React, { useState, useEffect } from "react";
import "./requestDemoForm.css";
import { urlFor } from "@/lib/sanity";

type RequestDemoFormProps = {
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
    leftImage?: any;
    leftBgColor?: string;
    leftTextColor?: string;
    bgImage?: any;
    formHeading?: string;
    formSubHeading?: string;
    paddingTop?: number;
    paddingBottom?: number;
};

export default function RequestDemoForm({
    leftSubHeading,
    leftHeading,
    leftDescription,
    leftImage,
    leftBgColor = "#0c453c",
    leftTextColor = "#ffffff",
    bgImage,
    formHeading = "Request For Demo",
    formSubHeading = "Please enter your details to explore the Ginesys suite.",
    paddingTop = 60,
    paddingBottom = 60,
}: RequestDemoFormProps) {
    const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [isRequirementsOpen, setIsRequirementsOpen] = useState(true);

    const [formData, setFormData] = useState({
        yourName: "",
        yourEmail: "",
        yourPhone: "",
        companyName: "",
        numberOfStores: "",
        annualTurnover: "",
        yourMessage: "",
    });

    const [requirements, setRequirements] = useState<{ [key: string]: boolean }>({
        "Retail Chain Management & POS": false,
        "GST Returns and E-invoicing": false,
        "Ecom Order & Inventory Management": false,
        "Marketplaces Management": false,
        "Production and Wholesale": false,
    });

    const leftImageUrl = leftImage ? urlFor(leftImage).url() : null;
    const bgImageUrl = bgImage ? urlFor(bgImage).url() : null;

    // Track UTM parameters upon page landing
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

            // Save first landing page if not set
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

    // Subheading fallbacks for left column
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

    const handleCheckboxChange = (name: string) => {
        setRequirements((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus("submitting");
        setErrorMessage("");

        const selectedSoftware = Object.keys(requirements).filter((key) => requirements[key]);

        // Retrieve UTM params from sessionStorage
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
                    formType: "demo",
                    softwareRequired: selectedSoftware,
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
                // Reset form
                setFormData({
                    yourName: "",
                    yourEmail: "",
                    yourPhone: "",
                    companyName: "",
                    numberOfStores: "",
                    annualTurnover: "",
                    yourMessage: "",
                });
                setRequirements({
                    "Retail Chain Management & POS": false,
                    "GST Returns and E-invoicing": false,
                    "Ecom Order & Inventory Management": false,
                    "Marketplaces Management": false,
                    "Production and Wholesale": false,
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

    const leftBgStyle = bgImageUrl
        ? `linear-gradient(135deg, rgba(12, 69, 60, 0.9) 0%, rgba(3, 21, 18, 0.95) 100%), url(${bgImageUrl})`
        : (leftBgColor.startsWith("linear-gradient") || leftBgColor.startsWith("radial-gradient")
            ? leftBgColor
            : `linear-gradient(135deg, ${leftBgColor} 0%, #031512 100%)`);

    return (
        <section
            className="request-demo-form-section"
            style={{
                paddingTop: `${paddingTop}px`,
                paddingBottom: `${paddingBottom}px`,
                background: leftBgStyle,
                backgroundSize: bgImageUrl ? "cover" : undefined,
                backgroundPosition: bgImageUrl ? "center" : undefined,
                backgroundRepeat: bgImageUrl ? "no-repeat" : undefined,
            }}
        >
            <div className="request-demo-form-container">
                
                {/* Left Promo block */}
                <div className="request-demo-form-left-promo animate-fade-in-up">
                    <div>
                         {leftSubHeadingText && (
                            <span
                                className="request-demo-form-left-subtitle"
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
                                className="request-demo-form-left-title"
                                style={{
                                    color: leftHeadingColor || leftTextColor,
                                }}
                            >
                                {leftHeadingText}
                            </LeftHeadingTag>
                        )}
                        {leftDescription && (
                            <p 
                                className="request-demo-form-left-desc"
                                style={{
                                    color: leftTextColor,
                                }}
                            >
                                {leftDescription}
                            </p>
                        )}
                    </div>
                    {leftImageUrl && (
                        <div className="request-demo-form-left-img-wrap">
                            <img
                                src={leftImageUrl}
                                alt={leftHeadingText || "Illustration"}
                                className="request-demo-form-left-img"
                            />
                        </div>
                    )}
                </div>

                {/* Right Form block */}
                <div className="request-demo-form-right-block animate-fade-in-up">
                    <h3 className="request-demo-form-title">{formHeading}</h3>
                    <p className="request-demo-form-subtitle">{formSubHeading}</p>

                    <form onSubmit={handleSubmit} className="request-demo-form-inputs-grid">
                        {submitStatus === "success" && (
                            <div className="request-demo-form-success-alert">
                                Thank you! Your demo request has been submitted successfully.
                            </div>
                        )}

                        {submitStatus === "error" && (
                            <div 
                                className="request-demo-form-error-alert" 
                                style={{ 
                                    gridColumn: "1 / -1", 
                                    color: "#b91c1c", 
                                    backgroundColor: "#fef2f2", 
                                    border: "1px solid #fca5a5", 
                                    borderRadius: "12px", 
                                    padding: "16px 20px", 
                                    marginBottom: "20px", 
                                    fontWeight: "600", 
                                    fontSize: "15px", 
                                    textAlign: "center" 
                                }}
                            >
                                {errorMessage}
                            </div>
                        )}

                        <div className="request-demo-form-field-wrap">
                            <input
                                type="text"
                                name="yourName"
                                placeholder="Your Name"
                                className="request-demo-form-input"
                                value={formData.yourName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="request-demo-form-field-wrap">
                            <input
                                type="email"
                                name="yourEmail"
                                placeholder="Your Email"
                                className="request-demo-form-input"
                                value={formData.yourEmail}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="request-demo-form-field-wrap">
                            <input
                                type="tel"
                                name="yourPhone"
                                placeholder="Your Phone Number"
                                className="request-demo-form-input"
                                value={formData.yourPhone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="request-demo-form-field-wrap">
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                className="request-demo-form-input"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="request-demo-form-field-wrap">
                            <select
                                name="numberOfStores"
                                className="request-demo-form-select"
                                value={formData.numberOfStores}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Number of Stores</option>
                                <option value="1-5">1 - 5 stores</option>
                                <option value="6-20">6 - 20 stores</option>
                                <option value="21-100">21 - 100 stores</option>
                                <option value="100+">100+ stores</option>
                            </select>
                        </div>

                        <div className="request-demo-form-field-wrap">
                            <select
                                name="annualTurnover"
                                className="request-demo-form-select"
                                value={formData.annualTurnover}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Annual Turnover</option>
                                <option value="less-than-5cr">&lt; 5 Cr</option>
                                <option value="5cr-25cr">5 Cr - 25 Cr</option>
                                <option value="25cr-100cr">25 Cr - 100 Cr</option>
                                <option value="100cr-plus">100 Cr+</option>
                            </select>
                        </div>

                        <div className="request-demo-form-field-wrap full-width">
                            <textarea
                                name="yourMessage"
                                placeholder="Your Message"
                                className="request-demo-form-textarea"
                                value={formData.yourMessage}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Interactive green border requirements checkbox dropdown */}
                        <div className="request-demo-form-requirements-box full-width">
                            <button
                                type="button"
                                className="request-demo-form-requirements-toggle"
                                onClick={() => setIsRequirementsOpen(!isRequirementsOpen)}
                            >
                                <span>Software required for</span>
                                <svg
                                    className={`request-demo-form-arrow-icon ${isRequirementsOpen ? "open" : ""}`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>

                            {isRequirementsOpen && (
                                <div className="request-demo-form-requirements-grid">
                                    {Object.keys(requirements).map((name) => (
                                        <label key={name} className="request-demo-form-checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={requirements[name]}
                                                onChange={() => handleCheckboxChange(name)}
                                                className="request-demo-form-checkbox-input"
                                            />
                                            <span className="request-demo-form-checkbox-text">{name}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="request-demo-form-submit-wrap">
                            <button 
                                type="submit" 
                                className="request-demo-form-submit-btn"
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
