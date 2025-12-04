import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const SideBarMenu = () => {
  return (
    <>
      <div className='flex justify-end gap-3'>
        <nav className='md:flex hidden w-full max-w-xs gap-1'>
          <ThemeToggle />
          <Button asChild variant={"ghost"}>
            <Link href={"/cart"}>
              <ShoppingCart /> Cart
            </Link>
          </Button>
          <Button asChild>
            <Link href={"/sign-In"}>
              <UserIcon /> Sign IN
            </Link>
          </Button>
        </nav>
        <nav className='md:hidden'>
          <Sheet>
            <SheetTrigger className='align-middle'>
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className='flex flex-col items-start'>
              <SheetTitle>Okaz</SheetTitle>
              <ThemeToggle />
              <Button asChild variant='ghost'>
                <Link href='/cart'>
                  <ShoppingCart />
                  Cart
                </Link>
              </Button>
              <Button asChild>
                <Link href='/sign-in'>
                  <UserIcon />
                  Sign In
                </Link>
              </Button>
            </SheetContent>
            <SheetDescription></SheetDescription>
          </Sheet>
        </nav>
      </div>
    </>
  );
};

export default SideBarMenu;
