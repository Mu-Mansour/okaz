import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import SideBarMenu from "./SideBarMenu";
import CategoriesDrawer from "./CategoriesDrawer";
import Search from "./search";

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className=' wrapper flex-between'>
        <div className='flex-start'>
          <CategoriesDrawer />
          <Link href={"/"} className='flex-start ml-4'>
            <Image
              src='/favicon.ico'
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className='hidden lg:block font-bold text-2xl ml-3'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <Search />

        <SideBarMenu />
      </div>
    </header>
  );
};

export default Header;
