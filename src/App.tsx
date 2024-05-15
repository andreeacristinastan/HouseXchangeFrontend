import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage.tsx";
import HomePage from "./home/HomePage.tsx";
import RegisterPage from "./register/RegisterPage.tsx";
import AppBar from "./home/AppBar.tsx";
import Profile from "./profile/Profile.tsx";
import { create } from "zustand";
import AppFooter from "./AppFooter.tsx";

// const useUserStore = create((set) => ({
//   users: 0,
//   increaseUser: () => set((state) => ({ users: state.bears + 1 })),
//   removeAllUsers: () => set({ users: 0 }),
// }))

function App() {
  return (
    <div>
      <AppBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
