import "./PageDefaults.css";
import { FiMail, FiPhone, FiMapPin, FiFacebook } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="page-container contact-page">
      <div className="page-header">
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <p>Milkyway luôn sẵn sàng đồng hành cùng đam mê của bạn</p>
      </div>

      <div className="page-content container">
        <div className="contact-grid">
          {/* Cột 1: Thông tin liên hệ */}
          <div className="contact-info">
            <h2>Thông Tin Liên Lạc</h2>
            <div className="info-item">
              <FiMail size={24} />
              <p>Email: maianh.meot@gmail.com</p>
            </div>
            <div className="info-item">
              <FiPhone size={24} />
              <p>Hotline: 082 689 9493 (Nguyễn Ớt)</p>
            </div>
            <div className="info-item">
              <FiMapPin size={24} />
              <p>Địa chỉ studio: Số X, đường Y, TP Thái Bình</p>
            </div>
            <div className="info-item">
              <FiFacebook size={24} />
              <p>Facebook: www.facebook.com/VuDoanMilkyW</p>
            </div>

            <iframe
              className="map-embed"
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d591.8184793386741!2d106.34416815155467!3d20.456092738960745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135e52a4b1e2fdf%3A0x44620987dd6cae8c!2zQ-G7rWEgSMOgbmcgWMSDbmcgROG6p3UgQuG7kyBYdXnDqm4!5e1!3m2!1svi!2s!4v1764874735395!5m2!1svi!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Cột 2: Form Liên hệ */}
          <div className="contact-form-wrapper">
            <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
            <form className="contact-form">
              <input type="text" placeholder="Họ và Tên *" required />
              <input type="email" placeholder="Email *" required />
              <input type="text" placeholder="Chủ đề/Yêu cầu" />
              <textarea
                placeholder="Nội dung chi tiết *"
                rows="5"
                required
              ></textarea>
              <button type="submit" className="btn-submit">
                Gửi Tin Nhắn
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
