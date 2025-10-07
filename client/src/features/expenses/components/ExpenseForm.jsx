import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput";

const ExpenseForm = ({ onSubmit, initialData = {} }) => {
  const [submitLabel, setSubmitLabel] = useState("Add Expense");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setSubmitLabel("Update Expense");

      // Convert date to "YYYY-MM-DD" for <input type="date" />
      const formattedData = {
        ...initialData,
        spentAt: initialData.spentAt
          ? new Date(initialData.spentAt).toISOString().split("T")[0]
          : "",
        categoryId: String(initialData.categoryId || ""),
      };

      reset(formattedData);
    } else {
      setSubmitLabel("Add Expense");
      reset({
        description: "",
        amount: "",
        spentAt: "",
        categoryId: "",
      });
    }
  }, [initialData, reset]);

  const submitHandler = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white shadow-lg rounded-xl p-6 space-y-6"
    >
      <h2 className="text-xl font-bold text-gray-700 text-center">
        {submitLabel}
      </h2>

      {/* Description */}
      <FormInput
        label="Description"
        name="description"
        type="text"
        placeholder="e.g. Grocery shopping"
        register={register}
        rules={{ required: "Description is required" }}
        errors={errors}
      />

      {/* Amount */}
      <FormInput
        label="Amount"
        name="amount"
        type="number"
        placeholder="0.00"
        register={register}
        rules={{
          required: "Amount is required",
          min: { value: 0.01, message: "Amount must be greater than zero" },
        }}
        errors={errors}
      />

      {/* Spent At */}
      <FormInput
        label="Spent At"
        name="spentAt"
        type="date"
        register={register}
        rules={{ required: "Date is required" }}
        errors={errors}
      />

      {/* Category Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          {...register("categoryId", { required: "Category is required" })}
          rules={{ required: "category is required" }}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-300 ${errors.categoryId && "border-red-500 focus:ring-red-400"}`}
        >
          <option value="">Select category</option>
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
          <option value="3">Category 3</option>
        </select>
        {errors.categoryId && (
          <p className="text-red-600 text-sm mt-1">{errors.categoryId.message}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default ExpenseForm;
