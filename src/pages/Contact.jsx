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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4990924151785!2d106.6974728148005!3d10.774966962310191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3f1e9c5a15%3A0x3f9e9d6d5d5a5a5a!2sNh%C3%A0%20H%C3%A1t%20L%E1%BB%9Bn%20Th%C3%A0nh%20Ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1svi!2s!4v1678881234567!5m2!1svi!2s"
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
