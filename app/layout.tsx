import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Tellus Wallet Test",
  description: "Tellus Wallet standalone test shell",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
