import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión - Tornado Store",
  description: "Inicia sesión en tu cuenta de Tornado Store para acceder a ofertas exclusivas y gestionar tus pedidos.",
  keywords: "login, iniciar sesión, cuenta, Tornado Store, acceso",
  openGraph: {
    title: "Iniciar Sesión - Tornado Store",
    description: "Accede a tu cuenta de Tornado Store",
    type: "website",
    locale: "es_CL",
  },
  robots: {
    index: false, // No indexar páginas de login por seguridad
    follow: false,
  }
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 