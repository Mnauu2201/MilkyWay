// src/pages/GalleryDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config.js";
import { FiArrowLeft, FiCalendar, FiVideo, FiImage } from "react-icons/fi";
import ReactPlayer from "react-player";
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

  // Tạo mã nhúng iframe YouTube
  const getYouTubeEmbedCode = (url) => {
    if (url && (url.includes("youtube.com") || url.includes("youtu.be"))) {
      let videoId = "";

      const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
      if (shortMatch) {
        videoId = shortMatch[1];
      }

      const watchMatch = url.match(/[?&]v=([^&]+)/);
      if (!videoId && watchMatch) {
        videoId = watchMatch[1];
      }

      if (videoId && videoId.includes("?")) {
        videoId = videoId.split("?")[0];
      }

      if (videoId) {
        return (
          <iframe
            key={videoId}
            src={`https://www.youtube.com/embed/${videoId}?rel=0&controls=1&showinfo=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        );
      }
    }
    return (
      <ReactPlayer
        url={url}
        className="react-player"
        width="100%"
        height="100%"
        controls={true}
      />
    );
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

        {/* PHẦN VIDEO */}
        {album.videoUrl && (
          <section className="gallery-video-section">
            <h2>Video Highlight Sự kiện</h2>
            <div className="player-wrapper">
              {getYouTubeEmbedCode(album.videoUrl)}
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
