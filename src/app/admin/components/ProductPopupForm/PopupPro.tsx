import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";
interface ProductPopupProps {
  showPopup: boolean;
  setShowPopup: (value: boolean) => void;
  categories: any[];
  handleSubmitpro: (values: any, formikHelpers: any) => void;
  initialValues?: any;
  isEditMode?: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Tên sản phẩm là bắt buộc"),
  price: Yup.number().required("Giá sản phẩm là bắt buộc"),
  quantity: Yup.number().required("Số lượng là bắt buộc"),
  categoryId: Yup.string().required("Danh mục là bắt buộc"),
});

const ProductPopup: React.FC<ProductPopupProps> = ({
  showPopup,
  setShowPopup,
  categories,
  handleSubmitpro,
  initialValues,
  isEditMode = false,
}) => {
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const defaultValues = {
    name: "",
    price: "",
    discountPrice: "",
    quantity: "",
    shortDescription: "",
    longDescription: "",
    categoryId: "",
    categoryName: "",
    imgs: [],
    newImgUrl: "",
    variants: [],
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex justify-end backdrop-blur-sm bg-black/40"
          onClick={handleClosePopup} // Đóng khi click ngoài
        >
          <motion.div
            key="popup"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
            className="bg-white w-full sm:w-[90%] md:w-[720px] lg:w-[1000px] h-full shadow-xl relative flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Ngăn click popup làm đóng
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <div className="p-6 pt-12 space-y-6 text-sm text-gray-700">
              <Formik
                initialValues={initialValues || defaultValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitpro}
              >
                {({ values, setFieldValue, isSubmitting }) => (
                  <Form
                    id="formThemSanPham"
                    encType="multipart/form-data"
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        name="name"
                        label="Tên sản phẩm"
                        placeholder="Nhập tên sản phẩm"
                      />

                      <FormInput
                        name="price"
                        label="Giá sản phẩm"
                        type="number"
                      />

                      <FormInput
                        name="discountPrice"
                        label="Giá khuyến mãi"
                        type="number"
                      />

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Danh mục
                        </label>
                        <Field
                          as="select"
                          name="categoryId"
                          className="form-control w-full px-4 py-2 border rounded-md"
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            setFieldValue("categoryId", selectedId);
                            const cat = categories.find(
                              (c) => c._id === selectedId
                            );
                            setFieldValue("categoryName", cat?.name || "");
                          }}
                        >
                          <option value="">Chọn danh mục</option>
                          {Array.isArray(categories) &&
                            categories.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.name}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage
                          name="categoryId"
                          component="small"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    <FormTextarea name="shortDescription" label="Mô tả ngắn" />
                    <FormTextarea name="longDescription" label="Mô tả dài" />

                    <FieldArray name="imgs">
                      {({ push, remove }) => (
                        <div>
                          <label className="block font-semibold mb-1">
                            Ảnh sản phẩm
                          </label>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              const files = Array.from(
                                e.currentTarget.files || []
                              );
                              setFieldValue("imgs", [...values.imgs, ...files]);
                            }}
                          />
                          <div className="flex mt-2 gap-2">
                            <Field
                              name="newImgUrl"
                              placeholder="Dán URL ảnh..."
                              className="flex-1 px-2 py-1 border rounded"
                            />
                            <button
                              type="button"
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                              onClick={() => {
                                const url = values.newImgUrl?.trim();
                                if (url) {
                                  push(url);
                                  setFieldValue("newImgUrl", "");
                                }
                              }}
                            >
                              Thêm URL
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-3 mt-4">
                            {values.imgs.map((img, idx) => {
                              const url =
                                typeof img === "string"
                                  ? img
                                  : URL.createObjectURL(img);
                              return (
                                <div key={idx} className="relative">
                                  <img
                                    src={url}
                                    alt=""
                                    className="w-20 h-20 object-cover border rounded"
                                  />
                                  <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                                    onClick={() => remove(idx)}
                                  >
                                    ✕
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </FieldArray>

                    <FieldArray name="variants">
                      {({ push, remove }) => (
                        <div className="space-y-4">
                          <h3 className="text-base font-semibold">
                            Biến thể sản phẩm
                          </h3>
                          {values.variants.map((_, index) => (
                            <div
                              key={index}
                              className="p-4 bg-gray-50 rounded-md border space-y-3"
                            >
                              <div className="grid md:grid-cols-2 gap-4">
                                <FormInput
                                  name={`variants[${index}].attributes.size`}
                                  label="Size"
                                />
                                <FormInput
                                  name={`variants[${index}].attributes.color`}
                                  label="Màu"
                                />
                                <FormInput
                                  name={`variants[${index}].price`}
                                  label="Giá"
                                  type="number"
                                />
                                <FormInput
                                  name={`variants[${index}].quantity`}
                                  label="Số lượng"
                                  type="number"
                                />
                              </div>
                              <FormInput
                                name={`variants[${index}].sku`}
                                label="SKU"
                              />
                              <div>
                                <label className="block mb-1">
                                  Ảnh biến thể
                                </label>
                                <Field
                                  name={`variants[${index}].img`}
                                  placeholder="Dán link ảnh (tuỳ chọn)"
                                  className="w-full px-2 py-1 border rounded"
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.currentTarget.files?.[0];
                                    if (file) {
                                      const previewURL =
                                        URL.createObjectURL(file);
                                      setFieldValue(
                                        `variants[${index}].imgFile`,
                                        file
                                      );
                                      setFieldValue(
                                        `variants[${index}].img`,
                                        previewURL
                                      );
                                    }
                                  }}
                                />
                                {values.variants[index]?.img && (
                                  <img
                                    src={values.variants[index].img}
                                    alt="Preview"
                                    className="w-20 h-20 object-cover border rounded mt-2"
                                  />
                                )}
                              </div>
                              <button
                                type="button"
                                className="text-red-600 hover:underline text-sm"
                                onClick={() => remove(index)}
                              >
                                Xoá biến thể
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() =>
                              push({
                                attributes: { size: "", color: "" },
                                price: "",
                                quantity: "",
                                sku: "",
                                img: "",
                                imgFile: null,
                              })
                            }
                          >
                            Thêm biến thể
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
                      >
                        {isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
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

export default ProductPopup;
