import '@/app/ui/styles/global.scss';
import { inter } from '@/app/ui/fonts/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body  className={`${inter.className} antialiased`}>{children}</body>

    </html>
  );
}
