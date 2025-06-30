"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useAuth } from "@/context/auth-context"; // 👈 context chứa token

type RevenueItem = {
  month: string;
  revenue: number;
};

const RevenueChart = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [revenueData, setRevenueData] = useState<RevenueItem[]>([]);
  const { token, user } = useAuth(); // 👈 lấy token và user từ context
  console.log(user?.role);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        if (!token) return;

        const response = await axios.get(`${API_URL}/api/orders/revenue`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // nếu dùng cookie + token chung
        });

        const formattedData = response.data.map((item: RevenueItem) => {
          const monthNum = parseInt(item.month.split("-")[1], 10);
          return {
            month: `Th${monthNum}`,
            revenue: item.revenue,
          };
        });

        setRevenueData(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu doanh thu:", error);
        setRevenueData([]);
      }
    };

    fetchRevenue();
  }, [token]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle>Biểu đồ doanh thu (6 tháng gần nhất)</CardTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-sm font-normal w-[200px] justify-start text-left"
              >
                {selectedDate ? (
                  format(selectedDate, "PPP", { locale: vi })
                ) : (
                  <span>Chọn ngày</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                locale={vi}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
