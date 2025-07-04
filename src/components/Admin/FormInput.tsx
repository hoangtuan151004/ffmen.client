// components/FormInput.tsx
import { Field, ErrorMessage } from "formik";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = "text",
  ...props
}) => (
  <div>
    <label className="block text-black mb-1">{label}</label>
    <Field
      name={name}
      type={type}
      {...props}
      className="form-control w-full px-4 py-2 border border-gray-300 rounded-md text-black"
    />
    <ErrorMessage name={name} component="small" className="text-red-500" />
  </div>
);

export default FormInput;
