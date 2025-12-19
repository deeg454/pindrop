import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Menu } from "@/components/menu";
import { RegionProvider } from "@/components/region";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pindrop",
  description: "Drop a pin on the map to share your thoughts with others",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <RegionProvider>
            <div className="min-h-screen flex flex-col">
              <header className="flex items-center justify-between p-4 h-16 bg-[#00F0B5]">
                <Menu />
                <h1 className="text-5xl font-bold">PINDROP</h1>

                <div className="flex items-center gap-4">
                  <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                      <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </header>

              {/* Page content (map) fills remaining height */}
              <main className="flex-1">{children}</main>
            </div>
          </RegionProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
