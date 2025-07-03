"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IconTrendingUp } from "@tabler/icons-react";
import { TrendingUpIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  href?: string;
}

const StatCard = ({ title, value, href }: StatCardProps) => {
  const content = (
    <Card className="relative hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendingUpIcon className="size-3" />
            +12.5%
          </Badge>
        </div>
      </CardHeader>


      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month
          <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

export default StatCard;
