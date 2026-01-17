"use client";
import Link from "next/link";
import React, { useMemo } from "react";
import { Button } from "../ui/button";
import {
  Search,
  Car,
  CarFront,
  PlusCircle,
  Bell,
  Plus,
  Home,
  User,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import NotificationBadge from "../common/NotificationBadge";
import MobileNav from "./Mobile/mobile-nav";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Rides",
    children: [
      {
        label: "Explore Rides",
        href: "/rides",
        icon: Search,
        image: "/car-check.png",
      },
      {
        label: "Post a Ride",
        href: "/ride/new",
        icon: PlusCircle,
        cta: true,
        image: "/car-plus.png",
      },
      {
        label: "Booked Rides",
        href: "/rides/booked",
        icon: Car,
        image: "/phone-car.png",
      },
    ],
  },
];

const Navbar = () => {
  const { user } = useUser();
  const { userId } = useCurrentUserId();
  const pathname = usePathname();

  const mobileSheetItems = useMemo(
    () => [
      { label: "Home", href: "/", icon: Home, image: "/car-check.png" },
      {
        label: "Explore Rides",
        href: "/rides",
        icon: Search,
        image: "/car-check.png",
      },
      {
        label: "Post a Ride",
        href: "/ride/new",
        icon: PlusCircle,
        cta: true,
        image: "/car-plus.png",
      },
      {
        label: "Booked Rides",
        href: "/rides/booked",
        icon: Car,
        image: "/phone-car.png",
      },
      {
        label: "Requests",
        href: "/requests",
        icon: Bell,
        image: "/phone-car.png",
      },
      {
        label: "Profile",
        href: userId ? `/user/${userId}` : "/profile",
        icon: User,
        image: "/car-check.png",
      },
    ],
    [userId],
  );
  const segments = pathname.split("/").filter(Boolean);

  const hideHeader =
    segments[0] === "ride" && segments.length === 2 && segments[1] !== "new";

  if (hideHeader) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-[3] transition-all duration-300 bg-dark/80  shadow-md backdrop-blur-sm">
      <div className="w-full container mx-auto sm:px-6 md:px-12 lg:px-24 xl:px-0 px-4">
        <div className="flex items-center h-16">
          <div className="flex-1 flex items-center gap-4">
            <MobileNav navigationItems={mobileSheetItems} pathname={pathname} />
            <Link
              href={"/"}
              className="text-foreground font-poppins font-bold text-xl flex items-center cursor-pointer"
            >
              <CarFront className="text-primary" />
              <span className="ml-2">RidePlus</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-center gap-4">
            {navItems.map((item, idx) =>
              item.children ? (
                <NavigationMenu key={6}>
                  <NavigationMenuList>
                    <NavigationMenuItem className="hover:bg-transparent">
                      <NavigationMenuTrigger className="text-[16px]">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="">
                        <div className=" p-2 grid w-48 ">
                          {item.children.map((i, id) => (
                            <Button
                              variant={"ghost"}
                              className={"justify-start"}
                              key={id}
                              asChild
                            >
                              <Link href={i.href || ""}>
                                <i.icon /> {i.label}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Button
                  variant={"ghost"}
                  key={idx}
                  className={cn(
                    pathname === item.href && "border-b",
                    "text-[16px]  border-primary shadow-none hover:bg-transparent hover:border-b rounded-none transition-colors duration-300)",
                  )}
                  asChild
                >
                  <Link href={item.href || ""}>{item.label}</Link>
                </Button>
              ),
            )}
          </div>
          <div className="flex items-center pl-6 ">
            {user ? (
              <div className="flex items-center  gap-4 md:gap-6">
                <Link href={"/rides"}>
                  <Avatar className="size-9 hover:bg-muted rounded-full ">
                    <AvatarFallback className="rounded-sm ">
                      <Search strokeWidth={1} className="size-6 " />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Link href={"/ride/new"}>
                  <Avatar className="size-9 hover:bg-muted rounded-full ">
                    <AvatarFallback className="rounded-sm ">
                      <Plus strokeWidth={1} className="size-6 " />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Link href={"/requests"}>
                  <NotificationBadge />
                </Link>
                <div className="hidden md:block">
                  <UserButton
                    userProfileUrl={userId ? `/user/${userId}` : undefined}
                  />
                </div>
              </div>
            ) : (
              <Button asChild>
                <Link href={"/sign-in"}>SignIn</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
