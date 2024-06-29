// import { useNavigate } from 'react-router-dom';
import Categories from "./Categories";
import GettingStarted from "./GettingStarted";
import ReceiveOffers from "./ReceiveOffers";
import "./HomePage.css";
import GoogleMaps from "../utils/GoogleMaps";

export default function HomePage() {
  // const navigate = useNavigate();

  // const goToPage = (path: string) => {
  //   navigate(path);
  // };
  return (
    <div className="home-page-container">
      {/* <h1>Welcome to the Home Page!</h1>
      <button onClick={() => goToPage('/login')}>Log In</button>
      <button onClick={() => goToPage('/register')}>Sign Up</button> */}
      <GettingStarted
        signedIn={false}
        messages={[
          "Embrace the warmth of hospitality in every destination",
          "Enjoy us and discover your desired home",
        ]}
      />

      <Categories />
      {/* <ReceiveOffers /> */}
    </div>
  );
}
