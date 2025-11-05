import { getToken } from "@/actions/auth/get-token";
import Navbar from "@/components/layout/navbar";
import { PAGE_URLS } from "@/constants/page-urls";
import { redirect } from "next/navigation";

export default async function AuthorizedLayout({
  children,
}: NextAppLayoutProps) {
  const token = await getToken();

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
