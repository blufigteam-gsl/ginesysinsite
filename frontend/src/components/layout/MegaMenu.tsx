"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type MenuItem = {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    href: string;
    bullets?: string[];
};

type TabCategory = {
    id: string;
    label: string;
    items?: MenuItem[];
    // For custom renders
    customType?: "backoffice" | "ecommerce" | "instore" | "gst" | "integrations" | "report";
};

export default function MegaMenu({ type = "solutions" }: { type?: "solutions" | "products" }) {
    const defaultTab = type === "solutions" ? "by-need" : "backoffice-operations";
    const [activeTab, setActiveTab] = useState<string>(defaultTab);

    // Reset tab if the type changes
    useEffect(() => {
        setActiveTab(type === "solutions" ? "by-need" : "backoffice-operations");
    }, [type]);

    const solutionsCategories: TabCategory[] = [
        {
            id: "by-need",
            label: "By Need",
            items: [
                {
                    title: "Omnichannel",
                    description: "Connect retail stores, warehouse, web store & marketplaces to provide a unified shopper experience.",
                    href: "/solutions/omnichannel",
                    icon: (
                        <svg className="w-6 h-6 text-[#65cb00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="3" strokeWidth={2} />
                            <circle cx="4" cy="4" r="2" strokeWidth={2} />
                            <circle cx="20" cy="4" r="2" strokeWidth={2} />
                            <circle cx="4" cy="20" r="2" strokeWidth={2} />
                            <circle cx="20" cy="20" r="2" strokeWidth={2} />
                            <path strokeWidth={1.5} d="M5.5 5.5l4.3 4.3M18.5 5.5l-4.3 4.3M5.5 18.5l4.3-4.3M18.5 18.5l-4.3-4.3" />
                        </svg>
                    )
                },
                {
                    title: "Wholesale",
                    description: "Manage large distribution networks, stockists, order dispatch, and credit limits smoothly.",
                    href: "/solutions/wholesale",
                    icon: (
                        <svg className="w-6 h-6 text-[#65cb00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4 8 4 8-4zM4 12l8 4 8-4M4 17l8 4 8-4" />
                        </svg>
                    )
                },
                {
                    title: "Fashion Distribution",
                    description: "End-to-end design lifecycle, manufacturing tracking, order bookings, and distribution for apparel brands.",
                    href: "/solutions/fashion-distribution",
                    icon: (
                        <svg className="w-6 h-6 text-[#65cb00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M12 22V12M12 12L4 8m8 4l8-4M20 12v5a2 2 0 0 1-2 2h-3M4 12v5a2 2 0 0 0 2 2h3" />
                            <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M12 12V3M12 3L9 6m3-3l3 6" />
                        </svg>
                    )
                }
            ]
        },
        {
            id: "by-vertical",
            label: "By Vertical",
            items: [
                {
                    title: "D2C Brands",
                    description: "Direct-to-consumer online brands scaling their operations and logistics seamlessly.",
                    href: "/solutions/d2c-brands",
                    icon: (
                        <svg className="w-6 h-6 text-[#65cb00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth={2} />
                            <path strokeWidth={2} d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            <path strokeWidth={2} d="M2 12h20" />
                        </svg>
                    )
                },
                {
                    title: "MBO Retail Management",
                    description: "Manage multi-brand outlets, checkouts, and promotional schemes seamlessly.",
                    href: "/solutions/mbo-retail",
                    icon: (
                        <svg className="w-6 h-6 text-[#65cb00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            <path strokeWidth={1.5} strokeLinecap="round" d="M10 17l4-4M10.5 13.5h.01M13.5 16.5h.01" />
                        </svg>
                    )
                },
                {
                    title: "Lifestyle Brands",
                    description: "Apparel, footwear, and accessory stores seeking inventory accuracy.",
                    href: "/solutions/lifestyle-brands",
                    icon: (
                        <svg className="w-6 h-6 text-[#65cb00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M12 2a3 3 0 0 0-3 3h1.5a1.5 1.5 0 0 1 3 0M3 14l9-5.5 9 5.5v1.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V14z" />
                        </svg>
                    )
                },
                {
                    title: "Supermarkets",
                    description: "High-volume FMCG billing, batch inventory, and vendor management.",
                    href: "/solutions/supermarkets",
                    icon: (
                        <svg className="w-6 h-6 text-[#65cb00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                            <circle cx="9" cy="20" r="1" strokeWidth={1.8} />
                            <circle cx="16" cy="20" r="1" strokeWidth={1.8} />
                        </svg>
                    )
                }
            ]
        },
        {
            id: "upgrade-to-ginesys",
            label: "Upgrade to Ginesys",
            items: [
                {
                    title: "Upgrade from Tally",
                    description: "Migrate financial & inventory ledgers to a complete retail ERP system.",
                    href: "/solutions/upgrade-from-tally",
                    icon: (
                        <svg className="w-6 h-6 text-[#65cb00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    )
                },
                {
                    title: "Upgrade from Legacy ERP",
                    description: "Modernize server infrastructure and adopt a cloud-connected billing workflow.",
                    href: "/solutions/upgrade-from-legacy",
                    icon: (
                        <svg className="w-6 h-6 text-[#65cb00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m-16 5c0 2.21 3.58 4 8 4s8-1.79 8-4" />
                        </svg>
                    )
                }
            ]
        }
    ];

    const productsCategories: TabCategory[] = [
        {
            id: "backoffice-operations",
            label: "Backoffice Operations",
            customType: "backoffice"
        },
        {
            id: "ecommerce-operations",
            label: "Ecommerce Operations",
            customType: "ecommerce"
        },
        {
            id: "instore-operations",
            label: "In-store Operations",
            customType: "instore"
        },
        {
            id: "report-insights",
            label: "Report and Insights",
            customType: "report"
        },
        {
            id: "gst-compliance",
            label: "GST Compliance",
            customType: "gst"
        },
        {
            id: "all-integrations",
            label: "All Integrations",
            customType: "integrations"
        }
    ];

    const categories = type === "solutions" ? solutionsCategories : productsCategories;
    const currentCategory = categories.find((cat) => cat.id === activeTab) || categories[0];

    // Helper renderers for Products custom sections
    const renderCustomContent = (catId: string) => {
        switch (catId) {
            case "backoffice-operations":
                return (
                    <div className="grid grid-cols-[250px_1fr] gap-8 items-center h-full animate-fadeIn">
                        {/* ERP Graphic mockup */}
                        <div className="flex flex-col items-center border-r border-gray-100 pr-8">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-[#65cb00]/10 flex items-center justify-center text-[#65cb00] font-bold text-sm">
                                    g
                                </div>
                                <span className="font-bold text-gray-900 tracking-wide text-lg">ERP</span>
                            </div>
                            <svg className="w-full h-36 max-w-[180px] text-gray-400" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10" y="20" width="180" height="110" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2.5" />
                                <rect x="20" y="32" width="40" height="40" rx="4" fill="#65cb00" fillOpacity="0.1" stroke="#65cb00" strokeWidth="1.5" />
                                <circle cx="40" cy="52" r="10" fill="#65cb00" fillOpacity="0.2" />
                                <line x1="75" y1="38" x2="160" y2="38" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
                                <line x1="75" y1="52" x2="135" y2="52" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
                                <rect x="20" y="85" width="160" height="32" rx="4" fill="#f1f5f9" />
                                <line x1="32" y1="101" x2="168" y2="101" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
                            </svg>
                        </div>

                        {/* Two column list */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-800 self-center">
                            {[
                                "Inventory Management",
                                "Warehouse Management",
                                "Procurement Management",
                                "Production Management",
                                "Sales And Distribution",
                                "Finance And Accounting"
                            ].map((bullet) => (
                                <Link
                                    key={bullet}
                                    href={`/products/${bullet.toLowerCase().replace(/ /g, "-")}`}
                                    className="flex items-center gap-2.5 text-sm font-medium hover:text-[#65cb00] transition-colors p-2 rounded-lg hover:bg-gray-50"
                                >
                                    <span className="w-2 h-2 rounded-full border border-gray-400 group-hover:border-[#65cb00]"></span>
                                    {bullet}
                                </Link>
                            ))}
                        </div>
                    </div>
                );

            case "ecommerce-operations":
                return (
                    <div className="grid grid-cols-[1fr_250px] gap-8 h-full animate-fadeIn">
                        {/* Platforms */}
                        <div className="flex flex-col gap-6 justify-center">
                            <Link href="/products/ecommerce-order" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group/item">
                                <div className="p-3 bg-red-50 rounded-full text-red-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 group-hover/item:text-[#65cb00] transition-colors">Ecommerce Order Management</h4>
                                    <p className="text-xs text-gray-400 mt-1">Organize omnichannel retail, warehouse shipments, and stock.</p>
                                </div>
                            </Link>

                            <Link href="/products/warehouse-management" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group/item">
                                <div className="p-3 bg-green-50 rounded-full text-green-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 group-hover/item:text-[#65cb00] transition-colors">Warehouse Management</h4>
                                    <p className="text-xs text-gray-400 mt-1">Coordinate picking, packaging, and dispatch routing.</p>
                                </div>
                            </Link>
                        </div>

                        {/* Services */}
                        <div className="border-l border-gray-100 pl-8 flex flex-col justify-center">
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 block">Services</span>
                            <Link href="/products/marketing-management" className="flex items-center gap-2.5 text-sm font-medium text-gray-700 hover:text-[#65cb00] transition-colors p-2 rounded-lg hover:bg-gray-50">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#65cb00]"></span>
                                Ecommerce Marketing Management
                            </Link>
                        </div>
                    </div>
                );

            case "instore-operations":
                return (
                    <div className="grid grid-cols-3 gap-6 h-full items-center animate-fadeIn">
                        {[
                            {
                                title: "Web POS",
                                bg: "bg-amber-50",
                                color: "text-amber-500",
                                desc: "Run register checkout in browser.",
                                icon: (
                                    <svg className="w-20 h-14 mx-auto text-amber-500 mb-3" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="15" y="10" width="90" height="52" rx="4" fill="#fff" stroke="currentColor" strokeWidth="2" />
                                        <rect x="22" y="16" width="76" height="34" rx="1" fill="#f1f5f9" />
                                        <path d="M5 67h110l-5 8H15L5 67z" fill="currentColor" fillOpacity="0.4" />
                                    </svg>
                                )
                            },
                            {
                                title: "Mobile POS",
                                bg: "bg-amber-50",
                                color: "text-amber-500",
                                desc: "Handheld bill checkout device.",
                                icon: (
                                    <svg className="w-14 h-16 mx-auto text-amber-500 mb-3" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="22" y="10" width="36" height="80" rx="6" fill="#fff" stroke="currentColor" strokeWidth="2" />
                                        <rect x="27" y="16" width="26" height="54" rx="2" fill="#f1f5f9" />
                                        <rect x="30" y="75" width="20" height="10" rx="1" fill="currentColor" fillOpacity="0.4" />
                                    </svg>
                                )
                            },
                            {
                                title: "Desktop POS",
                                bg: "bg-green-50",
                                color: "text-[#65cb00]",
                                desc: "Windows legacy checkout system.",
                                icon: (
                                    <svg className="w-18 h-16 mx-auto text-[#65cb00] mb-3" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="15" y="10" width="90" height="58" rx="4" fill="#fff" stroke="currentColor" strokeWidth="2" />
                                        <rect x="20" y="15" width="80" height="42" rx="1" fill="#f1f5f9" />
                                        <path d="M50 72l-5 12h30l-5-12H50z" fill="currentColor" fillOpacity="0.4" />
                                        <rect x="35" y="84" width="50" height="2" fill="currentColor" />
                                    </svg>
                                )
                            }
                        ].map((card) => (
                            <Link
                                key={card.title}
                                href={`/products/${card.title.toLowerCase().replace(/ /g, "-")}`}
                                className="border border-gray-100 hover:border-gray-200 bg-white p-5 rounded-2xl text-center hover:shadow-lg transition-all group/card flex flex-col justify-between h-full"
                            >
                                <div>
                                    {card.icon}
                                    <h4 className="font-bold text-gray-900 group-hover/card:text-[#65cb00] transition-colors text-sm mb-1">{card.title}</h4>
                                    <p className="text-xs text-gray-400">{card.desc}</p>
                                </div>
                                <div className="mt-3 flex justify-center">
                                    <span className={`w-8 h-8 rounded-full ${card.bg} flex items-center justify-center`}>
                                        <svg className={`w-4 h-4 ${card.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                );

            case "report-insights":
                return (
                    <div className="grid grid-cols-2 gap-8 h-full items-center animate-fadeIn">
                        <Link href="/products/insightx" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group/item">
                            <div className="p-3 bg-green-50 rounded-full text-[#65cb00]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 group-hover/item:text-[#65cb00] transition-colors">InsightX</h4>
                                <ul className="text-xs text-gray-400 mt-2 space-y-1">
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                        Technology Deep Dive
                                    </li>
                                </ul>
                            </div>
                        </Link>

                        <Link href="/products/bi" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group/item">
                            <div className="p-3 bg-green-50 rounded-full text-[#65cb00]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 group-hover/item:text-[#65cb00] transition-colors">Business Intelligence</h4>
                                <p className="text-xs text-gray-400 mt-1">Analyze multi-store report ledgers and margins.</p>
                            </div>
                        </Link>
                    </div>
                );

            case "gst-compliance":
                return (
                    <div className="grid grid-cols-3 gap-6 h-full items-center animate-fadeIn">
                        {[
                            { title: "GST Software", icon: "📄" },
                            { title: "GST Reconciliation", icon: "⚖️" },
                            { title: "E-Documents", icon: "📧" }
                        ].map((card) => (
                            <Link
                                key={card.title}
                                href={`/products/${card.title.toLowerCase().replace(/ /g, "-")}`}
                                className="border border-gray-100 hover:border-gray-200 bg-white p-5 rounded-2xl text-center hover:shadow-lg transition-all group/card flex flex-col justify-between h-full"
                            >
                                <div>
                                    <svg className="w-20 h-14 mx-auto text-blue-500 mb-3" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="20" y="12" width="80" height="48" rx="4" fill="#fff" stroke="currentColor" strokeWidth="2" />
                                        <rect x="25" y="16" width="70" height="32" rx="1" fill="#f1f5f9" />
                                        <path d="M10 64h100l-4 7H14l-4-7z" fill="currentColor" fillOpacity="0.4" />
                                        {/* Chart representations */}
                                        <line x1="35" y1="24" x2="85" y2="24" stroke="currentColor" strokeWidth="2.5" />
                                        <line x1="35" y1="32" x2="65" y2="32" stroke="currentColor" strokeWidth="2.5" />
                                    </svg>
                                    <h4 className="font-bold text-gray-900 group-hover/card:text-[#65cb00] transition-colors text-sm mb-1">{card.title}</h4>
                                </div>
                                <div className="mt-3 flex justify-center">
                                    <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                );

            case "all-integrations":
                return (
                    <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-8 h-full items-center animate-fadeIn">
                        {/* Column 1: ERP/OMS Integrations with green circle icons */}
                        <div className="flex flex-col gap-6 justify-center">
                            <Link href="/products/erp-pos-integrations" className="flex items-center gap-4 group/item">
                                <div className="p-3 bg-green-50 rounded-full text-[#65cb00] group-hover/item:bg-[#65cb00]/10 transition-colors shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-gray-900 group-hover/item:text-[#65cb00] transition-colors text-sm">
                                    Ginesys ERP - POS Integrations
                                </span>
                            </Link>

                            <Link href="/products/erp-integrated-oms" className="flex items-center gap-4 group/item">
                                <div className="p-3 bg-green-50 rounded-full text-[#65cb00] group-hover/item:bg-[#65cb00]/10 transition-colors shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <circle cx="12" cy="12" r="3" strokeWidth={2} />
                                    </svg>
                                </div>
                                <span className="font-semibold text-gray-900 group-hover/item:text-[#65cb00] transition-colors text-sm">
                                    ERP Integrated Ginesys OMS
                                </span>
                            </Link>
                        </div>

                        {/* Column 2: Marketplace Integrations */}
                        <div className="border-l border-gray-100 pl-8 flex flex-col justify-center h-full">
                            <span className="text-[15px] font-bold text-gray-900 mb-4 block">Marketplace Integrations</span>
                            <div className="flex flex-col gap-3">
                                {[
                                    "Amazon Seller Integration",
                                    "Myntra Seller Integration",
                                    "Flipkart Seller Integration",
                                    "Jiomart Seller Integration"
                                ].map((item) => (
                                    <Link
                                        key={item}
                                        href={`/products/integrations/${item.toLowerCase().replace(/ /g, "-")}`}
                                        className="flex items-center gap-2.5 text-sm font-medium text-gray-700 hover:text-[#65cb00] transition-colors"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400"></span>
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Shopping Cart Integrations */}
                        <div className="border-l border-gray-100 pl-8 flex flex-col justify-center h-full">
                            <span className="text-[15px] font-bold text-gray-900 mb-4 block">Shopping Cart Integrations</span>
                            <div className="flex flex-col gap-3">
                                {[
                                    "Shopify Integration",
                                    "Magento Integration",
                                    "WooCommerce Integration"
                                ].map((item) => (
                                    <Link
                                        key={item}
                                        href={`/products/integrations/${item.toLowerCase().replace(/ /g, "-")}`}
                                        className="flex items-center gap-2.5 text-sm font-medium text-gray-700 hover:text-[#65cb00] transition-colors"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400"></span>
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="absolute left-4 right-4 top-full hidden group-hover:block z-50">
            <div className="w-full bg-white rounded-b-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300">
                <div className="grid grid-cols-[300px_1fr]">
                    {/* Left Sidebar Menu */}
                    <div className="bg-gray-50/50 border-r border-gray-100 py-4">
                        {categories.map((category) => {
                            const isActive = activeTab === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onMouseEnter={() => setActiveTab(category.id)}
                                    className={`w-full text-left px-8 py-5 text-[15px] font-medium border-l-[3px] transition-all cursor-pointer flex items-center justify-between ${isActive
                                            ? "bg-gray-100/70 border-[#65cb00] text-[#65cb00]"
                                            : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-[#65cb00]"
                                        }`}
                                >
                                    <span>{category.label}</span>
                                    {isActive && (
                                        <svg className="w-4 h-4 text-[#65cb00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Content Area */}
                    <div className="p-10 bg-white min-h-[360px]">
                        {type === "solutions" ? (
                            <div className="grid grid-cols-2 gap-8 animate-fadeIn">
                                {currentCategory.items?.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50/70 transition-all group/item"
                                    >
                                        <div className="p-3 bg-green-50 rounded-xl group-hover/item:bg-[#65cb00]/10 transition-colors">
                                            {item.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-semibold text-gray-950 group-hover/item:text-[#65cb00] transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 leading-relaxed font-light">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            renderCustomContent(activeTab)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}