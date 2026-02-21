"use client";

import { useSession } from "@/lib/auth-client";
import { AppSession } from "@/types";

export default function RoleBasedContent({
  admin,
  seller,
}: {
  admin: React.ReactNode;
  seller: React.ReactNode;
}) {
  const { data } = useSession();
  const session = data as AppSession | null;
  const role = session?.user.role?.toLowerCase();

  if (role === "admin") return <>{admin}</>;
  if (role === "seller") return <>{seller}</>;
}
