"use client";

import useAuthStore from "@/store/authStore.js";
import { useRouter } from "next/navigation.js";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();
  console.log(user);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, router]);

  if (!user) return <p>Loading...</p>;

  return <h1>Test</h1>;
}
