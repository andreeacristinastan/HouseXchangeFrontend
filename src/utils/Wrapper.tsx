import { Outlet } from "react-router-dom";
import AppBar from "../home/AppBar";
import { useUserStore } from "./useUserStore";
import GuestAppBar from "../guest/GuestAppBar";
import HostAppBar from "../host/HostAppBar";

const Wrapper = () => {
  const { user } = useUserStore();

  const AppBarComponent =
    user?.role === "GUEST"
      ? GuestAppBar
      : user?.role === "HOST"
      ? HostAppBar
      : AppBar;

  return (
    <>
      <AppBarComponent /> {/* Render the AppBar */}
      <Outlet />
    </>
  );
};

export default Wrapper;
