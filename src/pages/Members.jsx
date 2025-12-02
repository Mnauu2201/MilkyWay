import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import "./PageDefaults.css";

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const snapshot = await getDocs(collection(db, "members"));
      setMembers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchMembers();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Thành Viên</h1>
        <p>Những gương mặt tạo nên Milkyway</p>
      </div>
      <div className="page-content container">
        <div className="members-grid-page">
          {members.map((mem) => (
            <div key={mem.id} className="member-card-page">
              <img src={mem.image} alt={mem.name} />
              <h3>{mem.name}</h3>
              <p>{mem.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Members;
