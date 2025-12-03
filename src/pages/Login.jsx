import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config.js";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra đã đăng nhập chưa
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Đã đăng nhập, chuyển về admin
        navigate("/admin", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Đăng nhập với Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("✅ Đăng nhập thành công:", userCredential.user.email);

      // Lưu session nếu "Ghi nhớ đăng nhập"
      if (rememberMe) {
        localStorage.setItem("milkyway_admin_session", "true");
      } else {
        sessionStorage.setItem("milkyway_admin_session", "true");
      }

      // Chuyển hướng về trang admin
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("❌ Lỗi đăng nhập:", error);

      // Xử lý các loại lỗi
      switch (error.code) {
        case "auth/invalid-email":
          setError("Email không hợp lệ.");
          break;
        case "auth/user-disabled":
          setError("Tài khoản đã bị vô hiệu hóa.");
          break;
        case "auth/user-not-found":
          setError("Không tìm thấy tài khoản với email này.");
          break;
        case "auth/wrong-password":
          setError("Mật khẩu không đúng.");
          break;
        case "auth/invalid-credential":
          setError("Email hoặc mật khẩu không đúng.");
          break;
        case "auth/too-many-requests":
          setError("Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau.");
          break;
        default:
          setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="lock-icon">
            <FiLock />
          </div>
          <h2 className="login-title">Đăng nhập Quản trị</h2>

          {error && <p className="error-message">{error}</p>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="form-control">
                <FiUser className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="form-control password-control">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
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
                  disabled={loading}
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="login-footer">
            <p className="hint">
              💡 Liên hệ:{" "}
              <a href="https://www.facebook.com/wwangh.ahn/">
                <strong>Quang Anh</strong>
              </a>{" "}
              để được cấp tài khoản
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
