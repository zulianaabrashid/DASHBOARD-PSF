import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dashboard PSF | Pusat Sumber dan Fotografi',
  description: 'Dashboard statistik interaktif Pusat Sumber dan Fotografi',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ms"><body>{children}</body></html>;
}
