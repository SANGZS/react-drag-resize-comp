import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
// 引入你想要展示的组件
import EnhancedDemo from "./components/EnhancedDemo";
import Demo from "./components/demo";

function App() {
  return (
    <Router>
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
        <nav style={{ display: "flex", gap: "10px" }}>
          <Link
            to="/demo"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "14px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Demo组件
          </Link>
          <Link
            to="/enhanced"
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "14px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            EnhancedDemo组件
          </Link>
        </nav>
      </div>
      <Routes>
        <Route path="/demo" element={<Demo />} />
        <Route path="/enhanced" element={<EnhancedDemo />} />
        <Route path="/" element={<Navigate to="/demo" replace />} />
        <Route path="*" element={<div>请选择组件进行预览</div>} />
      </Routes>
    </Router>
  );
}

export default App;
