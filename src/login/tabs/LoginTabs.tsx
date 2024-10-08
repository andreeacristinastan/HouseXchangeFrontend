import "./LoginTabs.css";

interface LoginTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}
export const LoginTabs = ({ activeTab, setActiveTab }: LoginTabsProps) => {
  // const [activeTab, setActiveTab] = useState('guest');
  // console.log(`Current active tab: ${activeTab}`);

  return (
    <div className="button-group">
      <button
        className={`tab ${activeTab === "GUEST" ? "active" : ""}`}
        onClick={() => setActiveTab("GUEST")}
        id="signin-button"
      >
        Guest Sign In
      </button>

      <button
        className={`tab ${activeTab === "HOST" ? "active" : ""}`}
        onClick={() => setActiveTab("HOST")}
        id="signin-button"
      >
        Host Sign In
      </button>
    </div>
  );
};
