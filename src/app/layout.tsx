import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IRIS AI | 3D Voice Beauty Mirror",
  description: "AI beauty mirror and coaching platform with 3D face tracking, voice guidance, and product try-on.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
