import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Bar from "./components/Bar";
import Toolbar from "./components/Toolbar";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

const AppBar = ({ profilePhoto }: { profilePhoto: string | undefined }) => {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />

      <Bar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{
              fontSize: 25,
              fontFamily: "monospace, cursive",
              // marginLeft: "-150px",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              // letterSpacing: ".3rem",
            }}
          >
            {"HousExchange"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/login"
              sx={{
                rightLink,
                fontSize: 25,
                fontFamily: "monospace, cursive",
              }}
            >
              {"Sign In"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/register"
              sx={{
                ...rightLink,
                fontSize: 25,
                fontFamily: "monospace",
              }}
            >
              {"Register"}
            </Link>
          </Box>
        </Toolbar>
      </Bar>
      <Toolbar />
    </div>
  );
};

export default AppBar;
