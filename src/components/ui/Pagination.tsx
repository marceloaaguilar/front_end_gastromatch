import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationType } from "@/src/lib/interfaces";

const Pagination = ({ currentPage, totalPages, limit, onPageChange }:PaginationType) => {
  const pages = [];
  const limitPages = limit ? limit : 5;
  for (let i = 1; i <= Math.ceil(totalPages/limitPages); i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5 text-primary" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "text-white bg-primary"
              : "text-primary hover:bg-primary/10"
          } transition`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
};

export default Pagination;
