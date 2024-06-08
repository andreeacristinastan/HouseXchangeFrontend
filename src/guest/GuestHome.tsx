import "./GuestHome.css";
// import GettingStarted from "./GettingStarted";
import ReceiveOffers from "../home/ReceiveOffers";
import GettingStarted from "../home/GettingStarted";
import { useUserStore } from "../utils/useUserStore";

const GuestHome = () => {
  const { user, setUser } = useUserStore();

  return (
    <div className="guest-home-container">
      <GettingStarted
        signedIn={true}
        messages={[
          `Welcome back, ${user?.username}!`,
          "Start booking your first trip",
        ]}
        typeOfUser={`${user?.role}`}
      />

      {/* <div className="rest-container"> */}
      <ReceiveOffers />
      {/* </div> */}
    </div>
  );
};

export default GuestHome;
