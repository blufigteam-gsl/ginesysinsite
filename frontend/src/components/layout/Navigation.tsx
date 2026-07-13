"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MegaMenu from "./MegaMenu";

export default function Navigation({ blogs, events }: { blogs: any[]; events: any[] }) {
    const pathname = usePathname();

    const isSolutionsActive = pathname.startsWith("/solutions");
    const isProductsActive = pathname.startsWith("/products");
    const isCompanyActive =
        pathname === "/about-us" ||
        pathname === "/partner-with-us" ||
        pathname === "/careers" ||
        pathname === "/customers" ||
        pathname === "/technology" ||
        pathname === "/life-at-ginesys" ||
        pathname.startsWith("/blog") ||
        pathname.startsWith("/events") ||
        pathname === "/news-and-press-release" ||
        pathname === "/company";
    const isPricingActive = pathname === "/pricing";
    const isContactActive = pathname === "/contact-us";

    return (
        <div className="flex items-center h-full">
            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-10 h-full">

                <li className="group h-full flex items-center">
                    <button className={`font-bold flex items-center gap-1 transition-colors cursor-pointer h-full ${isSolutionsActive ? "text-[#65cb00]" : "text-gray-700 hover:text-[#65cb00]"}`}>
                        Solutions
                        <svg className={`w-4 h-4 transition-transform group-hover:rotate-180 ${isSolutionsActive ? "text-[#65cb00]" : "text-gray-500 group-hover:text-[#65cb00]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <MegaMenu type="solutions" />
                </li>

                <li className="group h-full flex items-center">
                    <button className={`font-bold flex items-center gap-1 transition-colors cursor-pointer h-full ${isProductsActive ? "text-[#65cb00]" : "text-gray-700 hover:text-[#65cb00]"}`}>
                        Products
                        <svg className={`w-4 h-4 transition-transform group-hover:rotate-180 ${isProductsActive ? "text-[#65cb00]" : "text-gray-500 group-hover:text-[#65cb00]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <MegaMenu type="products" />
                </li>

                <li className="group h-full flex items-center">
                    <button className={`font-bold flex items-center gap-1 transition-colors cursor-pointer h-full ${isCompanyActive ? "text-[#65cb00]" : "text-gray-700 hover:text-[#65cb00]"}`}>
                        Company
                        <svg className={`w-4 h-4 transition-transform group-hover:rotate-180 ${isCompanyActive ? "text-[#65cb00]" : "text-gray-500 group-hover:text-[#65cb00]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <MegaMenu type="company" blogs={blogs} events={events} />
                </li>

                <li className="h-full flex items-center">
                    <Link href="/pricing" className={`font-bold transition-colors ${isPricingActive ? "text-[#65cb00]" : "text-gray-700 hover:text-[#65cb00]"}`}>
                        Pricing
                    </Link>
                </li>

                <li className="h-full flex items-center">
                    <Link href="/contact-us" className={`font-bold transition-colors ${isContactActive ? "text-[#65cb00]" : "text-gray-700 hover:text-[#65cb00]"}`}>
                        Contact Us
                    </Link>
                </li>

            </ul>
        </div>
    );
}
