import Link from "next/link";
import MegaMenu from "./MegaMenu";
import "./header.css";

export default function Header() {
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
                        <span className="font-medium text-2xl tracking-wide text-gray-800">GINESYS</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="h-full">
                        <ul className="flex items-center gap-10 h-full">

                            <li className="group h-full flex items-center">
                                <button className="font-medium flex items-center gap-1 text-gray-700 hover:text-[#65cb00] transition-colors cursor-pointer h-full">
                                    Solutions
                                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <MegaMenu type="solutions" />
                            </li>

                            <li className="group h-full flex items-center">
                                <button className="font-medium flex items-center gap-1 text-gray-700 hover:text-[#65cb00] transition-colors cursor-pointer h-full">
                                    Products
                                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <MegaMenu type="products" />
                            </li>

                            <li className="h-full flex items-center">
                                <Link href="/company" className="font-medium text-gray-700 hover:text-[#65cb00] transition-colors">
                                    Company
                                </Link>
                            </li>

                            <li className="h-full flex items-center">
                                <Link href="/pricing" className="font-medium text-gray-700 hover:text-[#65cb00] transition-colors">
                                    Pricing
                                </Link>
                            </li>

                            <li className="h-full flex items-center">
                                <Link href="/contact-us" className="font-medium text-gray-700 hover:text-[#65cb00] transition-colors">
                                    Contact Us
                                </Link>
                            </li>

                        </ul>
                    </nav>

                    {/* CTA */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/demo"
                            className="bg-[#65cb00] hover:bg-[#57ad00] text-white px-7 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Ask For A Demo
                        </Link>

                        <Link href="/login" className="font-medium text-gray-700 hover:text-[#65cb00] transition-colors">
                            Login
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    );
}