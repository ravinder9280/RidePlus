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
  LogOutIcon,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import NotificationBadge from "../common/NotificationBadge";
import MobileNav from "./Mobile/mobile-nav";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = () => {
  const { user } = useUser();
  const { userId } = useCurrentUserId();
  const imageUrl = user?.imageUrl;
  const name = user?.fullName || user?.firstName || "User";
  const initials = (user?.firstName?.[0] || "") + (user?.lastName?.[0] || "");

  const pathname = usePathname();

  const mobileSheetItems = useMemo(
    () => [
      { label: "Home", href: "/", icon: Home, image: "/car-check.png" },
      {
        label: "Explore Rides",
        href: "/rides/search",
        icon: Search,
        image: "/car-check.png",
      },
      {
        label: "Post a Ride",
        href: "/rides/new",
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
      <div className="w-full container mx-auto sm:px-2 md:px-12 lg:px-24 xl:px-0 px-4">
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

          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-1 sm:gap-6">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/rides/search"
                      className="flex items-center gap-2 hover:bg-muted rounded-full md:rounded-md p-2"
                    >
                      <Search size={24} strokeWidth={1} />
                      <span className="text-sm font-medium hidden md:block">
                        Find a Ride
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/rides/new"
                      className="flex items-center gap-2 hover:bg-muted rounded-full md:rounded-md p-2"
                    >
                      <Plus size={24} strokeWidth={1} />
                      <span className="text-sm font-medium hidden md:block">
                        Post a Ride
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {user ? (
                  <>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/requests">
                          <NotificationBadge />
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:block">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="ring-0 outline-none">
                          <Avatar className="size-8">
                            {imageUrl ? (
                              <AvatarImage src={imageUrl} alt={name} />
                            ) : (
                              <AvatarFallback>{initials || "U"}</AvatarFallback>
                            )}
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                              <Link
                                href={userId ? `/user/${userId}` : "/profile"}
                              >
                                <User />
                                Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href="/rides/booked">
                                <Car />
                                Booked Rides
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <SignOutButton redirectUrl="/sign-in">
                              <div className="flex items-center gap-2">
                                <LogOutIcon />
                                <span> Logout</span>
                              </div>
                            </SignOutButton>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </NavigationMenuItem>
                  </>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Button asChild>
                        <Link href={"/sign-in"}>SignIn</Link>
                      </Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
