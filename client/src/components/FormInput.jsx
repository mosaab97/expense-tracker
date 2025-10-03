const FormInput = ({
  label,
  name,
  type = "text",
  register,
  rules,
  errors,
  placeholder
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, rules)}
      className={`w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 ${errors[name]
          ? "border-red-500 focus:ring-red-400"
          : "border-gray-300 focus:ring-blue-400"
        }`}
      step={type === 'number' ? '0.1' : ""}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

export default FormInput;
