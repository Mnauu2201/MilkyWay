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
            Nơi quy tụ những nghệ sĩ trẻ tài năng, sáng tạo và chuyên nghiệp;
            tiên phong mang đến các tiết mục biểu diễn có tính nghệ thuật cao,
            hiện đại, đa dạng phong cách và phù hợp với mọi sự kiện. Hướng tới
            xây dựng một thương hiệu vững mạnh, uy tín - là lựa chọn hàng đầu
            của các chương trình lễ hội, sự kiện doanh nghiệp, khai trương -
            khánh thành, chương trình nghệ thuật, sự kiện văn hoá - du lịch và
            các sản phẩm truyền thông - giải trí.
          </p>
        </section>

        {/* LỊCH SỬ HÌNH THÀNH */}
        <section className="about-section history-section">
          <h2 className="about-heading-section">
            <FiClock /> Lịch Sử Hình Thành
          </h2>
          <p className="about-text-content">
            MKW bắt đầu chỉ với 2–3 thành viên có chung niềm đam mê với nghệ
            thuật nhảy và múa. Từ những ngày đầu, nhóm được xây dựng như một câu
            lạc bộ, tạo sân chơi cho những bạn trẻ yêu thích việc được nhảy,
            được múa và được sống trong không khí của nghệ thuật biểu diễn. Nhờ
            sự luyện tập chăm chỉ và tinh thần cầu tiến của từng thành viên, câu
            lạc bộ ngày càng phát triển. Các bạn không chỉ hoàn thiện kỹ năng cá
            nhân mà còn hình thành một tập thể gắn kết, có chuyên môn vững vàng.
            Từ nền tảng đó, MKW dần trưởng thành và chuyển mình từ một câu lạc
            bộ nhỏ thành một vũ đoàn chuyên nghiệp, đảm nhiệm biểu diễn tại
            nhiều sự kiện, chương trình và các hoạt động nghệ thuật khác.
          </p>
        </section>

        {/* TẦM NHÌN & THÀNH TỰU */}
        <section className="about-section vision-section">
          <h2 className="about-heading-section">
            <FiStar /> Tầm Nhìn & Giá Trị
          </h2>
          <div className="mission-cards">
            <div className="card">
              <h3>Tầm Nhìn</h3>
              <ul>
                <li>
                  Nâng tầm nghệ thuật biểu diễn tại Thái Bình thông qua các
                  chương trình vũ đạo chuyên nghiệp, sáng tạo, được đầu tư bài
                  bản.
                </li>
                <li>
                  Xây dựng đội ngũ dancer có kỹ thuật cao, thái độ làm việc
                  chuẩn mực, phong cách chuyên nghiệp.
                </li>
                <li>
                  Phát triền các sản phẩm nghệ thuật độc quyền, mang bản sắc
                  riêng của vũ đoàn.
                </li>
                <li>
                  Kết nối cộng đồng trẻ yêu nghệ thuật, trở thành trung tâm đào
                  tạo - truyền cảm hứng về vũ đạo.
                </li>
                <li>
                  Hợp tác với doanh nghiệp, đơn vị tổ chức sự kiện để tạo nên
                  những màn trình diễn ấn tượng, khác biệt và hiệu quả.
                </li>
              </ul>
            </div>
            <div className="card">
              <h3>Giá Trị Mà MKW Hướng Tới</h3>
              <ul>
                <li>Chuyên nghiệp - Sáng tạo - Uy tín</li>
                <li>Không ngừng đổi mới & cập nhật xu hướng biểu diễn</li>
                <li>Kiến tạo trải nghiệm nghệ thuật độc đáo cho khán giả</li>
                <li>
                  Góp phần quảng bá hình ảnh năng động, trẻ trung của Thái Bình
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
