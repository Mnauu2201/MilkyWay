// src/pages/GalleryDetail.jsx - Fixed
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { FiArrowLeft, FiCalendar, FiVideo } from "react-icons/fi";
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
          // ĐẢM BẢO images luôn là mảng
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

  // 2. Hàm render Video
  const renderVideo = (url) => {
    if (!url) return null;

    // A. Nếu là YouTube
    const youtubeRegExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const youtubeMatch = url.match(youtubeRegExp);

    if (youtubeMatch && youtubeMatch[2].length === 11) {
      return (
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeMatch[2]}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }

    // B. Nếu là Facebook
    if (url.includes("facebook.com") || url.includes("fb.watch")) {
      const encodedUrl = encodeURIComponent(url);
      return (
        <div className="video-container">
          <iframe
            src={`https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=0&width=560`}
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      );
    }

    // C. Link khác (FallBack)
    return (
      <div className="video-link-fallback">
        <a href={url} target="_blank" rel="noreferrer">
          👉 Xem video tại đây
        </a>
      </div>
    );
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (!album) return <div className="error">Album không tồn tại</div>;

  return (
    <div className="gallery-detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Quay lại Thư viện
        </button>

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

        {/* Phần Video */}
        {album.videoUrl && (
          <section className="gallery-video-section">
            <h2>Video Highlight Sự kiện</h2>
            {renderVideo(album.videoUrl)}
          </section>
        )}

        {/* Phần Ảnh */}
        <section className="gallery-images-section">
          <h2>
            Ảnh Sự kiện ({Array.isArray(album.images) ? album.images.length : 0}{" "}
            ảnh)
          </h2>
          {Array.isArray(album.images) && album.images.length > 0 ? (
            <div className="images-grid">
              {album.images.map((img, index) => (
                <div key={index} className="image-item">
                  <img src={img} alt={`${album.title} - Ảnh ${index + 1}`} />
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">Album này chưa có ảnh.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default GalleryDetail;
