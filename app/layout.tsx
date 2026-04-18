import "./globals.css"; // <-- THIS IS THE MAGIC LINE ✨
import Background from "@/components/Background";
import Navbar from "@/components/Navbar"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen antialiased">
        <Background />
        <Navbar />
        {children}
      </body>
    </html>
  );
}