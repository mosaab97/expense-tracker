import { useState } from "react";

const ExpenseForm = ({ onSubmit, initialData = {}, submitLabel = "Add Expense" }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    amount: initialData.amount || "",
    date: initialData.date || "",
    category: initialData.category || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation
    if (!form.title || !form.amount || !form.date) return;
    onSubmit(form);
    setForm({ title: "", amount: "", date: "", category: "" }); // reset after submit
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
          placeholder="Expense title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Amount</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
          placeholder="0.00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Category</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
          placeholder="Optional"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg w-full"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default ExpenseForm;
