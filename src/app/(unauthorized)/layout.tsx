import { getToken } from "@/actions/auth/get-token";
import { PAGE_URLS } from "@/constants/page-urls";
import { redirect } from "next/navigation";

export default async function UnauthorizedLayout({
  children,
}: NextAppLayoutProps) {
  const token = await getToken();

  if (token) {
    return redirect(PAGE_URLS.HOME);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
