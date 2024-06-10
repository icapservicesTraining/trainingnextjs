import '@/app/ui/styles/global.scss';
import { inter } from '@/app/ui/fonts/fonts';
import AuthProvider from "@/app/providers/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
