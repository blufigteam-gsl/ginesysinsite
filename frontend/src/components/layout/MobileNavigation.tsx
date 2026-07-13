"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNavigation({ blogs, events }: { blogs: any[]; events: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [screenStack, setScreenStack] = useState<string[]>(["main"]);

    const currentScreen = screenStack[screenStack.length - 1];

    const pushScreen = (screen: string) => {
        setScreenStack([...screenStack, screen]);
    };

    const popScreen = () => {
        if (screenStack.length > 1) {
            setScreenStack(screenStack.slice(0, -1));
        }
    };

    const closeDrawer = () => {
        setIsOpen(false);
        setScreenStack(["main"]);
    };

    function getScreenTitle(screen: string): string {
        switch (screen) {
            case "solutions": return "Solutions";
            case "products": return "Products";
            case "services": return "Services";
            case "all-integrations": return "All Integrations";
            case "company": return "Company";
            case "by-need": return "By Need";
            case "by-vertical": return "By Vertical";
            case "upgrade-to-ginesys": return "Upgrade to Ginesys";
            case "backoffice": return "Backoffice Operations";
            case "erp": return "ERP";
            case "ecommerce": return "Ecommerce Operations";
            case "instore": return "In-store Operations";
            case "report": return "Report and Insights";
            case "insightx": return "InsightX";
            case "bi": return "Business Intelligence";
            case "gst": return "GST Compliance";
            case "marketplace-integrations": return "Marketplace Integrations";
            case "shopping-cart-integrations": return "Shopping Cart Integrations";
            case "our-company": return "Our Company";
            default: return "";
        }
    }

    return (
        <div className="flex items-center h-full lg:hidden">
            {/* Mobile & Tablet Navigation Menu Button */}
            <button onClick={() => setIsOpen(true)} className="text-gray-800 p-2 cursor-pointer">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile Drawer Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-white z-[9999] flex flex-col animate-fadeIn text-left">
                    
                    {/* Top Logo Header (Always Visible) */}
                    <div className="flex items-center justify-between h-[90px] px-6 border-b border-gray-200 shrink-0 bg-white">
                        <Link href="/" onClick={closeDrawer} className="flex items-center text-3xl tracking-tight text-gray-900">
                            <svg className="w-11 h-8 mr-2" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="9" stroke="#65cb00" strokeWidth="3.5" fill="none" />
                                <circle cx="30" cy="16" r="9" stroke="#333333" strokeWidth="3.5" fill="none" />
                            </svg>
                            <span className="font-bold text-2xl tracking-wide text-gray-800">GINESYS</span>
                        </Link>
                        <button onClick={closeDrawer} className="text-gray-900 p-2 cursor-pointer">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Teal Submenu Header (Visible when in nested screens) */}
                    {currentScreen !== "main" && (
                        <div className="bg-[#0f5c57] text-white flex items-center h-[60px] px-6 shrink-0 relative">
                            <button onClick={popScreen} className="p-2 cursor-pointer absolute left-4 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <span className="font-bold text-lg mx-auto">{getScreenTitle(currentScreen)}</span>
                        </div>
                    )}

                    {/* Drawer Content Body */}
                    <div className="flex-1 overflow-y-auto">
                        
                        {currentScreen === "main" && (
                            <div className="flex flex-col">
                                {/* Solutions */}
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("solutions")} className="flex-1 py-2.5 px-6 font-bold text-[17px] text-gray-800 text-left">
                                        Solutions
                                    </button>
                                    <button onClick={() => pushScreen("solutions")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Products */}
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("products")} className="flex-1 py-2.5 px-6 font-bold text-[17px] text-gray-800 text-left">
                                        Products
                                    </button>
                                    <button onClick={() => pushScreen("products")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Services */}
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("services")} className="flex-1 py-2.5 px-6 font-bold text-[17px] text-gray-800 text-left">
                                        Services
                                    </button>
                                    <button onClick={() => pushScreen("services")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* All Integrations */}
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <Link href="/products/all-integrations" onClick={closeDrawer} className="flex-1 py-2.5 px-6 font-bold text-[17px] text-gray-800 text-left">
                                        All Integrations
                                    </Link>
                                    <button onClick={() => pushScreen("all-integrations")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Company */}
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("company")} className="flex-1 py-2.5 px-6 font-bold text-[17px] text-gray-800 text-left">
                                        Company
                                    </button>
                                    <button onClick={() => pushScreen("company")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Pricing */}
                                <Link href="/pricing" onClick={closeDrawer} className="w-full flex items-center justify-between py-2.5 px-6 border-b border-gray-200 text-left font-bold text-[17px] text-gray-800 hover:bg-gray-50">
                                    Pricing
                                </Link>

                                {/* Life at Ginesys */}
                                <Link href="/life-at-ginesys" onClick={closeDrawer} className="w-full flex items-center justify-between py-2.5 px-6 border-b border-gray-200 text-left font-bold text-[17px] text-gray-800 hover:bg-gray-50">
                                    Life at Ginesys
                                </Link>

                                {/* Login */}
                                <Link href="/login" onClick={closeDrawer} className="w-full flex items-center justify-between py-2.5 px-6 border-b border-gray-200 text-left font-bold text-[17px] text-[#65cb00] hover:bg-gray-50">
                                    Login
                                </Link>
                            </div>
                        )}

                        {currentScreen === "solutions" && (
                            <div className="flex flex-col">
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("by-need")} className="flex-1 py-2.5 px-6 font-bold text-[16px] text-gray-800 text-left">
                                        By Need
                                    </button>
                                    <button onClick={() => pushScreen("by-need")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("by-vertical")} className="flex-1 py-2.5 px-6 font-bold text-[16px] text-gray-800 text-left">
                                        By Vertical
                                    </button>
                                    <button onClick={() => pushScreen("by-vertical")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("upgrade-to-ginesys")} className="flex-1 py-2.5 px-6 font-bold text-[16px] text-gray-800 text-left">
                                        Upgrade to Ginesys
                                    </button>
                                    <button onClick={() => pushScreen("upgrade-to-ginesys")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentScreen === "by-need" && (
                            <div className="flex flex-col">
                                <Link href="/solutions/omnichannel" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Omnichannel
                                </Link>
                                <Link href="/solutions/wholesale" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Wholesale
                                </Link>
                                <Link href="/solutions/fashion-distribution" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Fashion Distribution
                                </Link>
                            </div>
                        )}

                        {currentScreen === "by-vertical" && (
                            <div className="flex flex-col">
                                <Link href="/solutions/d2c-brands" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    D2C Brands
                                </Link>
                                <Link href="/solutions/mbo-retail" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    MBO Retail Management
                                </Link>
                                <Link href="/solutions/lifestyle-brands" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Lifestyle Brands
                                </Link>
                                <Link href="/solutions/supermarkets" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Supermarkets
                                </Link>
                            </div>
                        )}

                        {currentScreen === "upgrade-to-ginesys" && (
                            <div className="flex flex-col">
                                <Link href="/solutions/tally-vs-ginesys" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Tally Vs Ginesys
                                </Link>
                                <Link href="/solutions/logic-vs-ginesys" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Logic Vs Ginesys
                                </Link>
                                <Link href="/solutions/gofrugal-vs-ginesys" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Gofrugal Vs Ginesys
                                </Link>
                            </div>
                        )}

                        {currentScreen === "products" && (
                            <div className="flex flex-col">
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("backoffice")} className="flex-1 py-2.5 px-6 font-bold text-[16px] text-gray-800 text-left">
                                        Backoffice Operations
                                    </button>
                                    <button onClick={() => pushScreen("backoffice")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("ecommerce")} className="flex-1 py-2.5 px-6 font-bold text-[16px] text-gray-800 text-left">
                                        Ecommerce Operations
                                    </button>
                                    <button onClick={() => pushScreen("ecommerce")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("instore")} className="flex-1 py-2.5 px-6 font-bold text-[16px] text-gray-800 text-left">
                                        In-store Operations
                                    </button>
                                    <button onClick={() => pushScreen("instore")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("report")} className="flex-1 py-2.5 px-6 font-bold text-[16px] text-gray-800 text-left">
                                        Report and Insights
                                    </button>
                                    <button onClick={() => pushScreen("report")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("gst")} className="flex-1 py-2.5 px-6 font-bold text-[16px] text-gray-800 text-left">
                                        GST Compliance
                                    </button>
                                    <button onClick={() => pushScreen("gst")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentScreen === "backoffice" && (
                            <div className="flex flex-col">
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("erp")} className="flex-1 py-2.5 px-6 font-bold text-[16px] text-gray-800 text-left">
                                        ERP
                                    </button>
                                    <button onClick={() => pushScreen("erp")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentScreen === "erp" && (
                            <div className="flex flex-col">
                                {[
                                    { label: "Inventory Management", href: "/products/inventory-management" },
                                    { label: "Procurement Management", href: "/products/procurement-management" },
                                    { label: "Sales and Distribution", href: "/products/sales-and-distribution" },
                                    { label: "Warehouse Management", href: "/products/warehouse-management" },
                                    { label: "Production Management", href: "/products/production-management" },
                                    { label: "Finance and Accounting", href: "/products/finance-and-accounting" }
                                ].map((item) => (
                                    <Link key={item.label} href={item.href} onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {currentScreen === "ecommerce" && (
                            <div className="flex flex-col">
                                <Link href="/products/ecommerce-order" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Ecommerce Order Management
                                </Link>
                                <Link href="/products/warehouse-management" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Warehouse Management
                                </Link>
                            </div>
                        )}

                        {currentScreen === "instore" && (
                            <div className="flex flex-col">
                                <Link href="/products/web-pos" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Web POS
                                </Link>
                                <Link href="/products/mobile-pos" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Mobile POS
                                </Link>
                                <Link href="/products/desktop-pos" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Desktop POS
                                </Link>
                            </div>
                        )}

                        {currentScreen === "report" && (
                            <div className="flex flex-col">
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("insightx")} className="flex-1 py-2.5 px-6 font-bold text-[15px] text-gray-800 text-left">
                                        InsightX
                                    </button>
                                    <button onClick={() => pushScreen("insightx")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("bi")} className="flex-1 py-2.5 px-6 font-bold text-[15px] text-gray-800 text-left">
                                        Business Intelligence
                                    </button>
                                    <button onClick={() => pushScreen("bi")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentScreen === "insightx" && (
                            <div className="flex flex-col">
                                <Link href="/products/insightx" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Technology Deep Dive
                                </Link>
                            </div>
                        )}

                        {currentScreen === "bi" && (
                            <div className="flex flex-col">
                                <Link href="/products/bi" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Retail BI
                                </Link>
                            </div>
                        )}

                        {currentScreen === "gst" && (
                            <div className="flex flex-col">
                                <Link href="/products/gst-software" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    GST Software
                                </Link>
                                <Link href="/products/gst-reconciliation" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    GST Reconciliation
                                </Link>
                                <Link href="/products/e-documents" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    E-Documents
                                </Link>
                            </div>
                        )}

                        {currentScreen === "services" && (
                            <div className="flex flex-col">
                                <Link href="/products/marketing-management" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Ecommerce Marketing Management
                                </Link>
                            </div>
                        )}

                        {currentScreen === "all-integrations" && (
                            <div className="flex flex-col">
                                <Link href="/products/erp-pos-integrations" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    Ginesys ERP - POS Integrations
                                </Link>
                                <Link href="/products/erp-integrated-oms" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                    ERP Integrated Ginesys OMS
                                </Link>
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("marketplace-integrations")} className="flex-1 py-2.5 px-6 font-bold text-[15px] text-gray-800 text-left">
                                        Marketplace Integrations
                                    </button>
                                    <button onClick={() => pushScreen("marketplace-integrations")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("shopping-cart-integrations")} className="flex-1 py-2.5 px-6 font-bold text-[15px] text-gray-800 text-left">
                                        Shopping Cart Integrations
                                    </button>
                                    <button onClick={() => pushScreen("shopping-cart-integrations")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentScreen === "marketplace-integrations" && (
                            <div className="flex flex-col">
                                {[
                                    { label: "Amazon Seller Integration", href: "/products/integrations/amazon-seller-integration" },
                                    { label: "Myntra Seller Integration", href: "/products/integrations/myntra-seller-integration" },
                                    { label: "Flipkart Seller Integration", href: "/products/integrations/flipkart-seller-integration" },
                                    { label: "Jiomart Seller Integration", href: "/products/integrations/jiomart-seller-integration" }
                                ].map((item) => (
                                    <Link key={item.label} href={item.href} onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {currentScreen === "shopping-cart-integrations" && (
                            <div className="flex flex-col">
                                {[
                                    { label: "Shopify Seller Integration", href: "/products/integrations/shopify-seller-integration" },
                                    { label: "WooCommerce Seller Integration", href: "/products/integrations/woocommerce-seller-integration" },
                                    { label: "Magento Seller Integration", href: "/products/integrations/magento-seller-integration" }
                                ].map((item) => (
                                    <Link key={item.label} href={item.href} onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {currentScreen === "company" && (
                            <div className="flex flex-col">
                                <div className="w-full flex items-center justify-between border-b border-gray-200 hover:bg-gray-50">
                                    <button onClick={() => pushScreen("our-company")} className="flex-1 py-2.5 px-6 font-bold text-[16px] text-gray-800 text-left">
                                        Our Company
                                    </button>
                                    <button onClick={() => pushScreen("our-company")} className="p-2.5 border-l border-gray-200 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <Link href="/blog" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[16px] text-gray-800 hover:bg-gray-50">
                                    Blogs
                                </Link>
                                <Link href="/news-and-press-release" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[16px] text-gray-800 hover:bg-gray-50">
                                    News
                                </Link>
                                <Link href="/events" onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[16px] text-gray-800 hover:bg-gray-50">
                                    Events
                                </Link>
                            </div>
                        )}

                        {currentScreen === "our-company" && (
                            <div className="flex flex-col">
                                {[
                                    { label: "About Us", href: "/about-us" },
                                    { label: "Partner With Us", href: "/partner-with-us" },
                                    { label: "Careers", href: "/careers" },
                                    { label: "Our Customers", href: "/customers" },
                                    { label: "Technology", href: "/technology" },
                                    { label: "Life at Ginesys", href: "/life-at-ginesys" }
                                ].map((item) => (
                                    <Link key={item.label} href={item.href} onClick={closeDrawer} className="w-full py-2.5 px-6 border-b border-gray-200 font-bold text-[15px] text-gray-800 hover:bg-gray-50">
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}

                    </div>

                    {/* Sticky Footer Area inside Drawer */}
                    <div className="p-6 border-t border-gray-200 flex items-center justify-between gap-4 mt-auto shrink-0 bg-white">
                        <Link href="/contact-us" onClick={closeDrawer} className="flex-1 text-center py-2.5 border border-gray-800 rounded-full font-bold text-[15px] text-gray-800 hover:bg-gray-50 flex items-center justify-center gap-2">
                            Contact Us
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                        <Link href="/demo" onClick={closeDrawer} className="flex-1 text-center py-2.5 bg-[#0f5c57] text-white rounded-full font-bold text-[15px] hover:bg-[#0b4743] flex items-center justify-center gap-2">
                            Request A Demo
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>

                </div>
            )}
        </div>
    );
}
