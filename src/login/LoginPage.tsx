import "./LoginPage.css";

import { LoginTabs } from "./tabs/LoginTabs";
import LoginForm from "./form/LoginForm";
import { useState } from "react";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("guest");

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <LoginTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <LoginForm activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default LoginPage;
