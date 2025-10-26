import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CreativeHub KSA | المركز الإبداعي السعودي',
  description: 'منصة سوق حر عربية للخدمات الإبداعية في المملكة العربية السعودية',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
