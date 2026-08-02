import Footer from "@/components/shared/Footer";
import NavbarComponent from "@/components/shared/Navbar";
import Toast from "@/components/shared/Toast";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata = {
  title: "Autixo",
  description: "Modern Car Rental Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavbarComponent />
        <div className="flex-1">{children}</div>
        <Footer />
        <Toast />
      </body>
    </html>
  );
}
