import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config.js";
import { FiArrowLeft, FiCalendar, FiMapPin } from "react-icons/fi";
import "./EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm helper: Lấy Video ID từ link Youtube
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEvent(docSnap.data());
        } else {
          console.log("Không tìm thấy sự kiện!");
        }
      } catch (error) {
        console.error("Lỗi:", error);
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  if (loading)
    return (
      <div
        className="loading"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        Đang tải...
      </div>
    );
  if (!event)
    return (
      <div className="error" style={{ textAlign: "center", marginTop: "50px" }}>
        Sự kiện không tồn tại
      </div>
    );

  const videoId = getYoutubeId(event.videoUrl);

  return (
    <div className="event-detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Quay lại
        </button>

        <div className="detail-header">
          <h1>{event.title}</h1>
          <div className="meta-info">
            <span className="meta-item">
              <FiCalendar /> {event.date}
            </span>
            <span className="meta-item">
              <FiMapPin /> {event.location}
            </span>
          </div>
        </div>

        <div className="detail-content">
          {/* Ảnh sự kiện */}
          {event.image && (
            <div className="detail-image">
              <img src={event.image} alt={event.title} />
            </div>
          )}

          {/* Mô tả */}
          <div className="detail-description">
            <h3>Giới thiệu sự kiện</h3>
            <p>
              {event.description || "Chưa có mô tả chi tiết cho sự kiện này."}
            </p>
          </div>

          {/* Video Player (Nhúng Youtube) */}
          {videoId ? (
            <div className="detail-video">
              <h3>Video Highlight</h3>
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : event.videoUrl ? (
            // Fallback nếu link không phải Youtube chuẩn
            <div className="detail-video">
              <h3>Video Link</h3>
              <a href={event.videoUrl} target="_blank" rel="noreferrer">
                Xem video tại đây
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
