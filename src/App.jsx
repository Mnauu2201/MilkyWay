import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import EventDetail from "./pages/EventDetail";
import About from "./pages/About"; // Thêm
import Members from "./pages/Members"; // Thêm
import Contact from "./pages/Contact"; // Thêm
import Gallery from "./pages/Gallery"; // Thêm

function AppContent() {
  const location = useLocation();

  // Ẩn Header và Footer ở trang admin và login
  const hideHeaderFooter = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/members" element={<Members />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Add loading animation
    document.body.classList.add("loaded");

    // Fix any overflow issues on mount
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
  }, []);

  return (
    <Router>
      <div className="app">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
