// src/pages/GalleryDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config.js";
import { FiArrowLeft, FiCalendar, FiVideo, FiImage } from "react-icons/fi";
import "./GalleryDetail.css";

const GalleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu chi tiết Album
  useEffect(() => {
    const fetchAlbum = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "gallery", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAlbum({
            ...data,
            images: Array.isArray(data.images) ? data.images : [],
          });
        } else {
          console.log("Không tìm thấy Album!");
        }
      } catch (error) {
        console.error("Lỗi:", error);
      }
      setLoading(false);
    };
    fetchAlbum();
  }, [id]);

  // Hàm chuyển đổi YouTube URL sang Embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    let videoId = "";

    // YouTube Shorts
    if (url.includes("/shorts/")) {
      const match = url.match(/\/shorts\/([^?&/]+)/);
      if (match) videoId = match[1];
    }
    // youtu.be
    else if (url.includes("youtu.be")) {
      const match = url.match(/youtu\.be\/([^?&/]+)/);
      if (match) videoId = match[1];
    }
    // youtube.com/watch
    else if (url.includes("watch")) {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match) videoId = match[1];
    }
    // youtube.com/embed
    else if (url.includes("/embed/")) {
      const match = url.match(/\/embed\/([^?&/]+)/);
      if (match) videoId = match[1];
    }

    // Làm sạch videoId
    if (videoId) {
      videoId = videoId.split("?")[0].split("&")[0].split("#")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return null;
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!album) {
    return <div className="not-found">Album không tồn tại.</div>;
  }

  return (
    <div className="gallery-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <FiArrowLeft /> Quay lại Gallery
      </button>

      <div className="album-content">
        <div className="detail-header">
          <h1>{album.title}</h1>
          <div className="meta-info">
            <span className="meta-item">
              <FiCalendar /> {album.date}
            </span>
            <span className="meta-item">
              <FiVideo /> {album.videoUrl ? "Có Video" : "Không có Video"}
            </span>
            <span className="meta-item">
              <FiImage /> {album.images?.length || 0} ảnh
            </span>
          </div>
          {album.description && (
            <div className="album-description">{album.description}</div>
          )}
        </div>

        {/* PHẦN VIDEO - DÙNG IFRAME */}
        {album.videoUrl && (
          <section className="gallery-video-section">
            <h2>Video Highlight Sự kiện</h2>
            <div className="player-wrapper">
              {getYouTubeEmbedUrl(album.videoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(album.videoUrl)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                ></iframe>
              ) : (
                <div className="video-error">
                  <p>⚠️ URL video không hợp lệ</p>
                  <a
                    href={album.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-link-btn"
                  >
                    Xem trên YouTube
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {/* PHẦN ẢNH */}
        {album.images && album.images.length > 0 && (
          <section className="gallery-images-section">
            <h2>Hình ảnh sự kiện</h2>
            <div className="images-grid">
              {album.images.map((imageUrl, index) => (
                <div key={index} className="image-item">
                  <img
                    src={imageUrl}
                    alt={`${album.title} - Ảnh ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Thông báo nếu không có ảnh */}
        {(!album.images || album.images.length === 0) && (
          <div className="no-images">
            <FiImage size={48} />
            <p>Album này chưa có ảnh nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryDetail;
