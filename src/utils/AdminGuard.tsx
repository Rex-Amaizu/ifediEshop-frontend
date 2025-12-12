"use client";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, ReactNode, useState } from "react";
import { useMounted } from "@/hooks/useMounted";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const mounted = useMounted();
  const { user } = useAppSelector((state) => state.auth);
  // const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Only run checks after component has mounted
    if (!mounted) return;

    if (!user) {
      router.push("/auth?mode=login");
      return;
    }
    if (user.role !== "admin") {
      router.push("/not-authorized");
    }
  }, [mounted, user, router]);

  // IMPORTANT:
  // Show a consistent placeholder until mounted + user is validated
  if (!mounted) {
    return <p></p>; // NOT null
  }

  if (!user || user.role !== "admin") return <p></p>;

  return <>{children}</>;
}
