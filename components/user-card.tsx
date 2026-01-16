import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserCard = ({
  userId,
  userImage,
  userName,
  userEmail,
  className,
}: {
  userId: string;
  userImage: string;
  userName: string;
  userEmail: string;
  className?: string;
}) => {
  return (
    <Link
      href={`/user/${userId}`}
      className={`  flex items-center gap-2 ${className}`}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={userImage} />
        <AvatarFallback>{userName?.[0] ?? "U"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h3 className="text-foreground text-sm line-clamp-1">{userName}</h3>
        <span className="text-sm text-muted-foreground hover:text-muted-foreground/50 line-clamp-1">
          {userEmail}
        </span>
      </div>
    </Link>
  );
};

export default UserCard;
