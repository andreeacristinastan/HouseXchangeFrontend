import ReceiveOffers from "../home/ReceiveOffers";
import GettingStarted from "./GettingStarted";
import "./HostHome.css";

const HostHome = () => {
  return (
    <div className="host-home-container">
      <GettingStarted />

      {/* <div className="rest-container"> */}
      <ReceiveOffers />
      {/* </div> */}
    </div>
  );
};

export default HostHome;
