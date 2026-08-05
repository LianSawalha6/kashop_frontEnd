import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useCart from "../../hooks/useCart";
import { useTranslation } from "react-i18next";
import {Button,Badge,Box,IconButton,Link,Toolbar,Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import i18n from "../../i18next";
import useThemeStore from "../../store/useThemeStore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MobileMenu from "../mobileMenu/MobileMenu";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const { t } = useTranslation();
  const changeLanguage = () => {
    const newLng = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLng);
  };

  const { data } = useCart();
  const cartCount = data?.items.length ?? 0;

  const navigate = useNavigate();

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const { mode, toggleMode } = useThemeStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgb(255, 255, 255)",
        borderBottom: "1px solid #E5E5E5",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >

        <Link
          title={t("Home")}
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            fontSize: "24px",
            fontWeight: 700,
            letterSpacing: "-1px",
            color: "#CA8A04",
            transition: "0.2s linear",
            "&:hover": {
              color: "#111111",
            },
            "&:hover span": {
              color: "#CA8A04",
            },
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "-1px",
              color: "#111111",
              transition: "0.2s linear",
            }}
          >
            KA
          </Typography>
          SHOP
        </Link>

        <Box
          sx={{
            display: {xs: "none", sm: "flex"},
            alignItems: "center",
            gap: 3,
          }}
        >
          <Link
            component={RouterLink}
            to="/products"
            underline="none"
            sx={{
              color: "#111",
              fontSize: "14px",
              fontWeight: 500,

              "&:hover": {
                color: "#CA8A04",
              },
            }}
          >{t("Products")}</Link>

          <Button
            onClick={changeLanguage}
            sx={{
              color: "#737373",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,

              "&:hover": {
                color: "#CA8A04",
                background: "transparent",
              },
            }}
          >{i18n.language === "ar" ? "AR" : "EN"}</Button>

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <IconButton
              onClick={toggleMode}
              sx={{
                color: "#111",

                "&:hover": {
                  background: "#F5F5F5",
                },
              }}
            >{mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}</IconButton>

            {token ? (
              <>
                <IconButton
                  title={t("Cart")}
                  component={RouterLink}
                  to="/cart"
                  sx={{
                    color: "#111",

                    "&:hover": {
                      background: "#F5F5F5",
                    },
                  }}
                >
                  <Badge
                    badgeContent={cartCount}
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#CA8A04",
                        color: "#fff",
                        fontSize: "10px",
                      },
                    }}
                  >
                    <ShoppingCartIcon/>
                  </Badge>
                </IconButton>

                <IconButton
                  title={t("Profile")}
                  component={RouterLink}
                  to="/profile"
                  sx={{
                    color: "#111",

                    "&:hover": {
                      color: "#CA8A04",
                    },
                  }}
                >
                  <AccountCircleIcon />
                </IconButton>

                <IconButton
                  title={t("Logout")}
                  component="button"
                  onClick={handleLogout}
                  sx={{
                    color: "#111",

                    "&:hover": {
                      color: "#CA8A04",
                    },
                  }}
                >
                  <LogoutIcon
                    sx={{
                      transform:
                        i18n.language === "ar" ? "rotate(180deg)" : "none",
                    }}
                  />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  title={t("Login")}
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: "#111",

                    "&:hover": {
                      color: "#CA8A04",
                    },
                  }}
                >
                  <LoginIcon />
                </IconButton>
                
                <IconButton
                  title={t("Register")}
                  component={RouterLink}
                  to="/register"
                  sx={{
                    color: "#111",

                    "&:hover": {
                      color: "#CA8A04",
                    },
                  }}
                >
                  <PersonAddIcon />
                </IconButton>
                
              </>
            )}
          </Box>
        </Box>

        <IconButton
          onClick={handleMenuClick}
          sx={{
            display: {xs: "flex",sm: "none",},
            color: "#111",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <MobileMenu
        anchorEl={anchorEl}
        open={open}
        handleMenuClose={handleMenuClose}
      />
    </Box>
  );
}