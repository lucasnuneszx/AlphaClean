import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alpha Clean | Estética Automotiva Premium",
  description: "Protocolos de detalhamento automotivo de nível laboratorial. Polimento, vitrificação cerâmica e lavagem técnica. Agende agora pelo WhatsApp.",
  keywords: "detalhamento automotivo, polimento, vitrificação cerâmica, lavagem técnica, car detailing",
  openGraph: {
    title: "Alpha Clean | Estética Automotiva Premium",
    description: "Não lavamos carros. Restauramos a dominância estética da sua máquina.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-[#000c24] text-[#ffffff] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
