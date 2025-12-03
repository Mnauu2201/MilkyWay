// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Giới thiệu", href: "/about" },
    { name: "Thành viên", href: "/members" },
    { name: "Thư viện", href: "/gallery" },
  ];

  const socialLinks = [
    { icon: FiInstagram, href: "#", label: "Instagram", color: "#E4405F" },
    {
      icon: FiFacebook,
      href: "https://www.facebook.com/VuDoanMilkyW",
      label: "Facebook",
      color: "#1877F2",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@meot.297",
      label: "TikTok",
      color: "#FF0000",
    },
  ];

  const contactInfo = [
    {
      icon: FiMail,
      text: "maianh.meot@gmail.com",
      href: "mailto:maianh.meot@gmail.com",
    },
    { icon: FiPhone, text: "+84 82 689 9493", href: "tel:+84826899493" },
    { icon: FiMapPin, text: "Hà Nội, Việt Nam", href: "#" },
  ];

  return (
    <footer className="footer">
      {/* Decorative Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-container">
          {/* Brand Section */}
          <motion.div
            className="footer-section brand-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/MilkyWay-removebg-preview_.png"
              alt="Milkyway Dance"
              className="footer-logo"
            />
            <p className="footer-tagline">Nơi đam mê nhảy múa được thắp sáng</p>
            <div className="social-icons">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="footer-social-icon"
                  aria-label={social.label}
                  style={{ "--hover-color": social.color }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="footer-title">Liên kết nhanh</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <a href={link.href} className="footer-link">
                    <span className="link-arrow">→</span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="footer-title">Liên hệ</h3>
            <ul className="contact-list">
              {contactInfo.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <a href={item.href} className="contact-item">
                    <item.icon className="contact-icon" />
                    <span>{item.text}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="footer-title">Nhận thông tin mới nhất</h3>
            <p className="newsletter-text">
              Đăng ký để không bỏ lỡ sự kiện và hoạt động mới
            </p>
            <form
              className="newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email của bạn"
                className="newsletter-input"
                required
              />
              <motion.button
                type="submit"
                className="newsletter-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Đăng ký
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="copyright">
            © {currentYear} MilkyWay Dance. Website made by{" "}
            <strong>
              <a href="https://www.facebook.com/wwangh.ahn/">
                Nguyen Quang Anh
              </a>
            </strong>{" "}
            <FiHeart className="heart-icon" />
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
