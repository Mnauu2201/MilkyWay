// src/pages/GalleryDetail.jsx (Phiên bản Dùng IFRAME TRỰC TIẾP)
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config.js";
import { FiArrowLeft, FiCalendar, FiVideo } from "react-icons/fi";
// Vẫn giữ ReactPlayer để phòng trường hợp cần dùng
import ReactPlayer from "react-player";
import "./GalleryDetail.css";

const GalleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Lấy dữ liệu chi tiết Album
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

  // ----------------------------------------------------
  // ⚠️ PHẦN QUAN TRỌNG: TẠO MÃ NHÚNG IFRAME YOUTUBE ⚠️
  // ----------------------------------------------------
  const getYouTubeEmbedCode = (url) => {
    // 1. Kiểm tra nếu URL là YouTube
    if (url && (url.includes("youtube.com") || url.includes("youtu.be"))) {
      let videoId = "";

      // Xử lý link rút gọn (youtu.be/ID) và link chia sẻ
      const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
      if (shortMatch) {
        videoId = shortMatch[1];
      }

      // Xử lý link đầy đủ (watch?v=ID)
      const watchMatch = url.match(/[?&]v=([^&]+)/);
      if (!videoId && watchMatch) {
        videoId = watchMatch[1];
      }

      // Loại bỏ tham số chia sẻ (như ?si=...) nếu còn sót
      if (videoId && videoId.includes("?")) {
        videoId = videoId.split("?")[0];
      }

      if (videoId) {
        // Trả về iframe HTML chuẩn
        return (
          <iframe
            key={videoId}
            src={`https://www.youtube.com/embed/${videoId}?rel=0&controls=1&showinfo=0`}
            title="YouTube video player"
            frameBorder="0"
            // Cho phép các tính năng điều khiển
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            // Hai thuộc tính này sẽ được CSS ghi đè để hiển thị responsive
            width="100%"
            height="100%"
          ></iframe>
        );
      }
    }
    // Nếu không phải YouTube hoặc không trích xuất được ID (dùng fallback ReactPlayer)
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
  // ----------------------------------------------------

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
          </div>
          {album.description && (
            <div className="album-description">{album.description}</div>
          )}
        </div>

        {/* PHẦN VIDEO DÙNG IFRAME TRỰC TIẾP */}
        {album.videoUrl && (
          <section className="gallery-video-section">
            <h2>Video Highlight Sự kiện</h2>
            {/* ⚠️ CONTAINER VẪN CẦN CSS player-wrapper ⚠️ */}
            <div className="player-wrapper">
              {getYouTubeEmbedCode(album.videoUrl)}
            </div>
          </section>
        )}

        {/* Phần Ảnh */
        /* ... (Giữ nguyên phần render ảnh) ... */}
      </div>
    </div>
  );
};

export default GalleryDetail;
