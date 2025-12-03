// src/pages/Admin.jsx (Fixed - Firebase Authentication)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiImage,
  FiLogOut,
} from "react-icons/fi";
import LogoutModal from "../components/LogoutModal";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // State cho gallery images (array of URLs)
  const [galleryImageUrls, setGalleryImageUrls] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // 1. Lấy dữ liệu từ Firebase
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Members
      const memberSnapshot = await getDocs(collection(db, "members"));
      setMembers(
        memberSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );

      // Fetch Gallery - SẮP XẾP MỚI NHẤT TRƯỚC
      try {
        const galleryQuery = query(
          collection(db, "gallery"),
          orderBy("createdAt", "desc") // desc = mới nhất trước
        );
        const gallerySnapshot = await getDocs(galleryQuery);
        const galleryData = gallerySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            // ĐẢM BẢO images luôn là mảng
            images: Array.isArray(data.images) ? data.images : [],
          };
        });
        setGallery(galleryData);
      } catch (sortError) {
        console.warn("Không thể sắp xếp, lấy dữ liệu thường:", sortError);
        // Fallback: lấy không sắp xếp
        const gallerySnapshot = await getDocs(collection(db, "gallery"));
        const galleryData = gallerySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            images: Array.isArray(data.images) ? data.images : [],
          };
        });
        setGallery(galleryData);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      alert("Có lỗi khi tải dữ liệu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Thêm/Sửa item
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === "members") {
        // --- XỬ LÝ MEMBER ---
        const dataToSave = {
          name: formData.name,
          role: formData.role,
          image: formData.image || "",
          specialty: formData.specialty || "Dancer",
        };

        if (editingId) {
          await updateDoc(doc(db, "members", editingId), dataToSave);
        } else {
          dataToSave.createdAt = serverTimestamp();
          await addDoc(collection(db, "members"), dataToSave);
        }
      } else if (activeTab === "gallery") {
        // --- XỬ LÝ GALLERY ---

        // VALIDATION: Kiểm tra phải có ít nhất 1 ảnh
        if (galleryImageUrls.length === 0) {
          alert("⚠️ Vui lòng thêm ít nhất 1 ảnh cho album!");
          setLoading(false);
          return;
        }

        const dataToSave = {
          title: formData.title,
          date: formData.date,
          images: galleryImageUrls, // ĐẢM BẢO là mảng
          videoUrl: formData.videoUrl || "",
          description: formData.description || "",
          imageCount: galleryImageUrls.length,
        };

        if (editingId) {
          // Sửa: KHÔNG thay đổi createdAt
          await updateDoc(doc(db, "gallery", editingId), dataToSave);
        } else {
          // Thêm mới: THÊM createdAt
          dataToSave.createdAt = serverTimestamp();
          await addDoc(collection(db, "gallery"), dataToSave);
        }

        setGalleryImageUrls([]);
        setNewImageUrl("");
      }

      // Reset Form
      setShowForm(false);
      setEditingId(null);
      setFormData({});
      fetchData();

      alert("✅ Lưu thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm/sửa:", error);
      alert("❌ Có lỗi xảy ra: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Xóa item
  const handleDelete = async (id, collectionName) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mục này?")) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, collectionName, id));
        fetchData();
        alert("✅ Xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        alert("❌ Có lỗi khi xóa: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Mở Form Sửa
  const startEdit = (item, tab) => {
    setEditingId(item.id);
    setFormData(item);
    setShowForm(true);
    setActiveTab(tab);

    // Nếu là gallery, load images vào state
    if (tab === "gallery") {
      // ĐẢM BẢO images là mảng
      const images = Array.isArray(item.images) ? item.images : [];
      setGalleryImageUrls([...images]);
    }
    setNewImageUrl("");
  };

  // Thêm URL ảnh vào danh sách (Gallery)
  const addImageUrl = () => {
    const url = newImageUrl.trim();
    if (!url) {
      alert("⚠️ Vui lòng nhập link ảnh!");
      return;
    }

    // Kiểm tra URL hợp lệ
    try {
      new URL(url);
      setGalleryImageUrls([...galleryImageUrls, url]);
      setNewImageUrl("");
    } catch {
      alert(
        "⚠️ Link ảnh không hợp lệ! Vui lòng nhập URL đầy đủ (bắt đầu bằng http:// hoặc https://)"
      );
    }
  };

  // Xóa ảnh khỏi danh sách (Gallery)
  const removeGalleryImage = (index) => {
    const updated = galleryImageUrls.filter((_, i) => i !== index);
    setGalleryImageUrls(updated);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({});
    setGalleryImageUrls([]);
    setNewImageUrl("");
  };

  // Đăng xuất với Firebase Authentication
  const confirmLogout = async () => {
    try {
      // Đăng xuất khỏi Firebase
      await signOut(auth);

      // Xóa session
      localStorage.removeItem("milkyway_admin_session");
      sessionStorage.removeItem("milkyway_admin_session");

      console.log("✅ Đăng xuất thành công");
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("❌ Lỗi khi đăng xuất:", error);
      alert("Có lỗi khi đăng xuất. Vui lòng thử lại.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header-wrapper">
          <h1 className="admin-title">Quản Trị Viên</h1>
          <button
            className="logout-btn"
            onClick={() => setShowLogoutModal(true)}
          >
            <FiLogOut /> Đăng Xuất
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="tab-nav">
          <button
            onClick={() => setActiveTab("members")}
            className={activeTab === "members" ? "active" : ""}
          >
            Thành Viên
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={activeTab === "gallery" ? "active" : ""}
          >
            Thư Viện
          </button>
        </div>

        {/* Add Button */}
        <div className="admin-actions">
          <button
            className="add-btn"
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({});
              setGalleryImageUrls([]);
              setNewImageUrl("");
            }}
          >
            <FiPlus /> Thêm {activeTab === "members" ? "Thành Viên" : "Album"}
          </button>
        </div>

        {/* Form Add/Edit */}
        {showForm && (
          <div className="admin-form">
            <form onSubmit={handleAddOrUpdate}>
              <h3>
                {editingId ? "Sửa" : "Thêm"}{" "}
                {activeTab === "members" ? "Thành Viên" : "Album"}
              </h3>

              {/* Form Members */}
              {activeTab === "members" && (
                <>
                  <div className="form-group">
                    <label>Tên Thành Viên *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Vai Trò *</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role || ""}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Chuyên Môn</label>
                    <input
                      type="text"
                      name="specialty"
                      value={formData.specialty || ""}
                      onChange={handleFormChange}
                      placeholder="Vd: Dancer, Choreographer..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Link Ảnh Thành Viên *</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image || ""}
                      onChange={handleFormChange}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    <span className="form-hint">
                      💡 Dán link ảnh từ Facebook, Imgur, hoặc nguồn khác
                    </span>
                    {formData.image && (
                      <div className="image-preview">
                        <img src={formData.image} alt="Preview" />
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Form Gallery */}
              {activeTab === "gallery" && (
                <>
                  <div className="form-group">
                    <label>Tiêu Đề Album *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ""}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Ngày Sự Kiện *</label>
                    <input
                      type="text"
                      name="date"
                      value={formData.date || ""}
                      onChange={handleFormChange}
                      placeholder="Vd: 3/12/2025"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mô Tả (Tùy chọn)</label>
                    <textarea
                      name="description"
                      value={formData.description || ""}
                      onChange={handleFormChange}
                      placeholder="Mô tả về sự kiện..."
                    />
                  </div>

                  {/* Thêm ảnh bằng link */}
                  <div className="form-group">
                    <label>
                      <FiImage /> Thêm Ảnh (Dán Link) *
                    </label>
                    <div className="add-image-input">
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addImageUrl();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={addImageUrl}
                        className="add-url-btn"
                      >
                        <FiPlus /> Thêm
                      </button>
                    </div>
                    <span className="form-hint">
                      💡 Dán link ảnh và nhấn "Thêm". Có thể thêm nhiều ảnh.{" "}
                      <strong>Phải có ít nhất 1 ảnh!</strong>
                    </span>
                  </div>

                  {/* Hiển thị danh sách ảnh đã thêm */}
                  {galleryImageUrls.length > 0 && (
                    <div className="existing-images-preview">
                      <p>✅ Danh sách ảnh ({galleryImageUrls.length}):</p>
                      <div className="image-thumbs">
                        {galleryImageUrls.map((imgUrl, index) => (
                          <div key={index} className="thumb-item">
                            <img src={imgUrl} alt={`Ảnh ${index + 1}`} />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="remove-thumb-btn"
                            >
                              <FiX />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label>Link Video (YouTube/Facebook - Tùy chọn)</label>
                    <input
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl || ""}
                      onChange={handleFormChange}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <span className="form-hint">
                      💡 Dán link video từ YouTube hoặc Facebook
                    </span>
                  </div>
                </>
              )}

              <div className="form-actions">
                <button type="submit" className="save-btn" disabled={loading}>
                  <FiSave /> {editingId ? "Lưu Thay Đổi" : "Thêm Mới"}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="cancel-btn"
                >
                  <FiX /> Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List Content */}
        <div className="content-list-wrapper">
          {loading && <div className="loading">Đang tải dữ liệu...</div>}

          {/* Members List */}
          {!loading && activeTab === "members" && (
            <div className="data-list">
              {members.length === 0 ? (
                <p className="empty-message">Chưa có thành viên nào</p>
              ) : (
                members.map((member) => (
                  <div key={member.id} className="list-item">
                    <img
                      src={member.image || "/placeholder.jpg"}
                      alt={member.name}
                    />
                    <div className="item-info">
                      <h3>{member.name}</h3>
                      <p className="sub-info">{member.role}</p>
                    </div>
                    <div className="item-actions">
                      <button
                        onClick={() => startEdit(member, "members")}
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
                ))
              )}
            </div>
          )}

          {/* Gallery List */}
          {!loading && activeTab === "gallery" && (
            <div className="data-list">
              {gallery.length === 0 ? (
                <p className="empty-message">Chưa có Album nào</p>
              ) : (
                gallery.map((album) => (
                  <div key={album.id} className="list-item">
                    <img
                      src={
                        Array.isArray(album.images) && album.images.length > 0
                          ? album.images[0]
                          : "/placeholder.jpg"
                      }
                      alt={album.title}
                    />
                    <div className="item-info">
                      <h3>{album.title}</h3>
                      <p className="sub-info">{album.date}</p>
                      <p className="sub-info">
                        {Array.isArray(album.images) ? album.images.length : 0}{" "}
                        ảnh | {album.videoUrl ? "Có Video" : "Không Video"}
                      </p>
                    </div>
                    <div className="item-actions">
                      <button
                        onClick={() => startEdit(album, "gallery")}
                        className="edit-btn"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(album.id, "gallery")}
                        className="delete-btn"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))
              )}
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
