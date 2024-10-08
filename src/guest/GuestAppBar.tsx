import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toolbar from "../home/components/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import profilePicture from "../utils/images/Foto ritratto corporate_ Headshots Portrait_.jpg";

import "./GuestAppBar.css";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { useUserStore } from "../utils/useUserStore";
import { useFilterStore } from "../utils/useFilterStore";

const pages = ["Properties", "Image Search"];
const settings = ["My Trips", "My Account", "Logout"];

const GuestAppBar = ({
  profilePhoto,
}: {
  profilePhoto: string | undefined;
}) => {
  const navigate = useNavigate();
  const { user, removeUser } = useUserStore();
  const { resetSearchDetails } = useFilterStore();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleLogout = async () => {
    localStorage.removeItem("user");

    removeUser();
    console.log(user?.id);

    navigate("/");
  };

  const handleImageSearch = () => {
    navigate("/image-search");
  };

  const handleAccount = () => {
    navigate("/profile");
  };

  const handleTrip = () => {
    navigate("/my-trips");
  };

  const handleProperties = () => {
    navigate("/properties/all");
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

  function handleClick(): void {
    resetSearchDetails();
    navigate("/");
  }

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
          color: "",
        }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-start",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    switch (page) {
                      case "Properties":
                        handleProperties();
                        break;
                      case "Image Search":
                        handleImageSearch();
                        break;
                      default:
                        handleCloseNavMenu();
                    }
                  }}
                  sx={{
                    color: "white",
                    display: "block",
                    fontFamily: "monospace",
                    fontSize: 16,
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Link
              variant="h6"
              onClick={handleClick}
              sx={{
                cursor: "pointer",
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
              HouseXchange
            </Link>

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
                  {profilePhoto ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={profilePhoto}
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
                  ) : (
                    <CardMedia
                      // component="img"
                      // height="200"
                      // image={profilePicture}
                      // alt="profile picture"
                      sx={{
                        mr: 2,
                        scale: "2",
                        objectFit: "cover",
                        objectPosition: "top",
                        width: "25px",
                        height: "25px",
                        borderRadius: "100%",
                      }}
                    >
                      <AccountCircleIcon />
                    </CardMedia>
                  )}
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
                        case "My Trips":
                          handleTrip();
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
    </div>
  );
};

export default GuestAppBar;
