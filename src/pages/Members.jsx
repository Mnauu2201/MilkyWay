// src/pages/Members.jsx
import { useState, useEffect } from "react";
import { db } from "@/firebase/config.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./PageDefaults.css";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Sắp xếp theo createdAt tăng dần (cũ → mới)
        const q = query(collection(db, "members"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        setMembers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thành viên:", error);

        // Fallback: nếu lỗi (do data cũ chưa có createdAt), lấy không sắp xếp
        try {
          const snapshot = await getDocs(collection(db, "members"));
          setMembers(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        } catch (fallbackError) {
          console.error("Lỗi fallback:", fallbackError);
        }
      }
      setLoading(false);
    };
    fetchMembers();
  }, []);

  return (
    <div className="page-container members-page">
      <div className="page-header">
        <h1>Đội Ngũ Milkyway</h1>
        <p>Gặp gỡ tất cả thành viên của vũ đoàn</p>
      </div>

      <div className="page-content container">
        {loading ? (
          <p style={{ textAlign: "center", padding: "3rem" }}>
            Đang tải danh sách thành viên...
          </p>
        ) : members.length === 0 ? (
          <p style={{ textAlign: "center", padding: "3rem" }}>
            Chưa có thành viên nào được thêm.
          </p>
        ) : (
          <div className="members-grid-page">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                className="member-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                  <div className="member-overlay">
                    <p className="member-specialty">
                      {member.specialty || "Dancer"}
                    </p>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
