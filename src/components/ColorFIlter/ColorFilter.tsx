"use client";

import React from "react";
import { ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { colors } from "@utils/constants";

type TColorFilterProps = {
  color?: (typeof colors)[number];
};

const ColorFilter: React.FC<TColorFilterProps> = ({ color }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const handleColorValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newColorValue = e.target.value;

    if (!newColorValue) {
      current.delete("color");
    } else {
      current.set("color", newColorValue);
    }

    const query = current.toString();

    router.push(`/${query ? `?${query}` : ""}`);
  };

  const disabled = !current.get("keyword");

  return (
    <select
      disabled={disabled}
      placeholder='Color to Filter'
      value={color || ""}
      onChange={handleColorValueChange}
      className={`text-white bg-[#202020] px-3 py-3 cursor-${
        disabled ? "not-allowed" : "pointer"
      } border-r-8 border-transparent rounded-full outline-none w-36 disabled:text-gray-500`}
    >
      <option value=''>Colors: All</option>
      {colors?.map((color) => (
        <option key={color} value={color} className='text-sm text-white'>
          {color.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </option>
      ))}
    </select>
  );
};

export default ColorFilter;
