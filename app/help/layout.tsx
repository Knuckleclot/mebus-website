import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";

export default function HelpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="paddingX w-full py-4 bg-gradient-to-tr from-primary-bg/95 via-primary-bg to-primary-bg/95">
        <Navbar className="max-w-6xl mx-auto" />
      </div>
      {children}
      <SecondaryFooter className="mt-12" />
    </div>
  );
}
