"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

import { AppSidebar } from "../app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppBreadcrumb } from "../AppBreadcrumb";
import { AuthContextProvider } from "@/context/auth-context";

// Định nghĩa lại đúng kiểu dữ liệu token hiện tại
interface AdminJwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Props component nhận vào: token + children
export default function AdminPageLayout({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const [user, setUser] = useState<AdminJwtPayload | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    // Nếu token không tồn tại hoặc rỗng
    if (!token) {
      toast.error("You need to log in as an admin to access the admin page");
      router.replace("/login");
      return;
    }

    try {
      const decoded = jwtDecode<AdminJwtPayload>(token);

      // Kiểm tra quyền (role)
      const isAdmin = decoded.role === "admin";
      if (!isAdmin) {
        toast.error("You do not have permission to access the admin page");
        router.replace("/");
        return;
      }

      // Lưu user vào state
      setUser(decoded);
    } catch {
      toast.error("Invalid token");
      router.replace("/login");
    }
  }, [token, router]);

  // Nếu chưa load xong user → tạm thời return null để tránh render lỗi
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
