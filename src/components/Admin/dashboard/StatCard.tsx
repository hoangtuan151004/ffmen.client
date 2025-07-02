"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
  CardActions,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IconTrendingUp } from "@tabler/icons-react";

interface StatCardProps {
  title: string;
  value: number | string;
  href?: string;
}

const StatCard = ({ title, value, href }: StatCardProps) => {
  const content = (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-bold text-gray-900">
          {value}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <CardActions>
          <Badge variant="outline" className="flex items-center gap-1 text-sm">
            <IconTrendingUp className="w-4 h-4" />
            +12.5%
          </Badge>
        </CardActions>
      </CardContent>

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
