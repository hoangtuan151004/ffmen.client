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
      <Table className="w-full table-fixed border-collapse border border-gray-200">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Danh mục cha</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories
            .filter(
              (cate: any) =>
                !cate.parentCategory || cate.parentCategory === cate._id
            ) // tránh self-parent
            .map((parent: any, index: number) => {
              const children = categories.filter((child: any) =>
                child.parentCategory && typeof child.parentCategory === "object"
                  ? child.parentCategory._id === parent._id
                  : child.parentCategory === parent._id
              );

              return (
                <React.Fragment key={parent._id}>
                  <TableRow className="bg-gray-50 font-semibold">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{parent.name}</TableCell>
                    <TableCell>
                      {parent.icon ? (
                        <img src={parent.icon} alt="icon" className="w-6 h-6" />
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>{parent.description}</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          className="text-blue-500"
                          onClick={() => handleEdit(parent)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-red-500"
                          onClick={() => handleDelete(parent._id)}
                        >
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {children.map((child: any) => (
                    <TableRow key={child._id}>
                      <TableCell></TableCell>
                      <TableCell>┗━━ {child.name}</TableCell>
                      <TableCell>
                        {child.icon ? (
                          <img
                            src={child.icon}
                            alt="icon"
                            className="w-6 h-6"
                          />
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        {child.description?.length > 100
                          ? child.description.substring(0, 100) + "..."
                          : child.description}
                      </TableCell>
                      <TableCell>{parent.name}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            className="text-blue-500"
                            onClick={() => handleEdit(child)}
                          >
                            Sửa
                          </Button>

                          <Button
                            variant="ghost"
                            className="text-red-500"
                            onClick={() => handleDelete(child._id)}
                          >
                            Xóa
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              );
            })}

          {categories.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-sm text-gray-500"
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
