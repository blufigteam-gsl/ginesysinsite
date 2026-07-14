"use client";

import React, { useEffect, useState } from "react";

type Submission = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    numberOfStores: string;
    annualTurnover: string;
    message: string;
    softwareRequired: string | string[];
    formType: string;
    gstRequiredFor: string[];
    partnerType?: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmContent: string;
    utmTerm: string;
    firstLandingPage: string;
    submittedAt: string;
};

export default function SubmissionsDashboard() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [filtered, setFiltered] = useState<Submission[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadSubmissions = async () => {
            try {
                const res = await fetch("/api/submissions");
                const data = await res.json();
                if (res.ok) {
                    setSubmissions(data);
                    setFiltered(data);
                } else {
                    setError(data.error || "Failed to load data.");
                }
            } catch (err) {
                console.error("Dashboard error:", err);
                setError("An error occurred while loading submissions.");
            } finally {
                setLoading(false);
            }
        };

        loadSubmissions();
    }, []);

    // Filter submissions on search term change
    useEffect(() => {
        const query = search.toLowerCase().trim();
        if (!query) {
            setFiltered(submissions);
        } else {
            const matches = submissions.filter(
                (item) =>
                    (item.name || "").toLowerCase().includes(query) ||
                    (item.email || "").toLowerCase().includes(query) ||
                    (item.company || "").toLowerCase().includes(query) ||
                    (item.utmSource || "").toLowerCase().includes(query)
            );
            setFiltered(matches);
        }
    }, [search, submissions]);

    const handleCsvExport = () => {
        if (filtered.length === 0) return;

        // CSV headers
        const headers = [
            "Submitted At",
            "Name",
            "Email",
            "Phone",
            "Company",
            "Number of Stores",
            "Annual Turnover",
            "Message",
            "Software Required",
            "Form Type",
            "GST Required For",
            "Partner Type",
            "UTM Source",
            "UTM Medium",
            "UTM Campaign",
            "UTM Content",
            "UTM Term",
            "First Landing Page",
        ];

        // Format CSV rows
        const rows = filtered.map((item) => [
            item.submittedAt ? new Date(item.submittedAt).toLocaleString() : "",
            item.name || "",
            item.email || "",
            item.phone || "",
            item.company || "",
            item.numberOfStores || "",
            item.annualTurnover || "",
            (item.message || "").replace(/\n/g, " "),
            Array.isArray(item.softwareRequired) ? item.softwareRequired.join("; ") : (item.softwareRequired || ""),
            item.formType || "contact",
            item.gstRequiredFor ? item.gstRequiredFor.join("; ") : "",
            item.partnerType || "",
            item.utmSource || "",
            item.utmMedium || "",
            item.utmCampaign || "",
            item.utmContent || "",
            item.utmTerm || "",
            item.firstLandingPage || "",
        ]);

        // Escape double quotes and join with commas
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map((row) => row.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute(
            "download",
            `ginesys_contact_submissions_${new Date().toISOString().split("T")[0]}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "40px 20px", fontFamily: "sans-serif" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
                    <div>
                        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: "0 0 4px 0" }}>
                            Contact Submissions & UTM Logs
                        </h1>
                        <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
                            View and download user inquiries and tracking details.
                        </p>
                    </div>
                    
                    <button
                        onClick={handleCsvExport}
                        disabled={filtered.length === 0}
                        style={{
                            padding: "12px 24px",
                            backgroundColor: filtered.length === 0 ? "#cbd5e1" : "#8cc63f",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "700",
                            fontSize: "14px",
                            cursor: filtered.length === 0 ? "not-allowed" : "pointer",
                            transition: "background-color 0.2s",
                        }}
                    >
                        Export to CSV / Excel
                    </button>
                </div>

                {/* Filter and stats */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "20px", flexWrap: "wrap" }}>
                    <input
                        type="text"
                        placeholder="Search by name, email, company, or UTM..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: "12px 20px",
                            width: "100%",
                            maxWidth: "400px",
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                            outline: "none",
                            fontSize: "14px",
                        }}
                    />
                    <div style={{ fontSize: "14px", color: "#475569", fontWeight: "600" }}>
                        Showing {filtered.length} of {submissions.length} submissions
                    </div>
                </div>

                {/* Data Block */}
                {loading ? (
                    <div style={{ textAlign: "center", padding: "80px 0", color: "#64748b", fontWeight: "600" }}>
                        Loading submissions...
                    </div>
                ) : error ? (
                    <div style={{ padding: "30px", backgroundColor: "#fef2f2", color: "#b91c1c", border: "1px solid #fca5a5", borderRadius: "8px", textAlign: "center", fontWeight: "600" }}>
                        {error}
                        <div style={{ fontSize: "13px", fontWeight: "400", marginTop: "10px" }}>
                            Make sure you have created the <strong>SANITY_WRITE_TOKEN</strong> environment variable in your frontend project's <strong>.env.local</strong> file.
                        </div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "80px 0", textAlign: "center", color: "#64748b" }}>
                        No submissions found.
                    </div>
                ) : (
                    <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflowX: "auto", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1200px", textAlign: "left", fontSize: "14px" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "2px solid #e2e8f0", color: "#475569", fontWeight: "700" }}>
                                    <th style={{ padding: "16px 20px" }}>Submitted At</th>
                                    <th style={{ padding: "16px 20px" }}>Name</th>
                                    <th style={{ padding: "16px 20px" }}>Email</th>
                                    <th style={{ padding: "16px 20px" }}>Phone</th>
                                    <th style={{ padding: "16px 20px" }}>Company</th>
                                    <th style={{ padding: "16px 20px" }}>Stores</th>
                                    <th style={{ padding: "16px 20px" }}>Turnover</th>
                                    <th style={{ padding: "16px 20px" }}>Form Type</th>
                                    <th style={{ padding: "16px 20px" }}>Form Details</th>
                                    <th style={{ padding: "16px 20px" }}>Message</th>
                                    <th style={{ padding: "16px 20px" }}>UTM Source</th>
                                    <th style={{ padding: "16px 20px" }}>UTM Medium</th>
                                    <th style={{ padding: "16px 20px" }}>UTM Campaign</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        style={{
                                            borderBottom: "1px solid #e2e8f0",
                                            backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                                            color: "#334155",
                                        }}
                                    >
                                        <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                                            {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td style={{ padding: "16px 20px", fontWeight: "600" }}>{item.name}</td>
                                        <td style={{ padding: "16px 20px" }}>{item.email}</td>
                                        <td style={{ padding: "16px 20px" }}>{item.phone}</td>
                                        <td style={{ padding: "16px 20px" }}>{item.company}</td>
                                        <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>{item.numberOfStores}</td>
                                        <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>{item.annualTurnover}</td>
                                        <td style={{ padding: "16px 20px", fontWeight: "700", textTransform: "capitalize" }}>
                                            {item.formType === "demo" ? "Request Demo" : item.formType === "easemygst" ? "EaseMyGST" : item.formType === "partner" ? "Become Partner" : "Contact Us"}
                                        </td>
                                        <td style={{ padding: "16px 20px", fontSize: "13px" }}>
                                            {item.formType === "demo" && `Software: ${Array.isArray(item.softwareRequired) ? item.softwareRequired.join(", ") : item.softwareRequired || ""}`}
                                            {item.formType === "easemygst" && `Reqs: ${item.gstRequiredFor ? item.gstRequiredFor.join(", ") : ""}`}
                                            {item.formType === "partner" && `Partner for: ${item.partnerType || ""}`}
                                            {!item.formType || item.formType === "contact" ? "-" : ""}
                                        </td>
                                        <td style={{ padding: "16px 20px", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.message}>
                                            {item.message}
                                        </td>
                                        <td style={{ padding: "16px 20px" }}>
                                            {item.utmSource ? (
                                                <span style={{ padding: "4px 8px", backgroundColor: "#e0f2fe", color: "#0369a1", borderRadius: "4px", fontSize: "12px", fontWeight: "600" }}>
                                                    {item.utmSource}
                                                </span>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td style={{ padding: "16px 20px" }}>{item.utmMedium || "-"}</td>
                                        <td style={{ padding: "16px 20px" }}>{item.utmCampaign || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}
