import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";
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
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <Toast />
      </body>
    </html>
  );
}
