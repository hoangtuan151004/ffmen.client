import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SiteHeader />
      <main>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
