import { useExpenses } from "../../context/expenseContext/ExpenseContext";
import ExpenseCard from "./components/ExpenseCard";
import ExpenseForm from "./components/ExpenseForm";

const Expenses = () => {
  const { expenses, loading, createExpense, editExpense, removeExpense } = useExpenses();

  return (
    <div className="pt-6 pl-20 pr-20">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      {/* Form to add new expense */}
      <ExpenseForm onSubmit={createExpense} />

      {/* Expenses list */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3 mt-4">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={editExpense}
              onDelete={removeExpense}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Expenses;
