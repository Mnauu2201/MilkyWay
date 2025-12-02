import "./PageDefaults.css"; // Chúng ta sẽ tạo 1 file CSS chung cho các trang con đỡ bị lệch

const About = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Về Milkyway Dance</h1>
        <p>Hành trình đam mê và nhiệt huyết</p>
      </div>
      <div className="page-content container">
        <p>Nội dung chi tiết về lịch sử hình thành, tầm nhìn, sứ mệnh...</p>
        {/* Bạn có thể copy phần text từ Home sang đây */}
      </div>
    </div>
  );
};
export default About;
