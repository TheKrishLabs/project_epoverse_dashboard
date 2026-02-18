import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar className="hidden md:block w-64 shrink-0" />
                <main className="flex-1 overflow-y-auto container mx-auto px-4 py-6">
                    {children}
                </main>
            </div>
        </div>
  );
}
