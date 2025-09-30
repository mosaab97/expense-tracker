import { createContext, useContext, useState, useEffect } from "react";
import { getExpenses, addExpense, updateExpense, deleteExpense } from "../../services/expense";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const { data } = await getExpenses();
      console.log(data)
      setExpenses(data.expenses);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expense) => {
    const { data } = await addExpense(expense);
    setExpenses((prev) => [data, ...prev]);
  };

  const editExpense = async (id, updated) => {
    const { data } = await updateExpense(id, updated);
    setExpenses((prev) => prev.map((e) => (e.id === id ? data : e)));
  };

  const removeExpense = async (id) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider value={{ expenses, loading, fetchExpenses, createExpense, editExpense, removeExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
