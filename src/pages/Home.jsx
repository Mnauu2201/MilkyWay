// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FiPlay,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  // Stats data
  const stats = [
    { icon: FiUsers, number: "50+", label: "Thành viên" },
    { icon: FiAward, number: "20+", label: "Giải thưởng" },
    { icon: FiTrendingUp, number: "100+", label: "Sự kiện" },
    { icon: FiPlay, number: "5+", label: "Năm kinh nghiệm" },
  ];

  // Member highlights
  const members = [
    {
      name: "ChouChou",
      role: "Leader & Choreographer",
      image: "/Mem1.jpg",
      specialty: "Hip Hop, Breaking",
    },
    {
      name: "Mai Trang",
      role: "Co-leader",
      image: "/Mem2.jpg",
      specialty: "Contemporary, Jazz",
    },
    {
      name: "Nguyen.HNgoc",
      role: "Main Dancer",
      image: "/Mem3.jpg",
      specialty: "Popping, Locking",
    },
  ];

  // Recent events
  const events = [
    {
      title: "Dance Battle 2024",
      date: "15/12/2024",
      location: "Hà Nội",
      image: "/hinh-nen-may-tinh-4k-1.jpg",
    },
    {
      title: "Workshop với DJ Khôi",
      date: "20/11/2024",
      location: "Hà Nội",
      image: "/hinh-nen-may-tinh-4k-1.jpg",
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Welcome to <span className="gradient-text"> MILKYWAY Dance</span>
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Nơi đam mê nhảy múa được thắp sáng
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Khám phá ngay
                <FiArrowRight />
              </motion.button>
              <motion.button
                className="btn btn-secondary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlay />
                Xem video
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="floating-element element-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="floating-element element-2"
            animate={{
              y: [0, -30, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <stat.icon className="stat-icon" />
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Về chúng tôi</h2>
            <p className="section-subtitle">
              Milkyway Dance - Vũ đoàn đầy nhiệt huyết và sáng tạo
            </p>
          </motion.div>

          <div className="about-content">
            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="image-wrapper">
                <img src="/hinh-nen-may-tinh-4k-1.jpg" alt="Milkyway Dance" />
                <div className="image-overlay"></div>
              </div>
            </motion.div>

            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="about-description">
                Milkyway Dance được thành lập với niềm đam mê mãnh liệt với nghệ
                thuật nhảy múa. Chúng tôi là một đội ngũ các vũ công tài năng,
                luôn không ngừng sáng tạo và khám phá những phong cách nhảy mới.
              </p>
              <p className="about-description">
                Với tinh thần đồng đội mạnh mẽ và sự cống hiến hết mình, chúng
                tôi đã tham gia và giành được nhiều giải thưởng trong các cuộc
                thi nhảy trong nước và quốc tế.
              </p>
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tìm hiểu thêm
                <FiArrowRight />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section className="members-section" id="members">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Thành viên nổi bật</h2>
            <p className="section-subtitle">
              Gặp gỡ những tài năng của Milkyway Dance
            </p>
          </motion.div>

          <div className="members-grid">
            {members.map((member, index) => (
              <motion.div
                key={index}
                className="member-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                  <div className="member-overlay">
                    <p className="member-specialty">{member.specialty}</p>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Sự kiện gần đây</h2>
            <p className="section-subtitle">
              Những hoạt động và thành tích mới nhất của chúng tôi
            </p>
          </motion.div>

          <div className="events-grid">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="event-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-date">{event.date}</div>
                </div>
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-location">{event.location}</p>
                  <Link to={`/events/${event.id}`} className="event-link">
                    Xem chi tiết <FiArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Sẵn sàng nhảy cùng chúng tôi?</h2>
          <p className="cta-subtitle">
            Liên hệ với chúng tôi để tìm hiểu thêm về các hoạt động và sự kiện
            sắp tới
          </p>
          <motion.button
            className="btn btn-light"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Liên hệ ngay
            <FiArrowRight />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
