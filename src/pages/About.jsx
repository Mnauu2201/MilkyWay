import "./PageDefaults.css";
// Thêm icon cho phần liên hệ/xã hội
import {
  FiTarget,
  FiStar,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiTwitter,
  FiSend,
} from "react-icons/fi";

const About = () => {
  return (
    <div className="page-container about-page">
      {/* Page Header (Giữ nguyên style hồng từ PageDefaults.css) */}
      <div className="page-header">
        <h1>Về Milkyway</h1>
        <p>Hành trình đam mê, nhiệt huyết và những bước nhảy vô tận</p>
      </div>

      <div className="page-content container">
        {/* KHU VỰC GIỚI THIỆU CHÍNH (NỀN SÁNG HÀI HÒA) */}
        <section className="about-section primary-intro">
          {/* THÔNG TIN NGƯỜI/NHÓM SÁNG LẬP - Sử dụng class mới */}
          <div className="founder-profile intro-box">
            <img
              src="/NguyenOtAbout.png"
              alt="Người sáng lập"
              className="founder-avatar"
            />
            <h2 className="crew-name">Nguyễn Ớt - Founder MILKYWAY</h2>
            <p className="crew-slogan">
              MilkyWay được thành lập với đam mê cháy bỏng về nghệ thuật nhảy
              múa. Chúng tôi là một tập thể nhiệt huyết, không ngừng tìm kiếm sự
              sáng tạo và lan tỏa năng lượng tích cực qua những bước nhảy.
            </p>

            {/* CÁC ICON MẠNG XÃ HỘI */}
            {/* <div className="social-links social-links-about">
              <a href="#">
                <FiTwitter />
              </a>
              <a href="#">
                <FiGithub />
              </a>
              <a href="#">
                <FiSend />
              </a>
            </div> */}
          </div>

          {/* Mục Sứ Mệnh */}
          <h2 className="about-heading-section">
            <FiTarget /> Sứ Mệnh của MilkyWay
          </h2>
          <p className="about-text-content">
            MilkyWay được tạo ra với sứ mệnh trở thành điểm đến hàng đầu cho
            cộng đồng yêu thích Dance tại Việt Nam. Chúng tôi cam kết cung cấp
            một môi trường chuyên nghiệp, sáng tạo, nơi mỗi thành viên có thể
            phát triển toàn diện kỹ năng và cá tính riêng biệt.
          </p>
        </section>

        {/* LỊCH SỬ HÌNH THÀNH */}
        <section className="about-section history-section">
          <h2 className="about-heading-section">
            <FiClock /> Lịch Sử Hình Thành
          </h2>
          <p className="about-text-content">
            Milkyway Dance Crew được thành lập vào năm 2019 với mục tiêu ban đầu
            là một nhóm bạn yêu thích Hip-hop và K-pop Cover. Qua nhiều năm hoạt
            động và phát triển, chúng tôi đã mở rộng sang nhiều thể loại khác
            như Contemporary, Jazz và Breaking, trở thành một trong những vũ
            đoàn trẻ hàng đầu tại [Tên khu vực của bạn].
          </p>
        </section>

        {/* TẦM NHÌN & THÀNH TỰU */}
        <section className="about-section vision-section">
          <h2 className="about-heading-section">
            <FiStar /> Tầm Nhìn & Thành Tựu
          </h2>
          <div className="mission-cards">
            <div className="card">
              <h3>Tầm Nhìn</h3>
              <p>
                Trở thành nguồn cảm hứng bất tận, lan tỏa niềm đam mê nhảy múa
                đến cộng đồng, và đại diện cho Việt Nam tại các đấu trường quốc
                tế.
              </p>
            </div>
            <div className="card">
              <h3>Thành Tựu Nổi Bật</h3>
              <ul>
                <li>Quán quân cuộc thi [Tên cuộc thi A] năm 2022.</li>
                <li>
                  Top 3 đội trình diễn xuất sắc nhất tại [Tên sự kiện B] năm
                  2023.
                </li>
                <li>
                  Tham gia biểu diễn tại hơn 50 sự kiện lớn nhỏ trong thành phố.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* PHẦN LIÊN HỆ & HỢP TÁC (Giữ nguyên cấu trúc form) */}
      </div>
    </div>
  );
};
export default About;
