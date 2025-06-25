// components/FormTextarea.tsx
import { Field, ErrorMessage } from "formik";

const FormTextarea = ({ name, label, ...props }) => (
  <div className="mb-4">
    <label className="block text-black mb-1">{label}</label>
    <Field
      as="textarea"
      name={name}
      {...props}
      className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black"
    />
    <ErrorMessage name={name} component="small" className="text-red-500" />
  </div>
);

export default FormTextarea;
