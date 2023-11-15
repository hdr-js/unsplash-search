"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "rc-pagination";
import { ReactNode } from "react";

type TPaginationControlProps = {
  page?: number;
  total?: number;
};

const PaginationControl: React.FC<TPaginationControlProps> = ({
  page,
  total,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const handlePageChangeChange = (newPageValue: number) => {
    if (newPageValue === 1) {
      current.delete("page");
    } else {
      current.set("page", newPageValue.toString());
    }

    const query = current.toString();

    router.push(`/${query ? `?${query}` : ""}`);
  };

  const PrevNextArrow = (
    _page: number,
    type: string,
    originalElement: ReactNode
  ) => {
    if (type === "prev") {
      return (
        <button>
          <ChevronLeftIcon className='h-6 w-6'></ChevronLeftIcon>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button>
          <ChevronRightIcon className='h-6 w-6'></ChevronRightIcon>
        </button>
      );
    }
    return originalElement;
  };

  return (
    <Pagination
      className='pagination-data'
      onChange={handlePageChangeChange}
      current={page}
      total={total}
      pageSize={20}
      showLessItems
      itemRender={PrevNextArrow}
    />
  );
};

export default PaginationControl;
