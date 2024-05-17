import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Bar from "../home/components/Bar";
import Toolbar from "../home/components/Toolbar";
import { useUserStore } from "../App";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};
const GuestAppBar = () => {
  const { removeUser } = useUserStore();
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      ></link>

      <Bar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 40, fontFamily: '"Oswald", sans-serif' }}
          >
            {"HousExchange"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/"
              sx={{
                rightLink,
                fontSize: 25,
                fontFamily: '"Oswald", sans-serif',
              }}
              onClick={() => {
                localStorage.removeItem("user");
                removeUser();
              }}
            >
              {"Log Out"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/register"
              sx={{
                ...rightLink,
                fontSize: 25,
                fontFamily: '"Oswald", sans-serif',
              }}
            >
              {"Create an account"}
            </Link>
          </Box>
        </Toolbar>
      </Bar>
      <Toolbar />
    </div>
  );
};

export default GuestAppBar;
