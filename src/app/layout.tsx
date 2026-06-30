import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pelindo Birthday Studio",
  description: "Buat ucapan ulang tahun bernuansa maritim Pelindo dalam hitungan menit.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" data-theme="light" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{var t=localStorage.getItem('birthday-studio-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}`}}/></head><body>{children}</body></html>;
}
