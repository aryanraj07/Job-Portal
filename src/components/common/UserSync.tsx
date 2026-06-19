"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function UserSync() {
  const { isLoaded, isSignedIn } = useUser();
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetch("/api/me/sync", {
      method: "POST",
    });
  }, []);

  return null;
}
