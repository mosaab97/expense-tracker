import { Routes, Route } from "react-router";
import { ExpenseProvider } from "../context/expenseContext/ExpenseContext";
import PrivateRoute from "./PrivateRoute";
import Expenses from "../features/expenses/Expenses";
import ExpenseDetail from "../features/expenses/ExpenseDetail";

const ExpensesRoutes = () => {
  return (
    <ExpenseProvider>
      <Routes>
        <Route
          path="/expenses"
          element={
            <PrivateRoute>
              <Expenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/expenses/:id"
          element={
            <PrivateRoute>
              <ExpenseDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </ExpenseProvider>
  );
};

export default ExpensesRoutes;
