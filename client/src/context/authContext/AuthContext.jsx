import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService, signup as signupService } from "../../services/auth";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Try to fetch user on mount (persist login if token stored)
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(false);
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) { setUser(user) }
        // else {
        //   const { data } = await getProfile();
        //   setUser(data);
        // }
      } catch (err) {
        console.log(err)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    console.log(credentials)
    const { data } = await loginService(credentials);
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data))
    navigate("/expenses");
  };

  const signup = async (info) => {
    const { data } = await signupService(info);
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data))
    navigate("/expenses");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // or however you’re handling tokens
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
