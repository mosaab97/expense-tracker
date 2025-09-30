import { Routes, Route } from "react-router";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import Expenses from "../features/expenses/Expenses";
import ExpenseDetail from "../features/expenses/ExpenseDetail";
import PrivateRoute from "./PrivateRoute";
import { ExpenseProvider } from "../context/expenseContext/ExpenseContext";
import ExpensesRoutes from "./ExpenseRoutes";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/*" element={<ExpensesRoutes />} />
      <Route path="*" element={<h1 className="text-center text-xl">404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRouter;
