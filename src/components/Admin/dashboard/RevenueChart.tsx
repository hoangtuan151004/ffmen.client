"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { DateRange } from "react-day-picker";
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import { getCookies } from "@/lib/getToken";

type RevenueItem = { month: string; revenue: number };

export default function RevenueChart() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [filterType, setFilterType] = useState<"months" | "range">("months");
  const [months, setMonths] = useState<number>(6);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const [revenueData, setRevenueData] = useState<RevenueItem[]>([]);
  const { user } = useAuth(); // 👈 lấy token và user từ context
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params: any = {};

        if (filterType === "months") {
          params.months = months;
        } else if (dateRange?.from && dateRange?.to) {
          params.from = dateRange.from.toISOString();
          params.to = dateRange.to.toISOString();
        }
        const token = await getCookies()
        const res = await axios.get(`${API_URL}/api/orders/revenue`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
          withCredentials: true,
        });

        const formatted = res.data.map((item: any) => {
          const monthNum = parseInt(item.month.split("-")[1], 10);
          return {
            month: `Th${monthNum}`,
            revenue: item.revenue,
          };
        });

        setRevenueData(formatted);
      } catch (err) {
        console.error("Lỗi fetch revenue:", err);
        setRevenueData([]);
      }
    };

    fetchData();
  }, [filterType, months, dateRange]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Biểu đồ doanh thu
          </CardTitle>
          <div className="flex flex-wrap gap-2 items-center">
            <Select
              value={filterType}
              onValueChange={(val) => setFilterType(val as any)}
            >
              <SelectTrigger className="w-[160px] text-sm border-gray-300 shadow-sm">
                {filterType === "months"
                  ? "Gần theo tháng"
                  : "Theo khoảng ngày"}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="months">Gần theo tháng</SelectItem>
                <SelectItem value="range">Theo khoảng ngày</SelectItem>
              </SelectContent>
            </Select>
            {filterType === "months" && (
              <Select
                value={months.toString()}
                onValueChange={(val) => setMonths(Number(val))}
              >
                <SelectTrigger className="w-[120px] text-sm border-gray-300 shadow-sm">
                  {months} tháng
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 tháng</SelectItem>
                  <SelectItem value="6">6 tháng</SelectItem>
                  <SelectItem value="12">12 tháng</SelectItem>
                </SelectContent>
              </Select>
            )}
            {filterType === "range" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[220px] text-sm border-gray-300 shadow-sm justify-start"
                  >
                    {dateRange?.from && dateRange?.to
                      ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
                          dateRange.to,
                          "dd/MM/yyyy"
                        )}`
                      : "Chọn khoảng ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    locale={vi}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
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
}
