import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Personalização do Kit de Boas-Vindas | Pós Faculdade Phorte',
  description:
    'Área exclusiva para alunos de Pós-Graduação em Educação Física da Faculdade Phorte personalizarem seu livro e camiseta oficial.',
  keywords: [
    'Faculdade Phorte',
    'Pós-Graduação',
    'Educação Física',
    'Kit de Boas-Vindas',
    'Editora Phorte',
  ],
  authors: [{ name: 'Faculdade Phorte' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#070707',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="https://posphorte.com.br/wp-content/uploads/2025/01/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
