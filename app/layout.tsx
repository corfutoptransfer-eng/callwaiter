import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata={title:'TableCall','description':'QR waiter call system for restaurants, bars and clubs'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
