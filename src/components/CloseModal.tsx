"use client";

import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

const CloseModal = () => {
  const router = useRouter();

  return (
    <Button
      aria-label="close modal"
      variant="subtle"
      className="h-6 w-6 p-0 rounded-md"
      onClick={() => router.back()}
    >
      <Icons.close className="w-4 h-4" />
    </Button>
  );
};

export default CloseModal;
