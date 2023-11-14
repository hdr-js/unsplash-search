import Image from "next/image";

import { Basic } from "unsplash-js/dist/methods/photos/types";
import UserPortfolio from "@components/UserPortfolio/UserPortfolio";
import { HeartIcon } from "@heroicons/react/24/outline";

// Basic type provided by upsplash-api SDK is missing the tags but it is present in the response.
// adding it here manually because it SDK has no suitable type.

type TImageTileProps = {
  photo: Basic & Partial<{ tags: Array<{ type: string; title: string }> }>;
};

const ImageTile: React.FC<TImageTileProps> = async ({ photo }) => {
  return (
    <div
      key={photo.id}
      className={`w-full overflow-hidden rounded-lg mb-8 relative shadow shadow-[${photo?.color}]/10`}
      style={{ backgroundColor: photo?.color || "silver" }}
    >
      <Image
        className='w-full h-full'
        src={photo?.urls?.small}
        alt={photo?.alt_description || "image-tile-preview"}
        width={photo?.width}
        height={photo?.height}
      />
      <div className='absolute inset-0 h-full- w-full flex flex-col justify-between text-white p-2 opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-40'>
        <div className='flex justify-between'>
          <UserPortfolio user={photo.user} />
          <div className=' flex items-center gap-2 p-2 bg-opacity-50 bg-black rounded'>
            <HeartIcon
              className='h-4 w-4 text-white cursor-pointer'
              aria-hidden='true'
            />
            <span className='text-xs text-white'>{photo.likes}</span>
          </div>
        </div>
        <div className='flex gap-2'>
          {photo?.tags?.map((tag: { type: string; title: string }) => (
            <div
              key={tag?.title}
              className='py-0 px-2 bg-opacity-50 bg-black rounded'
            >
              <span className='text-sm text-white'>{tag?.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageTile;
