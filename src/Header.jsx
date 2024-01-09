import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { CssBaseline } from "@mui/material";

const pages = [
  { name: "Home", page: "/" },
  { name: "Booking", page: "/booking" },
  { name: "Feedback", page: "/review" }
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const settings = ["Dashboard", "Logout"];
  
  const {
    state: { user },
    logout,
  } = useContext(AuthContext);
  const isLoggedIn = user !== null;
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const colorStyle = {
    backgroundColor: "#506081",
  };

  const handleSettingsClick = (setting) => {
    if (setting === "Logout") {
      logout();
      setTimeout(() => {
        navigate("loginpage");
      }, 1000);

      setIsLoggedIn(false);
    } else if (setting === "Login") {
      setIsLoggedIn(true);
    } else if (setting === "Dashboard") {
      navigate("dashboard");
    }
    handleCloseUserMenu();
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" style={{ margin: 0 }}>
        <Container maxWidth="xxl" style={colorStyle}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#A3B8CB",
                textDecoration: "none",
                fontSize: "1.5rem",
              }}
            >
              Healthcare AB
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {isLoggedIn && (
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
              )}
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
                {isLoggedIn &&
                  pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Link to={page.page}>
                        <Typography textAlign="center">{page.name}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>

            <Typography
              variant="h7"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 8,
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#A3B8CB",
                textDecoration: "none",
              }}
            >
              Healthcare AB
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  key={page.name}
                  to={page.page}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    onClick={handleCloseNavMenu}
                    variant="h8"
                    component="div"
                    sx={{
                      color: "white",
                      mr: 2,
                      transition: "text-decoration 0.1s ease-in-out, color 0.1s ease-in-out",
                      transitionDelay: "0.1s",
                      "&:hover": {
                        color: "#A3B8CB",
                      },
                    }}
                  >
                    {page.name}
                  </Typography>
                </Link>
              ))}
            </Box>

            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.username}
                      src="/static/images/avatar/2.jpg"
                      sx={{
                        backgroundColor: "#CAD7E3",
                        color: "#506081",
                        padding: "5px",
                      }}
                    >
                      {user.username && user.username.charAt(0).toUpperCase()}
                    </Avatar>
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
                      onClick={() => handleSettingsClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <div className="flex gap-5">
                <div>
                  <a
                    href="/loginpage"
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      color: "black",
                      backgroundColor: "#A3B8CB",
                      transition: "background-color 0.3s",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Login
                  </a>
                </div>
                <div>
                  <a
                    href="/register"
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      color: "black",
                      backgroundColor: "#A3B8CB",
                      transition: "background-color 0.3s",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Register
                  </a>
                </div>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default NavBar;
