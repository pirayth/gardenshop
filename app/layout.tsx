import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Cheap Gag Shop - We Have Everything!",
  description:
    "Visit the website and see previous reviews on the homepage. WERE LEGIT!!",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
    >
      <body className="font-sans">
        {/* Title with verified gif */}
        <header className="flex items-center gap-2 p-4">
          <h1 className="text-2xl font-bold">
            Cheap Gag Shop - We Have Everything!
          </h1>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzNxM3BsazZrbGlrbGExZjhibGE5Z24xMW03ZnBmZml6dnBua3UxZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/veHIwhDRl780wT2XfC/giphy.gif"
            alt="Verified"
            className="w-6 h-6"
          />
        </header>

        {children}
      </body>
    </html>
  );
}
