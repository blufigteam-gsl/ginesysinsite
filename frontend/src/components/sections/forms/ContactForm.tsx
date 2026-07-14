"use client";

import React, { useState, useEffect } from "react";
import "./contactForm.css";
import { urlFor } from "@/lib/sanity";

type ContactFormProps = {
    layoutType?: "centered" | "split";
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
    formHeading?: string;
    formSubHeading?: string;
    supportPortalHeading?: string;
    supportPortalText?: string;
    supportPortalBtnText?: string;
    supportPortalBtnLink?: string;
    paddingTop?: number;
    paddingBottom?: number;
};

export default function ContactForm({
    layoutType = "split",
    leftSubHeading,
    leftHeading,
    leftDescription,
    leftImage,
    leftBgColor = "#0c453c",
    leftTextColor = "#ffffff",
    formHeading = "How can we help you today?",
    formSubHeading = "Please select the reason for reaching out so we can connect you with the right team.",
    supportPortalHeading = "Need After Sale Support?",
    supportPortalText = "Our dedicated team is here to help with quick ticket resolution and responsive assistance to ensure your experience stays smooth and hassle-free.",
    supportPortalBtnText = "Support Portal",
    supportPortalBtnLink = "https://support.ginesys.in",
    paddingTop = 60,
    paddingBottom = 60,
}: ContactFormProps) {
    const [activeTab, setActiveTab] = useState<"demo" | "support">("demo");
    const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        yourName: "",
        yourEmail: "",
        yourPhone: "",
        companyName: "",
        numberOfStores: "",
        annualTurnover: "",
        yourMessage: "",
    });

    const isSplit = layoutType === "split";
    const leftImageUrl = leftImage ? urlFor(leftImage).url() : null;

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus("submitting");
        setErrorMessage("");

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
                    formType: "contact",
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

    const leftBgStyle = isSplit
        ? (leftBgColor.startsWith("linear-gradient") || leftBgColor.startsWith("radial-gradient")
            ? leftBgColor
            : `linear-gradient(135deg, ${leftBgColor} 0%, #031512 100%)`)
        : "transparent";

    return (
        <section
            className="contact-form-section"
            style={{
                paddingTop: `${paddingTop}px`,
                paddingBottom: `${paddingBottom}px`,
                background: leftBgStyle,
            }}
        >
            <div className={`contact-form-container ${isSplit ? "split-layout" : "centered-layout"}`}>
                
                {/* Left Promo block (rendered in split mode only) */}
                {isSplit && (
                    <div className="contact-form-left-promo">
                        <div>
                             {leftSubHeadingText && (
                                <span
                                    className="contact-form-left-subtitle"
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
                                    className="contact-form-left-title"
                                    style={{
                                        color: leftHeadingColor || leftTextColor,
                                    }}
                                >
                                    {leftHeadingText}
                                </LeftHeadingTag>
                            )}
                            {leftDescription && (
                                <p 
                                    className="contact-form-left-desc"
                                    style={{
                                        color: leftTextColor,
                                    }}
                                >
                                    {leftDescription}
                                </p>
                            )}
                        </div>
                        {leftImageUrl && (
                            <div className="contact-form-left-img-wrap">
                                <img
                                    src={leftImageUrl}
                                    alt={leftHeadingText || "Illustration"}
                                    className="contact-form-left-img"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Right Form block */}
                <div className="contact-form-right-block">
                    <h3 className="contact-form-title">{formHeading}</h3>
                    <p className="contact-form-subtitle">{formSubHeading}</p>

                    {/* Selector Pills */}
                    <div className="contact-form-selectors">
                        <button
                            type="button"
                            className={`contact-form-selector-btn ${activeTab === "demo" ? "active" : ""}`}
                            onClick={() => setActiveTab("demo")}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                            Product Demo
                        </button>
                        <button
                            type="button"
                            className={`contact-form-selector-btn ${activeTab === "support" ? "active" : ""}`}
                            onClick={() => setActiveTab("support")}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                            </svg>
                            Customer Support
                        </button>
                    </div>

                    {/* Interactive Tab Renderings */}
                    {activeTab === "demo" ? (
                        <form onSubmit={handleSubmit} className="contact-form-inputs-grid">
                            {submitStatus === "success" && (
                                <div className="contact-form-success-alert">
                                    Thank you! Your demo request has been submitted successfully.
                                </div>
                            )}

                            {submitStatus === "error" && (
                                <div 
                                    className="contact-form-error-alert" 
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

                            <div className="contact-form-field-wrap">
                                <input
                                    type="text"
                                    name="yourName"
                                    placeholder="Your Name"
                                    className="contact-form-input"
                                    value={formData.yourName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="contact-form-field-wrap">
                                <input
                                    type="email"
                                    name="yourEmail"
                                    placeholder="Your Email"
                                    className="contact-form-input"
                                    value={formData.yourEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="contact-form-field-wrap">
                                <input
                                    type="tel"
                                    name="yourPhone"
                                    placeholder="Your Phone Number"
                                    className="contact-form-input"
                                    value={formData.yourPhone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="contact-form-field-wrap">
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Company Name"
                                    className="contact-form-input"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="contact-form-field-wrap">
                                <select
                                    name="numberOfStores"
                                    className="contact-form-select"
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

                            <div className="contact-form-field-wrap">
                                <select
                                    name="annualTurnover"
                                    className="contact-form-select"
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

                            <div className="contact-form-field-wrap full-width">
                                <textarea
                                    name="yourMessage"
                                    placeholder="Your Message"
                                    className="contact-form-textarea"
                                    value={formData.yourMessage}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="contact-form-submit-wrap">
                                <button 
                                    type="submit" 
                                    className="contact-form-submit-btn"
                                    disabled={submitStatus === "submitting"}
                                >
                                    {submitStatus === "submitting" ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="contact-form-support-content">
                            <h4 className="contact-form-support-title">{supportPortalHeading}</h4>
                            <p className="contact-form-support-text">{supportPortalText}</p>
                            <a
                                href={supportPortalBtnLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-form-support-btn"
                            >
                                {supportPortalBtnText}
                            </a>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
