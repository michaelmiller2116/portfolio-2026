import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '../components/SmoothScroll';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MikeMiller',
  description: 'Mike C Miller portfolio',
  icons: {
    icon: '/favicon.ico',
    apple: '/flowers.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SmoothScroll>
          <div className="app-shell">
            <header className="nav-header">
              <TopNav />
            </header>
            <main className="content">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
