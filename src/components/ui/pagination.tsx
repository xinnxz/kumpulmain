"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage = 10,
}: PaginationProps) {
    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showEllipsisStart = currentPage > 3;
        const showEllipsisEnd = currentPage < totalPages - 2;

        if (totalPages <= 7) {
            // Show all pages if 7 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (showEllipsisStart) {
                pages.push("...");
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }

            if (showEllipsisEnd) {
                pages.push("...");
            }

            // Always show last page
            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pages = getPageNumbers();
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            {/* Info */}
            {totalItems && (
                <p className="text-sm text-[#5A6A7E] order-2 sm:order-1">
                    Menampilkan <span className="font-semibold text-[#1A2744]">{startItem}-{endItem}</span> dari{" "}
                    <span className="font-semibold text-[#1A2744]">{totalItems}</span> venue
                </p>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center gap-1 order-1 sm:order-2">
                {/* Previous Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-10 w-10 rounded-xl"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {pages.map((page, index) => (
                        typeof page === "number" ? (
                            <button
                                key={index}
                                onClick={() => onPageChange(page)}
                                className={`h-10 w-10 rounded-xl font-semibold text-sm transition-all cursor-pointer ${page === currentPage
                                        ? "bg-[#F5B800] text-[#1A2744] shadow-lg shadow-[#F5B800]/30"
                                        : "text-[#5A6A7E] hover:bg-[#F7F8FA]"
                                    }`}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={index} className="h-10 w-10 flex items-center justify-center text-[#8A95A5]">
                                <MoreHorizontal className="h-4 w-4" />
                            </span>
                        )
                    ))}
                </div>

                {/* Next Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-10 w-10 rounded-xl"
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
