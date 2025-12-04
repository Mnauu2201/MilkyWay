// src/pages/Gallery.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config.js";
import { FiCalendar, FiImage, FiVideo } from "react-icons/fi";
import "./Gallery.css";

const Gallery = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ALBUMS_PER_PAGE = 9;

  // Lấy danh sách albums
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        const albumsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          let formattedDate = data.date || "N/A";

          // SỬA LỖI: Chuyển đổi Firebase Timestamp (nếu có) thành chuỗi ngày tháng
          if (data.date && typeof data.date.toDate === "function") {
            formattedDate = data.date.toDate().toLocaleDateString("vi-VN"); // Định dạng ngày tháng
          }

          return {
            id: doc.id,
            ...data,
            date: formattedDate, // Gán lại giá trị đã được định dạng
          };
        });

        setAlbums(albumsData);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi:", error);
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  // Lấy YouTube Video ID
  const getYouTubeVideoId = (url) => {
    if (!url || typeof url !== "string") return null;

    const patterns = [
      /\/shorts\/([^?&/]+)/,
      /youtu\.be\/([^?&/]+)/,
      /[?&]v=([^&]+)/,
      /\/embed\/([^?&/]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1].split("?")[0].split("&")[0].split("#")[0];
      }
    }
    return null;
  };

  // Lấy thumbnail
  const getThumbnail = (album) => {
    // Ưu tiên ảnh
    if (
      album.images &&
      Array.isArray(album.images) &&
      album.images.length > 0
    ) {
      const firstImage = album.images[0];
      if (typeof firstImage === "string" && firstImage.trim()) {
        return firstImage;
      }
    }

    // Fallback: YouTube thumbnail
    if (album.videoUrl) {
      const videoId = getYouTubeVideoId(album.videoUrl);
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }

    // Default placeholder
    return "https://via.placeholder.com/400x300/ff69b4/ffffff?text=MilkyWay";
  };

  // Tính toán phân trang
  const totalPages = Math.ceil(albums.length / ALBUMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ALBUMS_PER_PAGE;
  const endIndex = startIndex + ALBUMS_PER_PAGE;
  const currentAlbums = albums.slice(startIndex, endIndex);

  // Chuyển trang
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải gallery...</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Thư viện Ảnh & Video</h1>
        <p>Những khoảnh khắc đáng nhớ của MilkyWay Dance</p>
      </div>

      {albums.length === 0 ? (
        <div className="no-albums">
          <p>Chưa có album nào.</p>
        </div>
      ) : (
        <>
          <div className="gallery-grid">
            {currentAlbums.map((album) => (
              <div
                key={album.id}
                className="gallery-card"
                onClick={() => navigate(`/gallery/${album.id}`)}
              >
                <div className="card-image">
                  <img
                    src={getThumbnail(album)}
                    alt={album.title || "Album"}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400x300/cccccc/666666?text=Error";
                    }}
                  />
                  <div className="card-overlay">
                    <div className="card-icons">
                      {album.images && album.images.length > 0 && (
                        <span className="icon-badge">
                          <FiImage /> {album.images.length}
                        </span>
                      )}
                      {album.videoUrl && (
                        <span className="icon-badge video-badge">
                          <FiVideo />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{album.title || "Untitled"}</h3>
                  <div className="card-date">
                    <FiCalendar />
                    <span>{album.date || "N/A"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Trước
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`page-number ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                className="pagination-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Sau →
              </button>
            </div>
          )}

          {/* <div className="pagination-info">
            Hiển thị {startIndex + 1}-{Math.min(endIndex, albums.length)} trong
            tổng số {albums.length} album
          </div> */}
        </>
      )}
    </div>
  );
};

export default Gallery;
