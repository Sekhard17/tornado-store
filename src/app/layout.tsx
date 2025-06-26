import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Tornado Store - Ropa y Zapatillas",
  description: "La mejor tienda de ropa y zapatillas en Chile. Encuentra las últimas tendencias en moda urbana y streetwear.",
  keywords: "ropa, zapatillas, moda, streetwear, Chile, tienda online",
  authors: [{ name: "Tornado Store" }],
  openGraph: {
    title: "Tornado Store - Ropa y Zapatillas",
    description: "La mejor tienda de ropa y zapatillas en Chile",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
