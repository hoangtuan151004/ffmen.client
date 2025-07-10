"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/types/auth.types";
import toast from "react-hot-toast";
import { AppSidebar } from "../app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppBreadcrumb } from "../AppBreadcrumb";
import { AuthContextProvider } from "../../context/auth-context";
import { cookies } from "next/headers";
interface AdminLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const router = useRouter();
  const isFirstRun = useRef(true);
  const token = cookies().get("token")?.value
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (!token) {
      toast.error("You need to log in as an admin to access the admin page");
      router.replace("/login");
      return;
    }
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("✅ Decoded token:", decoded);

      const isAdmin = decoded.roles?.includes("admin");

      if (!isAdmin) {
        toast.error("You do not have permission to access the admin page");
        router.replace("/");
        return;
      }
      setUser(decoded);
      toast.error("Token không hợp lệ");
    } catch (err) {
      toast.error("Invalid token");
      router.replace("/login");
    }
  },[])
  if (!user) return null;


  return (
    <AuthContextProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <AppBreadcrumb />
            </div>
          </header>
          <main className="w-full flex flex-1 flex-col">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthContextProvider>
  );
}
export default AdminLayout;
