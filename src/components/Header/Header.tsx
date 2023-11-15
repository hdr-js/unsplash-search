import { CodeBracketIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <nav className='flex justify-between items-center h-16 bg-black px-6'>
      <h6 className='text-white text-s'>ZORA Front-end Assignment</h6>

      <Link target='blank' href={"https://github.com/hdr-js/unsplash-search"}>
        <CodeBracketIcon
          className='h-5 w-5 text-gray-400 cursor-pointer'
          aria-hidden='true'
        />
      </Link>
    </nav>
  );
};

export default Header;
