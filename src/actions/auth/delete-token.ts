"use server";

import { AUTH_COOKIE_NAME } from "@/constants/auth.cookie";
import { PAGE_URLS } from "@/constants/page-urls";
import { REDIRECT_ERROR_CODE } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteToken(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);

    redirect(PAGE_URLS.SIGN_IN);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === REDIRECT_ERROR_CODE) {
      throw error;
    }
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[DeleteTokenAction] Error:", errorMessage);
    throw new Error("Internal Server Error");
  }
}
