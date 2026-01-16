import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { SheetClose } from "../ui/sheet";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";

const UserMobileActions = () => {
  const { user, isSignedIn } = useUser();
  const { userId } = useCurrentUserId();
  const imageUrl = user?.imageUrl;
  const name = user?.fullName || user?.firstName || "User";
  const initials = (user?.firstName?.[0] || "") + (user?.lastName?.[0] || "");

  return (
    <>
      {isSignedIn ? (
        <div className="flex items-center gap-3">
          <SheetClose asChild>
            <Link href={userId ? `/user/${userId}` : "/profile"}>
              <Avatar className="size-10">
                {imageUrl ? (
                  <AvatarImage src={imageUrl} alt={name} />
                ) : (
                  <AvatarFallback>{initials || "U"}</AvatarFallback>
                )}
              </Avatar>
            </Link>
          </SheetClose>
          <SheetClose>
            <SignOutButton redirectUrl="/sign-in">
              <Button variant={"ghost"} className="text-red-500">
                <span>Logout</span>
                <LogOut className="size-6" size={24} />
              </Button>
            </SignOutButton>
          </SheetClose>
        </div>
      ) : (
        <SheetClose asChild>
          <Button variant={"outline"} asChild>
            <Link href={"/sign-in"}>SignIn</Link>
          </Button>
        </SheetClose>
      )}
    </>
  );
};

export default UserMobileActions;
