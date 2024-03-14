import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css'
// const inter = Inter({ subsets: ["latin"] });
const Poppins_init= Poppins({
subsets:['latin'],
weight:['100','200','300','400'],
style: ["normal", "italic"]
})

export const metadata: Metadata = {
  title: "Kirushanthan & Abirami",
  description: "Wedding Greetings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Poppins_init.className} main-body` } >{children}</body>
    </html>
  );
}
