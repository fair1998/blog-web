import { AUTH_COOKIE_NAME } from "@/constants/auth.cookie";
import { PAGE_URLS } from "@/constants/page-urls";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UnauthorizedLayout({
  children,
}: NextAppLayoutProps) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get(AUTH_COOKIE_NAME)?.value;

  if (token) {
    return redirect(PAGE_URLS.HOME);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
