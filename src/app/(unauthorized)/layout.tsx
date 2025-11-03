export default function UnauthorizedLayout({ children }: NextAppLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
