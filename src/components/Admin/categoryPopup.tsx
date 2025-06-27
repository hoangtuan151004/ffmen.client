"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";
import { Category } from "@/types";

interface CategoryFormValues {
  _id?: string;
  name: string;
  icon?: string;
  description: string;
  parentCategory: string;
}

interface CategoryPopupProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (
    values: CategoryFormValues,
    helpers: {
      setSubmitting: (v: boolean) => void;
      resetForm: () => void;
    },
    isEdit: boolean
  ) => Promise<void>;
  initialValues?: CategoryFormValues;
  categories: Category[];
  isEdit?: boolean;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên danh mục"),
});

const AddOrEditCategoryPopup: React.FC<CategoryPopupProps> = ({
  show,
  onClose,
  onSubmit,
  categories,
  initialValues = {
    name: "",
    icon: "",
    description: "",
    parentCategory: "",
  },
  isEdit = false,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex justify-end backdrop-blur-sm bg-black/40"
          onClick={onClose}
        >
          <motion.div
            key="popup"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white w-full sm:w-[90%] md:w-[520px] lg:w-[700px] h-full shadow-xl relative flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                {isEdit ? "Chỉnh Sửa Danh Mục" : "Thêm Danh Mục"}
              </h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  await onSubmit(values, { setSubmitting, resetForm }, isEdit);
                  setSubmitting(false);
                  onClose();
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-5">
                    {/* Tên danh mục */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tên danh mục
                      </label>
                      <Field
                        name="name"
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="name"
                        component="small"
                        className="text-red-500"
                      />
                    </div>

                    {/* Icon */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Icon (URL)
                      </label>
                      <Field
                        name="icon"
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Mô tả */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Mô tả
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows={3}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Danh mục cha */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Danh mục cha
                      </label>
                      <Field
                        as="select"
                        name="parentCategory"
                        className="form-control w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Không có (danh mục cha)</option>
                        {categories
                          .filter(
                            (cat) =>
                              !cat.parentCategory &&
                              cat._id !== initialValues._id // 👈 lọc chính nó ra
                          )
                          .map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                      </Field>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-600 transition duration-200 font-medium"
                      >
                        {isSubmitting
                          ? isEdit
                            ? "Đang cập nhật..."
                            : "Đang thêm..."
                          : isEdit
                          ? "Lưu thay đổi"
                          : "Thêm danh mục"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddOrEditCategoryPopup;
