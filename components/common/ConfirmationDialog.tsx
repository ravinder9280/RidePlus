"use client";

import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button, type ButtonProps } from "@/components/ui/button";

type ConfirmationAlertDialogWrapperProps = {
  btnLabel: string;
  children: ReactNode;
  triggerVariant?: ButtonProps["variant"];
  triggerClassName?: string;
  Description?: string;
  title?: string;
};

export function ConfirmationAlertDialogWrapper({
  btnLabel,
  children,
  triggerVariant = "outline",
  triggerClassName,
  Description,
  title = "Confirm Changes",
}: ConfirmationAlertDialogWrapperProps) {
  return (
    <div className="flex gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size={"sm"}
            className={triggerClassName}
            variant={triggerVariant}
          >
            {btnLabel}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to permanently
              {Description}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {children}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
