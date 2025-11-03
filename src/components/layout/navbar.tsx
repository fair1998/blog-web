import { PAGE_URLS } from "@/constants/page-urls";
import { Rss } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between h-16">
      <Link href={PAGE_URLS.HOME} className="flex items-center gap-2">
        <Rss className="size-6" />
        <span className="font-bold text-2xl">Blog</span>
      </Link>

      <div className="flex items-center space-x-4">
        <Link href={PAGE_URLS.SIGN_IN}>
          <Button variant="outline">Sign In</Button>
        </Link>
      </div>
    </nav>
  );
}
