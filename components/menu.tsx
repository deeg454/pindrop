"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ROUTES: Record<string, string> = {
  "North America": "/map/NA",
  "South America": "/map/SA",
  Europe: "/map/EU",
  Asia: "/map/AS",
  Africa: "/map/AF",
  Australia: "/map/OC",
  Antarctica: "/map/AN",
};

export function Menu() {
  const router = useRouter();

  const items = [
    "North America",
    "South America",
    "Europe",
    "Asia",
    "Africa",
    "Australia",
    "Antarctica",
    "Settings",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#C5D6D8]">
          Regions
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-4xl p-10">
        <DialogHeader>
          <DialogTitle>Regions</DialogTitle>
          <DialogDescription>Pick a region to view.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((label) => {
            const href = ROUTES[label];

            return (
              <Button
                key={label}
                variant="outline"
                className="bg-[#C5D6D8] w-full h-20 text-lg font-bold whitespace-normal text-center"
                onClick={() => {
                  if (href) router.push(href);
                  // else handle Settings later
                }}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
