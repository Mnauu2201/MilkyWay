import { FiX, FiLogOut } from "react-icons/fi";
import "./LogoutModal.css";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>

        <div className="modal-icon">
          <FiLogOut />
        </div>

        <h2 className="modal-title">Xác nhận đăng xuất</h2>
        <p className="modal-message">
          Bạn có chắc chắn muốn đăng xuất khỏi hệ thống quản trị không?
        </p>

        <div className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={onClose}>
            Hủy
          </button>
          <button className="modal-btn confirm-btn" onClick={onConfirm}>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
