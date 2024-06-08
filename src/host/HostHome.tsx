import GettingStarted from "../home/GettingStarted";
import ReceiveOffers from "../home/ReceiveOffers";
import { useUserStore } from "../utils/useUserStore";

import "./HostHome.css";

const HostHome = () => {
  const { user } = useUserStore();

  return (
    <div className="host-home-container">
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

export default HostHome;
