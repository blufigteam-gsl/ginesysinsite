"use client";

import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath?: string;          // e.g. "/blog"
    searchParams?: Record<string, string>; // extra query params to preserve
}

/**
 * Builds the array of page numbers + "..." to show.
 * Example (current=5, total=20):  1  ...  3 4 [5] 6 7  ...  20
 */
function getPageItems(current: number, total: number): (number | "...")[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const items: (number | "...")[] = [1];

    const left = Math.max(2, current - 2);
    const right = Math.min(total - 1, current + 2);

    if (left > 2) items.push("...");
    for (let i = left; i <= right; i++) items.push(i);
    if (right < total - 1) items.push("...");

    items.push(total);
    return items;
}

export default function Pagination({
    currentPage,
    totalPages,
    basePath = "/blog",
    searchParams = {},
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const buildHref = (page: number) => {
        const qs = new URLSearchParams({
            ...searchParams,
            page: String(page),
        });
        return `${basePath}?${qs.toString()}`;
    };

    const items = getPageItems(currentPage, totalPages);

    return (
        <nav className="pagination" aria-label="Blog pages">

            {/* ← Prev */}
            {currentPage > 1 ? (
                <Link
                    href={buildHref(currentPage - 1)}
                    className="pg-arrow"
                    aria-label="Previous page"
                >
                    ‹
                </Link>
            ) : (
                <span className="pg-arrow" aria-disabled="true">‹</span>
            )}

            {/* Page numbers */}
            {items.map((item, idx) =>
                item === "..." ? (
                    <span key={`dots-${idx}`} className="pg-dots">…</span>
                ) : (
                    <Link
                        key={item}
                        href={buildHref(item)}
                        className={item === currentPage ? "pg-active" : ""}
                        aria-current={item === currentPage ? "page" : undefined}
                        aria-label={`Page ${item}`}
                    >
                        {item}
                    </Link>
                )
            )}

            {/* Next → */}
            {currentPage < totalPages ? (
                <Link
                    href={buildHref(currentPage + 1)}
                    className="pg-arrow"
                    aria-label="Next page"
                >
                    ›
                </Link>
            ) : (
                <span className="pg-arrow" aria-disabled="true">›</span>
            )}

        </nav>
    );
}
