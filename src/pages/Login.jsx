import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra đã đăng nhập chưa
  useEffect(() => {
    const localSession = localStorage.getItem("milkyway_admin_session");
    const sessionSession = sessionStorage.getItem("milkyway_admin_session");

    if (localSession || sessionSession) {
      // Đã đăng nhập rồi, chuyển về admin
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  // ⚠️ QUAN TRỌNG: Đổi username và password của bạn ở đây
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "milkyway2024";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra username và password
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Lưu session
      const sessionData = {
        isAuthenticated: true,
        loginTime: Date.now(),
        username: username,
      };

      if (rememberMe) {
        // Lưu vĩnh viễn
        localStorage.setItem(
          "milkyway_admin_session",
          JSON.stringify(sessionData)
        );
      } else {
        // Lưu tạm (xóa khi đóng trình duyệt)
        sessionStorage.setItem(
          "milkyway_admin_session",
          JSON.stringify(sessionData)
        );
      }

      // Chuyển đến trang admin
      navigate("/admin", { replace: true });
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="lock-icon">
              <FiLock />
            </div>
            <h1>Đăng nhập Admin</h1>
            <p>Milkyway Dance Management</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Tên đăng nhập</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <button type="submit" className="login-btn">
              Đăng nhập
            </button>
          </form>

          <div className="login-footer">
            <p className="hint">
              💡 Mặc định: <strong>admin</strong> /{" "}
              <strong>milkyway2024</strong>
            </p>
            <p className="warning">
              ⚠️ Đổi mật khẩu trong file <code>Login.jsx</code> trước khi
              deploy!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
