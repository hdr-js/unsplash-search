import React from "react";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/20/solid";

import SortControl from "@components/SortControl/SortControl";
import SearchField from "@components/SearchField/SearchField";
import ImageTile from "@components/ImageTile/ImageTile";
import ColorFilter from "@components/ColorFIlter/ColorFilter";
import { TGetPhotosResponseType, getPhotos } from "@services/getPhotos";
import PaginationControl from "@components/PaginationControl/PaginationControl";

type THomePageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Home: React.FC<THomePageProps> = async ({ searchParams }) => {
  const searchKeyword =
    typeof searchParams.keyword === "string" ? searchParams.keyword : "";
  const color =
    typeof searchParams.color === "string" ? searchParams.color : undefined;
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : undefined;
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;

  let apiResponse: TGetPhotosResponseType = await getPhotos({
    query: searchKeyword,
    page,
    perPage: 20,
    color,
    sort,
  });
  const totalPossibleRecords = Math.min(apiResponse?.total || 0, 4000);

  return (
    <main className='p-6 flex justify-center w-full min-h-screen bg-black'>
      <div className='container'>
        <SearchField keyword={searchKeyword} clearable />
        <div className='h-12 flex justify-end items-center gap-6 mt-6'>
          <SortControl sort={sort} />
          <ColorFilter color={color} />
        </div>
        {totalPossibleRecords && (
          <div className='flex justify-center mt-6'>
            <PaginationControl page={page} total={totalPossibleRecords} />
          </div>
        )}
        <div className='columns-1 sm:columns-2 md:columns-2 lg:columns-3 gap-8 py-6 items-start'>
          {apiResponse?.results.map((photo) => (
            <ImageTile key={photo.id} photo={photo} />
          ))}
        </div>
        {totalPossibleRecords && (
          <div className='flex justify-center'>
            <PaginationControl page={page} total={totalPossibleRecords} />
          </div>
        )}
        {!totalPossibleRecords && (
          <div className='w-full flex flex-col justify-center items-center gap-6'>
            <DocumentMagnifyingGlassIcon
              className='h-32 w-32 text-gray-300'
              aria-hidden='true'
            />
            <h2 className='text-gray-300 text-3xl text-center'>
              No images found
            </h2>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
