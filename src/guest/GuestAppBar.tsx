import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toolbar from "../home/components/Toolbar";
import { useUserStore } from "../App";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircle from "@mui/icons-material/AccountCircle";
import profilePicture from "../utils/images/Foto ritratto corporate_ Headshots Portrait_.jpg";

import "./GuestAppBar.css";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["My Trips", "My Account", "Logout"];

const GuestAppBar = () => {
  const navigate = useNavigate();
  const { removeUser } = useUserStore();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleLogout = () => {
    localStorage.removeItem("user");

    removeUser();

    navigate("/");
  };

  const handleAccount = () => {
    navigate("/profile");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#588b97",
          boxShadow: "0px 2px 5px 2px rgba(255, 255, 255, .3)",
          // fontFamily: '"Spicy Rice", cursive',
          color: "",
        }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            {/* <Box sx={{ flex: 1 }} /> */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-start",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    // my: 2,
                    color: "white",
                    display: "block",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Link
              variant="h6"
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                marginLeft: "-150px",
                fontWeight: 700,
                fontSize: 25,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HousExchange
            </Link>
            {/* for xs mode */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      fontFamily: "monospace",
                      color: "#588b97",
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HousExchange
            </Typography>

            {/* user Bar */}
            <Box>
              <Tooltip title="Open settings">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="inherit"
                  sx={{ p: 0 }}
                >
                  {/* <AccountCircle sx={{ scale: "1.8" }} /> */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={profilePicture}
                    alt="profile picture"
                    sx={{
                      mr: 2,
                      scale: "2",
                      objectFit: "cover",
                      objectPosition: "top",
                      width: "25px",
                      height: "25px",
                      borderRadius: "100%",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      switch (setting) {
                        case "Logout":
                          handleLogout();
                          break;
                        case "My Account":
                          handleAccount();
                          break;
                        default:
                          handleCloseUserMenu();
                      }
                    }}
                    sx={{
                      fontFamily: "monospace",
                      color: "#588b97",
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* <Bar position="fixed">
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
      <Toolbar /> */}
    </div>
  );
};

export default GuestAppBar;
