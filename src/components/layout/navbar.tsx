import { deleteToken } from "@/actions/auth/delete-token";
import { getToken } from "@/actions/auth/get-token";
import { PAGE_URLS } from "@/constants/page-urls";
import { LogOut, Rss } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function Navbar() {
  const username = await getToken();

  return (
    <nav className="flex items-center justify-between h-16">
      <Link href={PAGE_URLS.HOME} className="flex items-center gap-2">
        <Rss className="size-6" />
        <span className="font-bold text-2xl">Blog</span>
      </Link>

      <div className="flex items-center space-x-4">
        {username ? (
          <>
            <span className="text-sm font-medium">Welcome, {username}</span>
            <form action={deleteToken}>
              <Button size="icon" variant="destructive" type="submit">
                <LogOut className="size-4" />
              </Button>
            </form>
          </>
        ) : (
          <Link href={PAGE_URLS.SIGN_IN}>
            <Button variant="outline">Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
