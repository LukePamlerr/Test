import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Full Stack App",
  description: "Built with Next.js & deployed on Vercel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">🚀 My App</h1>
          <nav className="space-x-4 text-sm font-medium">
            <a href="/" className="hover:text-indigo-600">Home</a>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        <footer className="text-center text-sm text-gray-400 py-6">
          © 2026 My App — Powered by Next.js & Vercel
        </footer>
      </body>
    </html>
  );
}
