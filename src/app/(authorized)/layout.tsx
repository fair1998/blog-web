import Navbar from "@/components/layout/navbar";
import { AUTH_COOKIE_NAME } from "@/constants/auth.cookie";
import { PAGE_URLS } from "@/constants/page-urls";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthorizedLayout({
  children,
}: NextAppLayoutProps) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return redirect(PAGE_URLS.SIGN_IN);
  }

  return (
    <div className="container mx-auto px-4 min-h-screen relative flex flex-col gap-4">
      <Navbar />
      <div className="flex-1 flex flex-col pb-5 xl:pb-10">{children}</div>
    </div>
  );
}
