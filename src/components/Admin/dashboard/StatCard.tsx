"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: number | string;
  href?: string;
}

const StatCard = ({ title, value, href }: StatCardProps) => {
  const content = (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle className="text-lg text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-blue-600">{value}</p>
      </CardContent>
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

export default StatCard;
