"use client";

import * as Avatar from "@radix-ui/react-avatar";

export function UserAvatar() {
  return (
    <Avatar.Root className="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden align-middle">
      <Avatar.Image
        className="h-full w-full rounded-full object-cover"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
      />
      <Avatar.Fallback
        className="flex h-full w-full items-center justify-center bg-white text-sm font-medium leading-none"
        delayMs={600}
      >
        CT
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
