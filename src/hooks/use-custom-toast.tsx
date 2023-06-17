"use client";

import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/Button";

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required",
      description: "You must be logged in to do that.",
      variant: "destructive",
      action: (
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/sign-up"
          onClick={() => dismiss()}
        >
          Login
        </Link>
      ),
    });
  };

  return { loginToast };
};
