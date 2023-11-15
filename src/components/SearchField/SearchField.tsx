"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDebounce } from "use-debounce";
import { pages } from "next/dist/build/templates/app-page";

type TSearchFieldProps = {
  keyword?: string;
  clearable?: boolean;
};

const SearchField: React.FC<TSearchFieldProps> = ({ keyword, clearable }) => {
  const [fieldValue, setFieldValue] = useState<string | undefined>(keyword);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [debouncedValue] = useDebounce(fieldValue, 750);

  const initialRender = useRef(true);

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!debouncedValue) {
      current.delete("keyword");
      current.delete("sort");
      current.delete("color");
      current.delete("page");
    } else {
      if (current.get("keyword") !== debouncedValue) {
        current.set("keyword", debouncedValue);
        current.delete("page");
      }
    }

    const query = current.toString();

    router.push(`/${query ? `?${query}` : ""}`);
  }, [debouncedValue, router, searchParams]);

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
  };

  return (
    <div className='flex items-center gap-4 h-12 w-full mx-auto rounded-full bg-[#202020]'>
      <div className='pointer-events-none pl-3'>
        <MagnifyingGlassIcon
          className='h-5 w-5 text-gray-400'
          aria-hidden='true'
        />
      </div>
      <input
        type='text'
        placeholder='Type here to search anything...'
        className='block w-full border-0 outline-none mr-3 bg-[#202020] text-white'
        value={fieldValue}
        onChange={handleChangeKeyword}
      />
    </div>
  );
};

export default SearchField;
