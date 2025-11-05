"use server";

import { AUTH_COOKIE_NAME } from "@/constants/auth.cookie";
import { cookies } from "next/headers";

export async function getCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
}
