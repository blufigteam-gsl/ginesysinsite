import Link from "next/link";
import { client } from "@/lib/sanity";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import "./header.css";

export default async function Header() {
    const blogs = await client.fetch(`
        *[_type == "blog"] | order(publishDate desc)[0...6]{
            _id,
            title,
            slug,
            featuredImage,
            featuredImageAlt
        }
    `);

    const events = await client.fetch(`
        *[_type == "event"] | order(eventStartDate desc)[0...6]{
            _id,
            title,
            slug,
            featuredImage,
            featuredImageAlt,
            eventStartDate
        }
    `);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-[1200px] mx-auto px-4 relative">
                <div className="flex items-center justify-between h-[90px]">

                    {/* Logo */}
                    <Link href="/" className="flex items-center text-3xl tracking-tight text-gray-900">
                        <svg className="w-11 h-8 mr-2" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="9" stroke="#65cb00" strokeWidth="3.5" fill="none" />
                            <circle cx="30" cy="16" r="9" stroke="#333333" strokeWidth="3.5" fill="none" />
                        </svg>
                        <span className="font-semibold text-2xl tracking-wide text-gray-800">GINESYS</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <Navigation blogs={blogs || []} events={events || []} />

                    {/* Mobile Navigation */}
                    <MobileNavigation blogs={blogs || []} events={events || []} />

                    {/* CTA */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link
                            href="/demo"
                            className="bg-[#65cb00] hover:bg-[#57ad00] text-white px-7 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Ask For A Demo
                        </Link>

                        <Link href="/login" className="font-bold text-gray-700 hover:text-[#65cb00] transition-colors">
                            Login
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    );
}