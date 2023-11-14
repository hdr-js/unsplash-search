import Image from "next/image";

import { Basic } from "unsplash-js/dist/methods/users/types";

type TUserPortfolioProps = {
  user: Basic;
};

const UserPortfolio: React.FC<TUserPortfolioProps> = async ({ user }) => {
  return (
    <div className='flex gap-2'>
      <div className='w-8 h-8 rounded-full overflow-hidden bg-gray-500'>
        <Image
          src={user.profile_image.small}
          alt={user.username || "profile-image"}
          width={32}
          height={32}
        />
      </div>
      <div className='text-white text-xs'>
        <p className='font-medium mb-0'>{user.name}</p>
        <p className='font-light mb-0'>({user.username})</p>
      </div>
    </div>
  );
};

export default UserPortfolio;
