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

type RevenueItem = {
  month: string;
  revenue: number;
};

const RevenueChart = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [revenueData, setRevenueData] = useState<RevenueItem[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    // Gọi API lấy doanh thu
    const fetchRevenue = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/revenue`);
        if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu doanh thu");
        const data: RevenueItem[] = await res.json();

        // Chuyển month: "2025-06" thành "Th6" hoặc format khác nếu muốn
        const formattedData = data.map((item) => {
          // lấy tháng cuối
          const monthNum = parseInt(item.month.split("-")[1], 10);
          return {
            month: `Th${monthNum}`,
            revenue: item.revenue,
          };
        });

        setRevenueData(formattedData);
      } catch (error) {
        console.error(error);
        setRevenueData([]);
      }
    };

    fetchRevenue();
  }, []);

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
