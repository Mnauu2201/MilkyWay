import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Kiểm tra session từ localStorage hoặc sessionStorage
  const checkAuth = () => {
    const localSession = localStorage.getItem("milkyway_admin_session");
    const sessionSession = sessionStorage.getItem("milkyway_admin_session");

    if (localSession) {
      const session = JSON.parse(localSession);
      return session.isAuthenticated;
    }

    if (sessionSession) {
      const session = JSON.parse(sessionSession);
      return session.isAuthenticated;
    }

    return false;
  };

  const isAuthenticated = checkAuth();

  // Nếu chưa đăng nhập, chuyển đến trang login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Nếu đã đăng nhập, hiển thị trang admin
  return children;
};

export default ProtectedRoute;
