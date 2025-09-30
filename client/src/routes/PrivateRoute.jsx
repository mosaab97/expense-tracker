import { Navigate } from "react-router";
import { useAuth } from "../context/authContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
