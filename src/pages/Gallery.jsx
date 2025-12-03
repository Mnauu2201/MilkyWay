// src/pages/Gallery.jsx - Fixed
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiImage } from "react-icons/fi";
import "./PageDefaults.css";

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        // Sắp xếp theo createdAt MỚI NHẤT TRƯỚC (desc)
        const q = query(
          collection(db, "gallery"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);

        const albumsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            // ĐẢM BẢO images luôn là mảng
            images: Array.isArray(data.images) ? data.images : [],
          };
        });

        setAlbums(albumsData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thư viện:", error);

        // Fallback: nếu lỗi (do data cũ chưa có createdAt), lấy không sắp xếp
        try {
          const snapshot = await getDocs(collection(db, "gallery"));
          const albumsData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              ...data,
              id: doc.id,
              images: Array.isArray(data.images) ? data.images : [],
            };
          });
          setAlbums(albumsData);
        } catch (fallbackError) {
          console.error("Lỗi fallback:", fallbackError);
        }
      }
      setLoading(false);
    };
    fetchAlbums();
  }, []);

  return (
    <div className="page-container gallery-page">
      <div className="page-header">
        <h1>Thư Viện Ảnh & Video</h1>
        <p>Khoảnh khắc đáng nhớ của Milkyway qua từng sự kiện</p>
      </div>

      <div className="page-content container">
        {loading ? (
          <div className="loading-message">Đang tải Album...</div>
        ) : albums.length === 0 ? (
          <p className="empty-message">Hiện chưa có Album nào.</p>
        ) : (
          <div className="members-grid-page">
            {albums.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={`/gallery/${album.id}`}
                  className="member-card gallery-card"
                >
                  <div className="member-image">
                    <img
                      src={
                        Array.isArray(album.images) && album.images.length > 0
                          ? album.images[0]
                          : "/placeholder.jpg"
                      }
                      alt={album.title}
                    />
                    <div className="member-overlay">
                      <p className="member-specialty">
                        <FiImage style={{ marginRight: "5px" }} />
                        {Array.isArray(album.images)
                          ? album.images.length
                          : 0}{" "}
                        Ảnh
                      </p>
                    </div>
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{album.title}</h3>
                    <p className="member-role">{album.date}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
