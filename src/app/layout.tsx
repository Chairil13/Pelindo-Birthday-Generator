import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pelindo Birthday Studio",
  description: "Buat ucapan ulang tahun bernuansa maritim Pelindo dalam hitungan menit.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{var t=localStorage.getItem('birthday-studio-theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}`}}/></head><body>{children}</body></html>;
}
