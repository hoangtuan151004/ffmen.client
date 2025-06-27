// components/CategoryTable.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Category } from "../../../types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface CategoryTableProps {
  categories: Category[];
  handleEdit: (cate: Category) => void;
  handleDelete: (id: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div className="table-responsive overflow-auto rounded-lg">
      <Table className="w-full table-fixed border-collapse border border-gray-200 text-sm">
        <TableHeader className="bg-gray-100 text-gray-700 font-semibold">
          <TableRow>
            <TableHead className="w-[50px] text-center">STT</TableHead>
            <TableHead className="min-w-[160px]">Tên danh mục</TableHead>
            <TableHead className="w-[70px] text-center">Icon</TableHead>
            <TableHead className="min-w-[140px]">Danh mục cha</TableHead>
            <TableHead className="min-w-[240px]">Mô tả</TableHead>
            <TableHead className="w-[150px] text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories
            .filter(
              (cate) => !cate.parentCategory || cate.parentCategory === cate._id
            )
            .map((parent: any, index: number) => {
              const children = categories.filter((child: any) =>
                child.parentCategory && typeof child.parentCategory === "object"
                  ? child.parentCategory._id === parent._id
                  : child.parentCategory === parent._id
              );

              return (
                <React.Fragment key={parent._id}>
                  {/* Parent Row */}
                  <TableRow className="bg-gray-50 font-medium">
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{parent.name}</TableCell>
                    <TableCell className="text-center">
                      {parent.icon ? (
                        <img
                          src={parent.icon}
                          alt="icon"
                          className="w-6 h-6 object-contain mx-auto"
                        />
                      ) : (
                        "—"
                      )}
                    </TableCell>

                    <TableCell className="text-gray-400 italic">—</TableCell>
                    <TableCell className="max-w-[240px] truncate">
                      {parent.description || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(parent)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Pencil size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(parent._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-500 hover:text-green-700"
                        >
                          <Eye size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Children Rows */}
                  {children.map((child) => (
                    <TableRow key={child._id}>
                      <TableCell></TableCell>
                      <TableCell className="pl-6">┗━━ {child.name}</TableCell>
                      <TableCell className="text-center">
                        {child.icon ? (
                          <img
                            src={child.icon}
                            alt="icon"
                            className="w-6 h-6 object-contain mx-auto"
                          />
                        ) : (
                          "—"
                        )}
                      </TableCell>

                      <TableCell className="text-gray-600">
                        {parent.name}
                      </TableCell>
                      <TableCell className="max-w-[240px] truncate">
                        {child.description?.length > 100
                          ? child.description.substring(0, 100) + "..."
                          : child.description || "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(child)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Pencil size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(child._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-500 hover:text-green-700"
                          >
                            <Eye size={18} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              );
            })}

          {/* Empty state */}
          {categories.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-sm text-gray-500 py-4"
              >
                Không có danh mục nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
