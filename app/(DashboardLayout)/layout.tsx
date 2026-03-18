import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import RoleBasedContent from "./RoleBaseContent";

export default function DashboardLayout({
  admin,
  seller,
  customer,
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  seller: React.ReactNode;
  customer: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <RoleBasedContent admin={admin} seller={seller} customer={customer} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
