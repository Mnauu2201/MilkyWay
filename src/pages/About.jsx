import "./PageDefaults.css";
import { FiTarget, FiStar, FiClock } from "react-icons/fi"; // Thêm icon

const About = () => {
  return (
    <div className="page-container about-page">
      <div className="page-header">
        <h1>Về Milkyway Dance Crew</h1>
        <p>Hành trình đam mê, nhiệt huyết và những bước nhảy vô tận</p>
      </div>

      <div className="page-content container">
        {/* Phần 1: Lịch sử hình thành */}
        <section className="about-section">
          <h2>
            <FiClock /> Lịch Sử Hình Thành
          </h2>
          <p>
            Milkyway Dance Crew được thành lập vào năm 2019 với mục tiêu ban đầu
            là một nhóm bạn yêu thích Hip-hop và K-pop Cover. Qua nhiều năm hoạt
            động và phát triển, chúng tôi đã mở rộng sang nhiều thể loại khác
            như Contemporary, Jazz và Breaking, trở thành một trong những vũ
            đoàn trẻ hàng đầu tại [Tên khu vực của bạn].
          </p>
        </section>

        {/* Phần 2: Tầm nhìn & Sứ mệnh */}
        <section className="about-section vision-mission">
          <h2>
            <FiTarget /> Tầm Nhìn & Sứ Mệnh
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
              <h3>Sứ Mệnh</h3>
              <p>
                Cung cấp một môi trường chuyên nghiệp, sáng tạo, nơi mỗi thành
                viên có thể phát triển toàn diện kỹ năng và cá tính riêng biệt.
              </p>
            </div>
          </div>
        </section>

        {/* Phần 3: Thành tựu nổi bật */}
        <section className="about-section achievements">
          <h2>
            <FiStar /> Các Thành Tựu Nổi Bật
          </h2>
          <ul>
            <li>Quán quân cuộc thi [Tên cuộc thi A] năm 2022.</li>
            <li>
              Top 3 đội trình diễn xuất sắc nhất tại [Tên sự kiện B] năm 2023.
            </li>
            <li>
              Tham gia biểu diễn tại hơn 50 sự kiện lớn nhỏ trong thành phố.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
export default About;
