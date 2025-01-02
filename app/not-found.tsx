"use client";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image
        priority={true}
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
      />
      <div className="shadow-md p-6 rounded-lg w-1/3 text-center">
        <h1 className="mb-4 font-bold text-3xl">Not Found</h1>
        <p className="text-destructive">Could not find requested resource</p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => (window.location.href = "/")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
