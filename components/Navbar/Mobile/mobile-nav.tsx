import { CarFront, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";

import UserMobileActions from "../../auth/UserMobileActions";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../../ui/sheet";
import ThemeSwitch from "../../ui/theme-switch";

type NavigationItem = {
  label: string;
  href: string;
  icon: ElementType;
};

type MobileNavProps = {
  navigationItems: NavigationItem[];
  pathname: string;
};

const MobileNav = ({ navigationItems, pathname }: MobileNavProps) => (
  <Sheet>
    <SheetTrigger className="rounded-full p-2 hover:bg-muted md:hidden">
      <Menu strokeWidth={1} size={6} className="size-6" />
      <span className="sr-only">Toggle navigation menu</span>
    </SheetTrigger>
    <SheetContent
      className="z-[2000] flex size-full flex-col justify-between p-0 pb-2"
      side="left"
    >
      <SheetHeader>
        <div className="flex h-16 items-center justify-between bg-muted px-4 py-2 text-lg">
          <Link
            href="/"
            className="font-poppins flex cursor-pointer items-center text-xl font-bold text-foreground"
          >
            <CarFront className="text-primary" />
            <span className="ml-2">RidePlus</span>
          </Link>

          <SheetClose className="rounded-full p-2 hover:bg-foreground/20">
            <X strokeWidth={1} className="size-6 text-foreground/80" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
        <div className="flex flex-col justify-center divide-y px-4 font-medium">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <div key={item.label} className="py-2">
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-md py-2 pl-1 font-normal hover:bg-muted/40",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon
                        strokeWidth={1}
                        className="size-6 text-current"
                      />
                      <span>{item.label}</span>
                    </div>

                    <ChevronRight
                      strokeWidth={1}
                      className="size-6 text-current"
                    />
                  </Link>
                </SheetClose>
              </div>
            );
          })}
        </div>
      </SheetHeader>
      <SheetFooter>
        <div className="flex w-full items-center justify-between border-t px-4 py-2">
          <div className="flex w-full items-center justify-start">
            <UserMobileActions />
          </div>
          <div>
            <ThemeSwitch />
          </div>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export default MobileNav;
