import { ColorId, SearchOrderBy } from "unsplash-js";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import { Basic } from "unsplash-js/dist/methods/photos/types";

import { unsplashApi } from "@services/unsplash";
import SortControl from "@components/SortControl/SortControl";
import SearchField from "@components/SearchField/SearchField";
import ImageTile from "@components/ImageTile/ImageTile";
import ColorFilter from "@components/ColorFIlter/ColorFilter";

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

  let apiResponse: Photos | { results: Basic[]; total: number } | undefined;

  if (searchKeyword) {
    const { response } = await unsplashApi.search.getPhotos({
      query: searchKeyword,
      page: 1,
      perPage: 20,
      color: color as ColorId,
      orderBy: sort as SearchOrderBy,
    });
    apiResponse = response;
  } else {
    const { response } = await unsplashApi.photos.list({
      page: 1,
      perPage: 20,
    });
    apiResponse = response;
  }

  return (
    <main className='p-6 flex justify-center w-full min-h-screen bg-black'>
      <div className='container'>
        <SearchField keyword={searchKeyword} clearable />
        <div className='h-12 flex justify-between items-center mt-6'>
          <p className='text-sm text-gray-500'>
            Total Results: {apiResponse?.total}
          </p>
          <div className='flex gap-6'>
            <SortControl sort={sort} />
            <ColorFilter color={color} />
          </div>
        </div>
        <div className='columns-1 sm:columns-2 md:columns-2 lg:columns-3 gap-8 py-6 items-start overflow-scroll'>
          {apiResponse?.results.map((photo) => (
            <ImageTile key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
