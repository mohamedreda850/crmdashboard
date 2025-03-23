import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth); // ✅ لا تستخدم async/await هنا

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
