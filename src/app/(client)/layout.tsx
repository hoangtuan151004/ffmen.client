import Header from "../../components/site-header";
import Footer from "../../components/site-footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
