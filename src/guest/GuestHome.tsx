import "./GuestHome.css";
import GettingStarted from "./GettingStarted";
import ReceiveOffers from "../home/ReceiveOffers";

const GuestHome = () => {
  return (
    <div className="guest-home-container">
      <GettingStarted />

      {/* <div className="rest-container"> */}
      <ReceiveOffers />
      {/* </div> */}
    </div>
  );
};

export default GuestHome;
