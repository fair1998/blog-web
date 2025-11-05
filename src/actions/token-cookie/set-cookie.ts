"use server";

import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/constants/auth.cookie";
import { PAGE_URLS } from "@/constants/page-urls";
import { REDIRECT_ERROR_CODE } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setCookie(username: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, username, {
      ...AUTH_COOKIE_OPTIONS,
    });

    redirect(PAGE_URLS.HOME);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === REDIRECT_ERROR_CODE) {
      throw error;
    }
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[SignInAction] Error:", errorMessage);
    throw new Error("Internal Server Error");
  }
}
