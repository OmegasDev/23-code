import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Code Snippets',
  description: 'A collection of useful code snippets',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50 text-gray-800">
        {children}
      </body>
    </html>
  );
}
