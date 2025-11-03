import Navbar from "@/components/layout/navbar";

export default function AuthorizedLayout({ children }: NextAppLayoutProps) {
  return (
    <div className="container mx-auto px-4 min-h-screen relative flex flex-col gap-4">
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
