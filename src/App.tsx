import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage.tsx";
import HomePage from "./home/HomePage.tsx";
import RegisterPage from "./register/RegisterPage.tsx";
import AppBar from "./home/AppBar.tsx";
import AppFooter from "./AppFooter.tsx";

function App() {
  return (
    <div>
      <AppBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
      <AppFooter />
    </div>
  );
}

export default App;
