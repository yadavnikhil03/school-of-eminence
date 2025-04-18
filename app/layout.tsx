import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School of Eminence',
  description: 'Excellence in Education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
