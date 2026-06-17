import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#0f5c57] text-white mt-20">

            {/* Newsletter */}
            <div className="border-b border-[#65cb00]/30">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <h2 className="text-3xl lg:text-4xl font-bold">
                            Stay Informed - Subscribe To Our Newsletter
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <input
                                type="email"
                                placeholder="Your E-mail Address"
                                className="border-b border-[#65cb00] bg-transparent px-4 py-2 outline-none min-w-[300px]"
                            />

                            <button className="bg-[#65cb00] px-8 py-3 rounded-full font-semibold">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Columns */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                {/* Column 1 */}
                <div>
                    <h3 className="text-[#65cb00] font-bold border-b border-[#65cb00] pb-2 mb-4">
                        Solutions
                    </h3>

                    <h4 className="font-semibold mb-2">By Need</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/solutions/need/omnichannel-retail">Omnichannel</Link></li>
                        <li><Link href="/solutions/fashion-distribution">Fashion Distribution</Link></li>
                        <li><Link href="/solutions/wholesale">Wholesale</Link></li>
                    </ul>

                    <h4 className="font-semibold mt-5 mb-2">By Vertical</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/solutions/d2c-brand">D2C Brands</Link></li>
                        <li><Link href="/solutions/apparel-lifestyle-retailers">MBO Retail Management</Link></li>
                        <li><Link href="/solutions/apparel-and-lifestyle-brands">Lifestyle Brands</Link></li>
                        <li><Link href="/solutions/supermarket-billing-software">Supermarkets</Link></li>
                    </ul>

                    <h4 className="font-semibold mt-5 mb-2">Upgrade To Ginesys</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/tally-vs-ginesys">Tally Vs Ginesys</Link></li>
                        <li><Link href="/logicerp-vs-ginesys">Logic ERP Vs Ginesys</Link></li>
                    </ul>

                    <ul className="space-y-2 mt-5 text-sm font-semibold">
                        <li><Link href="/migrate-to-ginesys-cloud">Migrate To Ginesys Cloud</Link></li>
                        <li><Link href="/seller-fee-calculation">Seller Fee Calculator</Link></li>
                        <li><Link href="/hsn-gst-calculator">HSN GST Calculator</Link></li>
                        <li><Link href="/retail-mrp-profit-calculator">Retail MRP Calculator</Link></li>
                    </ul>
                </div>

                {/* Column 2 */}
                <div>
                    <h3 className="text-[#65cb00] font-bold border-b border-[#65cb00] pb-2 mb-4">
                        Integrations
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li><Link href="/products/all-integrations">All Integrations</Link></li>
                        <li><Link href="/products/integrations">Ginesys ERP POS Integrations</Link></li>
                        <li><Link href="/products/erp-integrated-ginesys-oms">ERP Integrated Ginesys OMS</Link></li>
                    </ul>

                    <h4 className="font-semibold mt-5 mb-2">Marketplace</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/solutions/integrations/amazon-seller-integration">Amazon Seller Integration</Link></li>
                        <li><Link href="/solutions/integrations/myntra-seller-integration">Myntra Seller Integration</Link></li>
                        <li><Link href="/solutions/integrations/flipkart-seller-integration">Flipkart Seller Integration</Link></li>
                        <li><Link href="/solutions/integrations/jiomart-integration">Jiomart Seller Integration</Link></li>
                    </ul>

                    <h4 className="font-semibold mt-5 mb-2">Shopping Cart</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/products/integrations/shopify-ecommerce-integrations/">Shopify Integration</Link></li>
                        <li><Link href="/products/integrations/magento-ecommerce-integrations/">Magento Integration</Link></li>
                        <li><Link href="/products/integrations/woocommerce-ecommerce-integrations/">WooCommerce Integration</Link></li>
                    </ul>

                    <div className="mt-5 font-semibold">
                        <Link href="/ai">Ginesys AI</Link>
                    </div>
                </div>

                {/* Column 3 */}
                <div>
                    <h3 className="text-[#65cb00] font-bold border-b border-[#65cb00] pb-2 mb-4">
                        Products
                    </h3>

                    <h4 className="font-semibold mb-2">ERP</h4>

                    <ul className="space-y-2 text-sm">
                        <li><Link href="/products/retail-erp/warehouse-management">Warehouse Management</Link></li>
                        <li><Link href="/products/retail-erp/inventory-management">Inventory Management</Link></li>
                        <li><Link href="/products/retail-erp/procurement-management">Procurement Management</Link></li>
                        <li><Link href="/products/retail-erp/production-management">Production Management</Link></li>
                        <li><Link href="/products/retail-erp/sales-and-distribution">Sales And Distribution</Link></li>
                        <li><Link href="/products/retail-erp/finance-and-accounting">Finance And Accounting</Link></li>
                    </ul>

                    <div className="mt-5">
                        <Link href="/products/e-commerce">
                            Ecommerce Order Management
                        </Link>
                    </div>

                    <h4 className="font-semibold mt-5 mb-2">Point Of Sales</h4>

                    <ul className="space-y-2 text-sm">
                        <li><Link href="/products/mpos">Cloud/Web POS</Link></li>
                        <li><Link href="/products/desktop-pos">Desktop POS</Link></li>
                        <li><Link href="/products/mobile-pos">Mobile POS</Link></li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div>
                    <h3 className="text-[#65cb00] font-bold border-b border-[#65cb00] pb-2 mb-4">
                        More Products
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li><Link href="/multi-store-retail-billing-software">Multi Store Billing Software</Link></li>
                        <li><Link href="/products/analytics-reports-insights">InsightX</Link></li>
                        <li><Link href="/products/analytics-reports-insights/technology-overview">Technology Deep Dive</Link></li>
                        <li><Link href="/products/business-intelligence">Business Intelligence</Link></li>
                    </ul>

                    <h4 className="font-semibold mt-5 mb-2">GST Software</h4>

                    <ul className="space-y-2 text-sm">
                        <li><Link href="/products/gst-reconciliation">GST Reconciliation</Link></li>
                        <li><Link href="/products/e-documents">E-Documents</Link></li>
                    </ul>

                    <h4 className="font-semibold mt-5 mb-2">Services</h4>

                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/products/ecommerce-development-marketing">
                                Ecommerce Marketing Management
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 5 */}
                <div>
                    <h3 className="text-[#65cb00] font-bold border-b border-[#65cb00] pb-2 mb-4">
                        Company
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about-us">About Us</Link></li>
                        <li><Link href="/technology">Technology</Link></li>
                        <li><Link href="/customers">Customers</Link></li>
                        <li><Link href="/careers">Careers</Link></li>
                        <li><Link href="/blog">Blogs</Link></li>
                        <li><Link href="/events">Events</Link></li>
                        <li><Link href="/news-and-press-release">News</Link></li>
                        <li><Link href="/life-at-ginesys">Life At Ginesys</Link></li>
                    </ul>

                    <h3 className="text-[#65cb00] font-bold mt-8 mb-4">
                        Existing User?
                    </h3>

                    <div className="space-y-3">
                        <a
                            href="https://care.ginesys.in/support/login"
                            target="_blank"
                            className="block bg-[#65cb00] text-center rounded-full px-4 py-2 text-black font-semibold"
                        >
                            Support Portal
                        </a>

                        <a
                            href="https://kb.ginesys.in/"
                            target="_blank"
                            className="block bg-[#65cb00] text-center rounded-full px-4 py-2 text-black font-semibold"
                        >
                            Knowledge Base
                        </a>

                        <Link
                            href="/product-backlog"
                            className="block bg-[#65cb00] text-center rounded-full px-4 py-2 text-black font-semibold"
                        >
                            Product Backlog
                        </Link>

                        <a
                            href="https://support.ginesys.in/downloads/current/POS/"
                            target="_blank"
                            className="block bg-[#65cb00] text-center rounded-full px-4 py-2 text-black font-semibold"
                        >
                            POS Download
                        </a>
                    </div>

                    <div className="flex gap-3 mt-6 text-sm">
                        <a href="https://www.linkedin.com/company/ginni-systems-ltd">LinkedIn</a>
                        <a href="https://www.facebook.com/ginesys">Facebook</a>
                        <a href="https://instagram.com/ginesysone">Instagram</a>
                        <a href="https://twitter.com/ginesys">X</a>
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-black">

                    <div className="flex gap-6">
                        <Link href="/privacy-policy">Privacy</Link>
                        <Link href="/faqs">FAQs</Link>
                        <Link href="/software/terms-of-use">Terms Of Use</Link>
                    </div>

                    <div className="font-medium">
                        © 2026 Ginni Systems Limited. All Rights Reserved.
                    </div>

                </div>
            </div>

        </footer>
    );
}