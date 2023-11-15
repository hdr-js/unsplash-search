"use client";

import { ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { sortKeys } from "@utils/constants";

type TSortControlProps = {
  sort?: (typeof sortKeys)[number];
};

const SortControl: React.FC<TSortControlProps> = ({ sort }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const handleSortValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = e.target.value;

    if (!newSortValue) {
      current.delete("sort");
    } else {
      current.set("sort", newSortValue);
    }

    const query = current.toString();

    router.push(`/${query ? `?${query}` : ""}`);
  };

  const disabled = !current.get("keyword");

  return (
    <select
      disabled={disabled}
      value={sort || "relevant"}
      onChange={handleSortValueChange}
      className={`text-white bg-[#202020] px-3 py-3 cursor-${
        disabled ? "not-allowed" : "pointer"
      } border-r-8 border-transparent rounded-full outline-none w-32 disabled:text-gray-500`}
    >
      {sortKeys?.map((sortKey) => (
        <option key={sortKey} value={sortKey} className='text-sm text-white'>
          {sortKey.replace(/\b\w/g, (c) => c.toUpperCase())}
        </option>
      ))}
    </select>
  );
};

export default SortControl;
