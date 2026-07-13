import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#0b4d47] text-white mt-12 text-[13px]">

            {/* Newsletter Row */}
            <div className="border-b border-[#145d56]">
                <div className="max-w-[1360px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-center gap-x-10 gap-y-4">
                    <h4 className="text-xs md:text-[13.5px] font-bold tracking-tight text-center">
                        Stay Informed - Subscribe To Our Newsletter
                    </h4>

                    <div className="flex gap-3 w-full md:w-auto items-center justify-center">
                        <input
                            type="email"
                            placeholder="Your E-mail Address"
                            className="bg-transparent border-b border-[#65cb00] text-white placeholder-gray-400 px-1 py-1.5 outline-none w-full md:w-[280px] text-xs focus:border-white transition-colors"
                        />
                        <button className="bg-[#7ad000] hover:bg-[#65cb00] text-white font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Grid */}
            <div className="max-w-[1360px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[1.1fr_1.4fr_1.3fr_1.5fr_0.6fr_1.1fr] gap-x-8 gap-y-6 items-start">

                {/* Column 1: Solutions */}
                <div className="space-y-4 min-w-0">
                    <p className="text-[#65cb00] font-bold text-[15px] uppercase border-b border-[#65cb00]/40 pb-1.5 mb-2 leading-none">
                        Solutions
                    </p>

                    <div className="space-y-4">
                        <div>
                            <p className="font-bold text-white mb-2 text-[14px] leading-tight">By Need</p>
                            <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px]">
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/solutions/omnichannel" className="hover:text-[#65cb00] transition-colors leading-tight">Omnichannel</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/solutions/fashion-distribution" className="hover:text-[#65cb00] transition-colors leading-tight">Fashion Distribution</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/solutions/wholesale" className="hover:text-[#65cb00] transition-colors leading-tight">Wholesale</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-bold text-white mb-2 text-[14px] leading-tight">By Vertical</p>
                            <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px]">
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/solutions/d2c-brands" className="hover:text-[#65cb00] transition-colors leading-tight">D2C Brands</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/solutions/mbo-retail" className="hover:text-[#65cb00] transition-colors leading-tight">MBO Retail Management</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/solutions/lifestyle-brands" className="hover:text-[#65cb00] transition-colors leading-tight">Lifestyle Brands</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/solutions/supermarkets" className="hover:text-[#65cb00] transition-colors leading-tight">Supermarkets</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-bold text-white mb-2 text-[14px] leading-tight">Upgrade to Ginesys</p>
                            <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px]">
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/solutions/tally-vs-ginesys" className="hover:text-[#65cb00] transition-colors leading-tight">Tally Vs Ginesys</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/solutions/logic-vs-ginesys" className="hover:text-[#65cb00] transition-colors leading-tight">Logic ERP Vs Ginesys</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/solutions/gofrugal-vs-ginesys" className="hover:text-[#65cb00] transition-colors leading-tight">Gofrugal Vs Ginesys</Link>
                                </li>
                            </ul>
                        </div>

                        <ul className="space-y-2 font-bold pt-3 border-t border-[#145d56] text-[13.5px]">
                            <li><Link href="/solutions/migrate-to-cloud" className="text-[#a3cbc8] hover:text-[#65cb00] transition-colors leading-tight">Migrate to Ginesys Cloud</Link></li>
                            <li className="text-white"><Link href="/calculators/seller-fee" className="hover:text-[#65cb00] transition-colors leading-tight">Seller Fee Calculator</Link></li>
                            <li className="text-white"><Link href="/calculators/hsn-gst" className="hover:text-[#65cb00] transition-colors leading-tight">HSN GST Calculator</Link></li>
                            <li className="text-white"><Link href="/calculators/retail-mrp" className="hover:text-[#65cb00] transition-colors leading-tight">Retail MRP Calculator</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Column 2: Integrations */}
                <div className="space-y-4 min-w-0">
                    {/* Aligns top block with SOLUTIONS header */}
                    <p className="text-[#65cb00] font-bold text-[15px] uppercase border-b border-[#65cb00]/40 pb-1.5 mb-2 leading-none select-none hidden lg:block invisible">
                        Solutions
                    </p>

                    <div className="space-y-4">
                        <div>
                            <p className="font-bold text-white mb-2 text-[14px] leading-tight">
                                <Link href="/products/all-integrations" className="hover:text-[#65cb00] transition-colors">
                                    All Integrations
                                </Link>
                            </p>
                            <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px]">
                                <li>
                                    <Link href="/products/erp-pos-integrations" className="hover:text-[#65cb00] transition-colors leading-tight">Ginesys ERP - POS Integrations</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-bold text-[#a3cbc8] mb-2 text-[14px] leading-tight">
                                <Link href="/products/all-integrations" className="hover:text-[#65cb00] transition-colors">
                                    Integrations
                                </Link>
                            </p>
                            <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px]">
                                <li>
                                    <Link href="/products/erp-integrated-oms" className="hover:text-[#65cb00] transition-colors leading-tight">ERP Integrated Ginesys OMS</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-bold text-[#a3cbc8] mb-2 text-[14px] leading-tight">
                                <Link href="/products/all-integrations" className="hover:text-[#65cb00] transition-colors">
                                    Marketplace Integrations
                                </Link>
                            </p>
                            <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px]">
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/products/integrations/amazon-seller-integration" className="hover:text-[#65cb00] transition-colors leading-tight">Amazon Seller Integration</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/products/integrations/myntra-seller-integration" className="hover:text-[#65cb00] transition-colors leading-tight">Myntra Seller Integration</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/products/integrations/flipkart-seller-integration" className="hover:text-[#65cb00] transition-colors leading-tight">Flipkart Seller Integration</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/products/integrations/jiomart-seller-integration" className="hover:text-[#65cb00] transition-colors leading-tight">Jiomart Seller Integration</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-bold text-[#a3cbc8] mb-2 text-[14px] leading-tight">
                                <Link href="/products/all-integrations" className="hover:text-[#65cb00] transition-colors">
                                    Shopping Cart Integrations
                                </Link>
                            </p>
                            <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px]">
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/products/integrations/shopify-seller-integration" className="hover:text-[#65cb00] transition-colors leading-tight">Shopify Integration</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/products/integrations/magento-seller-integration" className="hover:text-[#65cb00] transition-colors leading-tight">Magento Integration</Link>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                    <Link href="/products/integrations/woocommerce-seller-integration" className="hover:text-[#65cb00] transition-colors leading-tight">WooCommerce Integration</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="font-bold text-white pt-3.5 border-t border-[#145d56] text-[13.5px]">
                            <Link href="/products/ai" className="hover:text-[#65cb00] transition-colors leading-tight">Ginesys AI</Link>
                        </div>
                    </div>
                </div>

                {/* Combined Column 3 & 4: Products, Services, More Products */}
                <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-[1.3fr_1.5fr] gap-x-8 gap-y-6">
                    {/* Top Row - Column 3: Products */}
                    <div className="space-y-4 min-w-0">
                        <p className="text-[#65cb00] font-bold text-[15px] uppercase border-b border-[#65cb00]/40 pb-1.5 mb-2 leading-none">
                            Products
                        </p>

                        <div className="space-y-4">
                            <div>
                                <p className="font-bold text-[#a3cbc8] mb-2 text-[14px] leading-tight">
                                    <Link href="/products/warehouse-management" className="hover:text-[#65cb00] transition-colors">
                                        ERP
                                    </Link>
                                </p>
                                <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px]">
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/warehouse-management" className="hover:text-[#65cb00] transition-colors leading-tight">Warehouse Management</Link>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/inventory-management" className="hover:text-[#65cb00] transition-colors leading-tight">Inventory Management</Link>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/procurement-management" className="hover:text-[#65cb00] transition-colors leading-tight">Procurement Management</Link>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/production-management" className="hover:text-[#65cb00] transition-colors leading-tight">Production Management</Link>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/sales-and-distribution" className="hover:text-[#65cb00] transition-colors leading-tight">Sales and Distribution</Link>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/finance-and-accounting" className="hover:text-[#65cb00] transition-colors leading-tight">Finance and Accounting</Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold text-[#a3cbc8] mb-2 text-[14px] leading-tight">
                                    <Link href="/products/ecommerce-order" className="hover:text-[#65cb00] transition-colors">
                                        Ecommerce Order Management
                                    </Link>
                                </p>
                            </div>

                            <div>
                                <p className="font-bold text-[#a3cbc8] mb-2 text-[14px] leading-tight">
                                    <Link href="/products/web-pos" className="hover:text-[#65cb00] transition-colors">
                                        Point of Sales
                                    </Link>
                                </p>
                                <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px]">
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/web-pos" className="hover:text-[#65cb00] transition-colors leading-tight">Cloud/Web POS</Link>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/desktop-pos" className="hover:text-[#65cb00] transition-colors leading-tight">Desktop POS</Link>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/mobile-pos" className="hover:text-[#65cb00] transition-colors leading-tight">Mobile POS</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Top Row - Column 4: More Products */}
                    <div className="space-y-4 min-w-0">
                        {/* Aligns top block with PRODUCTS header */}
                        <p className="text-[#65cb00] font-bold text-[15px] uppercase border-b border-[#65cb00]/40 pb-1.5 mb-2 leading-none select-none hidden lg:block invisible">
                            Products
                        </p>

                        <div className="space-y-4">
                            <div>
                                <p className="font-bold text-[#a3cbc8] mb-2 text-[14px] leading-tight">
                                    <Link href="/products/multi-store-billing" className="hover:text-[#65cb00] transition-colors">
                                        Multi Store Billing Software
                                    </Link>
                                </p>
                            </div>

                            <div>
                                <p className="font-bold text-[#a3cbc8] mb-2 text-[14px] leading-tight">
                                    <Link href="/products/insightx" className="hover:text-[#65cb00] transition-colors">
                                        InsightX
                                    </Link>
                                </p>
                                <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px]">
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/insightx" className="hover:text-[#65cb00] transition-colors leading-tight">Technology Deep Dive</Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold text-[#a3cbc8] mb-2 text-[14px] leading-tight">
                                    <Link href="/products/bi" className="hover:text-[#65cb00] transition-colors">
                                        Business Intelligence
                                    </Link>
                                </p>
                            </div>

                            <div>
                                <p className="font-bold text-[#a3cbc8] mb-2 text-[14px] leading-tight">
                                    <Link href="/products/gst-reconciliation" className="hover:text-[#65cb00] transition-colors">
                                        GST Software
                                    </Link>
                                </p>
                                <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px]">
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/gst-reconciliation" className="hover:text-[#65cb00] transition-colors leading-tight">GST Reconciliation</Link>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 shrink-0"></span>
                                        <Link href="/products/e-documents" className="hover:text-[#65cb00] transition-colors leading-tight">E-Documents</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row - Services (Spans across both Column 3 and Column 4) */}
                    <div className="min-w-0 lg:col-span-2">
                        <p className="text-[#65cb00] font-bold text-[15px] uppercase border-b border-[#65cb00]/40 pb-1.5 mb-2 leading-none">
                            Services
                        </p>
                        <ul className="space-y-1.5 text-[#a3cbc8] text-[13.5px] mt-4">
                            <li>
                                <Link href="/products/marketing-management" className="hover:text-[#65cb00] transition-colors leading-tight">Ecommerce Marketing Management</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Column 5: Company */}
                <div className="space-y-4 min-w-0">
                    <p className="text-[#65cb00] font-bold text-[15px] uppercase border-b border-[#65cb00]/40 pb-1.5 mb-2 leading-none">
                        Company
                    </p>
                    <ul className="space-y-2 text-[#a3cbc8] text-[13.5px]">
                        <li><Link href="/about-us" className="hover:text-[#65cb00] transition-colors leading-tight">About Us</Link></li>
                        <li><Link href="/technology" className="hover:text-[#65cb00] transition-colors leading-tight">Technology</Link></li>
                        <li><Link href="/customers" className="hover:text-[#65cb00] transition-colors leading-tight">Customers</Link></li>
                        <li><Link href="/careers" className="hover:text-[#65cb00] transition-colors leading-tight">Careers</Link></li>
                        <li><Link href="/blog" className="hover:text-[#65cb00] transition-colors leading-tight">Blogs</Link></li>
                        <li><Link href="/events" className="hover:text-[#65cb00] transition-colors leading-tight">Events</Link></li>
                        <li><Link href="/news-and-press-release" className="hover:text-[#65cb00] transition-colors leading-tight">News</Link></li>
                        <li><Link href="/life-at-ginesys" className="hover:text-[#65cb00] transition-colors leading-tight">Life at Ginesys</Link></li>
                    </ul>
                </div>

                {/* Column 6: Support, Social, Certs */}
                <div className="space-y-5 min-w-0">
                    {/* Social Icons Container (Aligned horizontally with column headers on desktop) */}
                    <div className="flex items-center justify-start flex-wrap gap-1.5 mb-2">
                        {[
                            {
                                name: "linkedin",
                                href: "https://www.linkedin.com/company/ginni-systems-ltd",
                                icon: (
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                    </svg>
                                )
                            },
                            {
                                name: "facebook",
                                href: "https://www.facebook.com/ginesys",
                                icon: (
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                                    </svg>
                                )
                            },
                            {
                                name: "instagram",
                                href: "https://instagram.com/ginesysone",
                                icon: (
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                    </svg>
                                )
                            },
                            {
                                name: "twitter",
                                href: "https://twitter.com/ginesys",
                                icon: (
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                )
                            },
                            {
                                name: "youtube",
                                href: "https://youtube.com",
                                icon: (
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                )
                            },
                            {
                                name: "whatsapp",
                                href: "https://whatsapp.com",
                                icon: (
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.249 8.477 3.518 2.266 2.27 3.51 5.284 3.508 8.492-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.666.988 3.311 1.562 5.358 1.563 5.514 0 10.002-4.49 10.006-10.011a9.932 9.932 0 0 0-2.923-7.078 9.873 9.873 0 0 0-7.08-2.922C6.446 2.706 1.96 7.197 1.956 12.72c-.001 2.15.58 3.846 1.682 5.657l-.999 3.65 3.738-.981l.27.108z" />
                                    </svg>
                                )
                            }
                        ].map((soc) => (
                            <a
                                key={soc.name}
                                href={soc.href}
                                target="_blank"
                                rel="noreferrer"
                                className="w-[26px] h-[26px] rounded-md bg-white text-[#0b4d47] hover:bg-[#65cb00] hover:text-white flex items-center justify-center transition-colors shrink-0"
                            >
                                {soc.icon}
                            </a>
                        ))}
                    </div>

                    <div className="space-y-3">
                        <p className="text-[#65cb00] font-bold text-[13px] mb-2 leading-none">
                            Existing User?
                        </p>

                        <div className="space-y-2 w-full max-w-[210px]">
                            {[
                                { label: "Support Portal", href: "https://care.ginesys.in/support/login" },
                                { label: "Knowledge Base", href: "https://kb.ginesys.in/" },
                                { label: "Product Backlog", href: "/product-backlog" },
                                { label: "Ginesys POS Download", href: "https://support.ginesys.in/downloads/current/POS/" }
                            ].map((btn) => (
                                <a
                                    key={btn.label}
                                    href={btn.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block text-center bg-[#7ad000] hover:bg-[#65cb00] text-white rounded-md py-2.5 font-bold text-[14px] transition-colors leading-none"
                                >
                                    {btn.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Badges */}
                    <div className="space-y-2 pt-3 border-t border-[#145d56] w-full max-w-[210px]">
                        {/* GAAS / ISO Badge */}
                        <div className="bg-white px-2.5 py-2 rounded flex items-center gap-2 text-black border border-gray-100">
                            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                                G
                            </div>
                            <div className="text-[9px] leading-tight font-bold">
                                ISO Certified<br />
                                <span className="text-gray-500 font-normal">27001 : 2013</span>
                            </div>
                        </div>

                        {/* AICPA SOC Badge */}
                        <div className="bg-sky-600 px-2.5 py-2 rounded flex items-center gap-2 text-white">
                            <div className="w-6 h-6 rounded-full bg-white text-sky-600 flex items-center justify-center font-bold text-[9px] shrink-0">
                                SOC
                            </div>
                            <div className="text-[9px] leading-tight font-bold">
                                AICPA SOC<br />
                                <span className="text-sky-200 font-normal text-[8px]">Trust Services</span>
                            </div>
                        </div>

                        {/* ISO 27001 : 2022 Badge */}
                        <div className="bg-white px-2.5 py-2 rounded flex items-center gap-2 text-black border border-gray-100">
                            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                                U
                            </div>
                            <div className="text-[9px] leading-tight font-bold">
                                ISO 27001:2022<br />
                                <span className="text-amber-600 font-normal text-[8px]">Certified Quality</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Copyright Row */}
            <div className="bg-white text-black py-4 border-t border-gray-200">
                <div className="max-w-[1360px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[13px]">
                    <div className="flex gap-5 font-bold">
                        <Link href="/privacy-policy" className="hover:text-[#65cb00] transition-colors">Privacy</Link>
                        <Link href="/faqs" className="hover:text-[#65cb00] transition-colors">FAQs</Link>
                        <Link href="/software/terms-of-use" className="hover:text-[#65cb00] transition-colors">Terms of Use</Link>
                    </div>

                    <div className="font-bold text-gray-500">
                        © 2026 Ginni Systems Limited. All Rights Reserved.
                    </div>
                </div>
            </div>

        </footer>
    );
}