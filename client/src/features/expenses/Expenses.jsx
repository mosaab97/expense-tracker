import { useState } from "react";
import { useExpenses } from "../../context/expenseContext/ExpenseContext";
import ExpenseCard from "./components/ExpenseCard";
import ExpenseForm from "./components/ExpenseForm";

const Expenses = () => {
  const { expenses, loading, createExpense, editExpense, removeExpense } = useExpenses();
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
  }

  const handleSubmit = (data) => {
    selectedExpense ? editExpense(data) : createExpense(data);
    setSelectedExpense(null)
  }

  const handleDelete = (id) => {
    confirm("are you sure you want to delete") && removeExpense(id)
  }

  return (
    <div className="pt-6 pl-20 pr-20">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      {/* Form to add new expense */}
      <ExpenseForm onSubmit={handleSubmit} initialData={selectedExpense}/>

      {/* Expenses list */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3 mt-4">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Expenses;
