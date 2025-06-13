import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";
import * as Yup from "yup";

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
    price2: "",
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
    showPopup && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-[1000px] relative max-h-[90vh] overflow-y-auto pt-[50px]">
          <button
            onClick={handleClosePopup}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>

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
                <div>
                  <FormInput
                    name="name"
                    label="Tên sản phẩm"
                    placeholder="Nhập tên sản phẩm"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <FormInput name="price" label="Giá sản phẩm" type="number" />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <FormInput name="price2" label="Giá khuyến mãi" type="number" />

                <div>
                  <FormInput name="quantity" label="Số lượng" type="number" />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-black mb-1">Danh mục</label>
                  <Field
                    as="select"
                    name="categoryId"
                    className="form-control text-black w-full px-4 py-2 border rounded-md"
                    onChange={(e) => {
                      const cat = categories.find(
                        (c) => c._id === e.target.value
                      );
                      setFieldValue("categoryId", cat?._id || "");
                      setFieldValue("categoryName", cat?.name || "");
                    }}
                  >
                    <option className="text-black" value="">
                      Chọn danh mục
                    </option>
                    {categories.map((cat) => (
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

                <FormTextarea name="shortDescription" label="Mô tả ngắn" />
                <FormTextarea name="longDescription" label="Mô tả dài" />

                <FieldArray name="imgs">
                  {({ push, remove }) => (
                    <div>
                      <label className="block text-black font-semibold mb-1">
                        Ảnh sản phẩm
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = Array.from(e.currentTarget.files || []);
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
                          className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded"
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
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">
                        Biến thể sản phẩm
                      </h3>
                      {values.variants.map((_, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-100 rounded-md space-y-2 mb-4"
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
                            <label className="block text-black mb-1">
                              Ảnh biến thể
                            </label>
                            <Field
                              name={`variants[${index}].img`}
                              placeholder="Dán link ảnh (tuỳ chọn)"
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.currentTarget.files?.[0];
                                if (file) {
                                  const previewURL = URL.createObjectURL(file);
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
                            className="text-red-600 hover:underline"
                            onClick={() => remove(index)}
                          >
                            Xoá biến thể
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="bg-blue-400 text-white px-3 py-1 rounded-md hover:bg-blue-500 "
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-400 text-white rounded-[10px] px-6 py-2 hover:bg-blue-500 "
                >
                  {isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
};

export default ProductPopup;
