"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(page);
  const [goToPage, setGoToPage] = useState("");

  const navigateToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set(urlParamName || "page", pageNumber.toString());

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    router.push(newUrl, { scroll: false });
  };

  const handleGoToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(goToPage, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      navigateToPage(pageNum);
      setGoToPage("");
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className='flex flex-col sm:flex-row items-center gap-4'>
      {/* Navigation buttons */}
      <div className='flex items-center gap-1'>
        {/* First page */}
        <Button
          size='icon'
          variant='outline'
          onClick={() => navigateToPage(1)}
          disabled={currentPage <= 1}
          title='First page'
        >
          <ChevronFirst className='h-4 w-4' />
        </Button>

        {/* Previous page */}
        <Button
          size='icon'
          variant='outline'
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          title='Previous page'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNum, index) =>
          pageNum === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className='px-2 text-muted-foreground'
            >
              ...
            </span>
          ) : (
            <Button
              key={pageNum}
              size='icon'
              variant={currentPage === pageNum ? "default" : "outline"}
              onClick={() => navigateToPage(pageNum as number)}
              className='w-10'
            >
              {pageNum}
            </Button>
          )
        )}

        {/* Next page */}
        <Button
          size='icon'
          variant='outline'
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          title='Next page'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>

        {/* Last page */}
        <Button
          size='icon'
          variant='outline'
          onClick={() => navigateToPage(totalPages)}
          disabled={currentPage >= totalPages}
          title='Last page'
        >
          <ChevronLast className='h-4 w-4' />
        </Button>
      </div>

      {/* Page info and Go to page */}
      <div className='flex items-center gap-4'>
        <span className='text-sm text-muted-foreground'>
          Page {currentPage} of {totalPages}
        </span>

        <form onSubmit={handleGoToPage} className='flex items-center gap-2'>
          <Input
            type='number'
            min={1}
            max={totalPages}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            placeholder='Go to...'
            className='w-20 h-9'
          />
          <Button type='submit' size='sm' variant='secondary'>
            Go
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Pagination;
