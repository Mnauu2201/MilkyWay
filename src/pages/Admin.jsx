// src/pages/Admin.jsx (Cập nhật)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config"; // Import DB
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiUpload,
  FiLogOut,
  FiVideo,
  FiAlignLeft,
} from "react-icons/fi";
import LogoutModal from "../components/LogoutModal";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("members");

  // State dữ liệu từ Firebase
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 1. Lấy dữ liệu từ Firebase khi load trang
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const memSnapshot = await getDocs(collection(db, "members"));
        const evSnapshot = await getDocs(collection(db, "events"));

        setMembers(
          memSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setEvents(
          evSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Lưu ý: Upload ảnh dạng base64 lên Firestore có giới hạn dung lượng.
      // Tốt nhất nên dùng Firebase Storage, nhưng để đơn giản tạm thời dùng cách này.
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý Submit chung cho cả Thêm và Sửa
  const handleSubmit = async (e, collectionName) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Cập nhật
        const docRef = doc(db, collectionName, editingId);
        await updateDoc(docRef, formData);

        // Cập nhật UI
        const updateState =
          collectionName === "members" ? setMembers : setEvents;
        const currentData = collectionName === "members" ? members : events;
        updateState(
          currentData.map((item) =>
            item.id === editingId ? { ...formData, id: editingId } : item
          )
        );
      } else {
        // Thêm mới
        const docRef = await addDoc(collection(db, collectionName), formData);

        // Cập nhật UI
        const updateState =
          collectionName === "members" ? setMembers : setEvents;
        const currentData = collectionName === "members" ? members : events;
        updateState([...currentData, { ...formData, id: docRef.id }]);
      }
      resetForm();
    } catch (error) {
      alert("Có lỗi xảy ra: " + error.message);
    }
  };

  const handleDelete = async (id, collectionName) => {
    if (window.confirm("Bạn có chắc muốn xóa không?")) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        if (collectionName === "members") {
          setMembers(members.filter((m) => m.id !== id));
        } else {
          setEvents(events.filter((e) => e.id !== id));
        }
      } catch (error) {
        alert("Lỗi khi xóa: " + error.message);
      }
    }
  };

  // ... (Giữ nguyên các hàm editMember, editEvent, resetForm, handleLogout như cũ) ...
  const editMember = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };
  const editEvent = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };
  const resetForm = () => {
    setFormData({});
    setEditingId(null);
    setShowForm(false);
  };
  const handleLogout = () => setShowLogoutModal(true);
  const confirmLogout = () => {
    localStorage.removeItem("milkyway_admin_session");
    sessionStorage.removeItem("milkyway_admin_session");
    setShowLogoutModal(false);
    navigate("/admin/login", { replace: true });
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="admin-page">
      {/* Container class đã sửa trong CSS */}
      <div className="admin-container">
        {/* ... Header và Tabs giữ nguyên ... */}
        <div className="admin-header-wrapper">
          <h1 className="admin-title">Quản lý Milkyway Dance</h1>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut /> Đăng xuất
          </button>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab ${activeTab === "members" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("members");
              resetForm();
            }}
          >
            Thành viên
          </button>
          <button
            className={`tab ${activeTab === "events" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("events");
              resetForm();
            }}
          >
            Sự kiện
          </button>
        </div>

        {!showForm && (
          <button className="add-btn" onClick={() => setShowForm(true)}>
            <FiPlus /> Thêm {activeTab === "members" ? "thành viên" : "sự kiện"}
          </button>
        )}

        {/* Form Area */}
        {showForm && (
          <div className="form-container">
            <div className="form-header">
              <h2>
                {editingId ? "Chỉnh sửa" : "Thêm mới"}{" "}
                {activeTab === "members" ? "thành viên" : "sự kiện"}
              </h2>
              <button className="close-btn" onClick={resetForm}>
                <FiX />
              </button>
            </div>

            {activeTab === "members" ? (
              // Form Thành Viên (Giữ nguyên logic cũ nhưng gọi handleSubmit('members'))
              <form
                onSubmit={(e) => handleSubmit(e, "members")}
                className="admin-form"
              >
                {/* ... Các input của Member giữ nguyên như code cũ ... */}
                <div className="form-group">
                  <label>Ảnh đại diện</label>
                  <div className="image-upload">
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="image-preview"
                      />
                    )}
                    <label className="upload-label">
                      <FiUpload />
                      <span>Chọn ảnh</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Tên thành viên *</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Vai trò *</label>
                  <input
                    type="text"
                    value={formData.role || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Chuyên môn *</label>
                  <input
                    type="text"
                    value={formData.specialty || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, specialty: e.target.value })
                    }
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  <FiSave /> {editingId ? "Cập nhật" : "Thêm mới"}
                </button>
              </form>
            ) : (
              // Form Sự Kiện (THÊM CÁC TRƯỜNG MỚI)
              <form
                onSubmit={(e) => handleSubmit(e, "events")}
                className="admin-form"
              >
                <div className="form-group">
                  <label>Ảnh sự kiện (Thumbnail)</label>
                  <div className="image-upload">
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="image-preview"
                      />
                    )}
                    <label className="upload-label">
                      <FiUpload />
                      <span>Chọn ảnh</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Tên sự kiện *</label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Ngày *</label>
                  <input
                    type="text"
                    value={formData.date || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="VD: 15/12/2024"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Địa điểm *</label>
                  <input
                    type="text"
                    value={formData.location || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </div>

                {/* TRƯỜNG MỚI: Video Link */}
                <div className="form-group">
                  <label>
                    <FiVideo /> Link Video (Youtube Embed/Link) (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={formData.videoUrl || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, videoUrl: e.target.value })
                    }
                    placeholder="https://www.youtube.com/..."
                  />
                </div>

                {/* TRƯỜNG MỚI: Mô tả chi tiết */}
                <div className="form-group">
                  <label>
                    <FiAlignLeft /> Mô tả chi tiết (Tùy chọn)
                  </label>
                  <textarea
                    rows="5"
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Nhập nội dung chi tiết sự kiện..."
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <FiSave /> {editingId ? "Cập nhật" : "Thêm mới"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* List render logic cập nhật gọi hàm handleDelete mới */}
        <div className="list-container">
          {activeTab === "members" ? (
            <div className="members-list">
              {members.map((member) => (
                <div key={member.id} className="list-item">
                  <img
                    src={member.image || "/placeholder.jpg"}
                    alt={member.name}
                  />
                  <div className="item-info">
                    <h3>{member.name}</h3>
                    <p className="role">{member.role}</p>
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() => editMember(member)}
                      className="edit-btn"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id, "members")}
                      className="delete-btn"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="events-list">
              {events.map((event) => (
                <div key={event.id} className="list-item">
                  <img
                    src={event.image || "/placeholder.jpg"}
                    alt={event.title}
                  />
                  <div className="item-info">
                    <h3>{event.title}</h3>
                    <p className="date">{event.date}</p>
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() => editEvent(event)}
                      className="edit-btn"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id, "events")}
                      className="delete-btn"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={confirmLogout}
        />
      </div>
    </div>
  );
};

export default Admin;
