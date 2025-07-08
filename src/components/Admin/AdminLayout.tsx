"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/types/auth.types";
import { AuthProvider } from "@/context/auth-context";
import toast from "react-hot-toast";
import { AppSidebar } from "../app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppBreadcrumb } from "../AppBreadcrumb";
interface AdminLayoutProps {
  children: React.ReactNode;
  token: string | null;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children, token }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const router = useRouter();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (!token) {
      toast.error("Bạn cần đăng nhập tài khoản admin để truy cập trang admin");
      router.replace("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("✅ Decoded token:", decoded);

      const isAdmin =
        decoded.role === "admin" || decoded.roles?.includes("admin");

      if (!isAdmin) {
        toast.error("Bạn không có quyền truy cập vào trang admin");
        router.replace("/");
        return;
      }
      setUser(decoded);
    } catch (err) {
      toast.error("Token không hợp lệ");
      router.replace("/login");
    }
  }, [token]);

  if (!user) return null;

  return (
    <AuthProvider token={token} user={user}>
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
    </AuthProvider>
  );
};

export default AdminLayout;
