"use client";

import React, { useState, useEffect } from "react";
import "./easeMyGstForm.css";
import { urlFor } from "@/lib/sanity";

type EaseMyGstFormProps = {
    leftHeading?: string;
    leftDescription?: string;
    bgImage?: any;
    bgColor?: string;
    paddingTop?: number;
    paddingBottom?: number;
};

export default function EaseMyGstForm({
    leftHeading = "A comprehensive, all-in-one solution for your end-to-end GST requirements.",
    leftDescription = "Remain unconcerned by evolving GST regulations—stay informed and fully GST compliant with EaseMyGST, the comprehensive GST software solution by Ginesys.",
    bgImage,
    bgColor = "#f8fafc",
    paddingTop = 60,
    paddingBottom = 60,
}: EaseMyGstFormProps) {
    const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [isRequirementsOpen, setIsRequirementsOpen] = useState(true);

    const [formData, setFormData] = useState({
        yourName: "",
        yourEmail: "",
        yourPhone: "",
        companyName: "",
        yourMessage: "",
    });

    const [requirements, setRequirements] = useState<{ [key: string]: boolean }>({
        "GST Returns": false,
        "IMS Reconciliation": false,
        "ISD Returns": false,
        "E-Invoice & E-Way Bill": false,
        "GST Assist Services": false,
        "GSTR-2A & 2B Reconciliation": false,
    });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

        const selectedRequirements = Object.keys(requirements).filter((key) => requirements[key]);

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
                    formType: "easemygst",
                    gstRequiredFor: selectedRequirements,
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
                    yourMessage: "",
                });
                setRequirements({
                    "GST Returns": false,
                    "IMS Reconciliation": false,
                    "ISD Returns": false,
                    "E-Invoice & E-Way Bill": false,
                    "GST Assist Services": false,
                    "GSTR-2A & 2B Reconciliation": false,
                });
            } else {
                setSubmitStatus("error");
                setErrorMessage(data.error || "Failed to submit. Please try again.");
            }
        } catch (error) {
            console.error("GST Form submit error:", error);
            setSubmitStatus("error");
            setErrorMessage("An unexpected network error occurred.");
        }
    };

    const bgImageUrl = bgImage ? urlFor(bgImage).url() : null;
    const parentBgStyle = bgImageUrl
        ? `linear-gradient(135deg, rgba(248, 250, 252, 0.92) 0%, rgba(241, 245, 249, 0.95) 100%), url(${bgImageUrl})`
        : bgColor;

    return (
        <section
            className="ease-my-gst-form-section"
            style={{
                paddingTop: `${paddingTop}px`,
                paddingBottom: `${paddingBottom}px`,
                background: parentBgStyle,
                backgroundSize: bgImageUrl ? "cover" : undefined,
                backgroundPosition: bgImageUrl ? "center" : undefined,
                backgroundRepeat: bgImageUrl ? "no-repeat" : undefined,
            }}
        >
            <div className="ease-my-gst-form-container">
                
                {/* Left Green Slanted Column */}
                <div className="ease-my-gst-left-block">
                    <div className="ease-my-gst-left-content">
                        {leftHeading && (
                            <h2 className="ease-my-gst-left-title">{leftHeading}</h2>
                        )}
                        {leftDescription && (
                            <p className="ease-my-gst-left-desc">{leftDescription}</p>
                        )}
                    </div>
                </div>

                {/* Right Form Column */}
                <div className="ease-my-gst-right-block">
                    <form onSubmit={handleSubmit} className="ease-my-gst-inputs-grid">
                        {submitStatus === "success" && (
                            <div className="ease-my-gst-success-alert">
                                Thank you! Your GST request has been submitted successfully.
                            </div>
                        )}

                        {submitStatus === "error" && (
                            <div className="ease-my-gst-error-alert">
                                {errorMessage}
                            </div>
                        )}

                        <div className="ease-my-gst-field-wrap">
                            <input
                                type="text"
                                name="yourName"
                                placeholder="Your Name"
                                className="ease-my-gst-input"
                                value={formData.yourName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="ease-my-gst-field-wrap">
                            <input
                                type="email"
                                name="yourEmail"
                                placeholder="Your Email"
                                className="ease-my-gst-input"
                                value={formData.yourEmail}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="ease-my-gst-field-wrap">
                            <input
                                type="tel"
                                name="yourPhone"
                                placeholder="Your Phone Number"
                                className="ease-my-gst-input"
                                value={formData.yourPhone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="ease-my-gst-field-wrap">
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                className="ease-my-gst-input"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="ease-my-gst-field-wrap full-width">
                            <textarea
                                name="yourMessage"
                                placeholder="Your Message"
                                className="ease-my-gst-textarea"
                                value={formData.yourMessage}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Collapsible Requirements Box */}
                        <div className="ease-my-gst-requirements-box full-width">
                            <button
                                type="button"
                                className="ease-my-gst-requirements-toggle"
                                onClick={() => setIsRequirementsOpen(!isRequirementsOpen)}
                            >
                                <span>EaseMyGST Required For</span>
                                <svg
                                    className={`ease-my-gst-arrow-icon ${isRequirementsOpen ? "open" : ""}`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>

                            {isRequirementsOpen && (
                                <div className="ease-my-gst-requirements-grid">
                                    {Object.keys(requirements).map((name) => (
                                        <label key={name} className="ease-my-gst-checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={requirements[name]}
                                                onChange={() => handleCheckboxChange(name)}
                                                className="ease-my-gst-checkbox-input"
                                            />
                                            <span className="ease-my-gst-checkbox-text">{name}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="ease-my-gst-submit-wrap">
                            <button
                                type="submit"
                                className="ease-my-gst-submit-btn"
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
