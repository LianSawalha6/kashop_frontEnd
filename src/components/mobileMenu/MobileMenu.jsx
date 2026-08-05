import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useCart from "../../hooks/useCart";
import { useTranslation } from "react-i18next";
import {Menu,MenuItem,Divider, Badge,} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import i18n from '../../i18next'
import useThemeStore from '../../store/useThemeStore'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import StorefrontIcon from '@mui/icons-material/Storefront';
import LanguageIcon from '@mui/icons-material/Language';



const MobileMenu = ({anchorEl,open,handleMenuClose}) => {
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
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      onClick={handleMenuClose}
      transformOrigin={{horizontal: "right",vertical: "top"}}
      anchorOrigin={{horizontal: "right",vertical: "bottom",}}
      slotProps={{
        // paper: {
        //   sx: {
        //     mt: 1,
        //     minWidth: 200,
        //     borderRadius: "12px",
        //     border: "1px solid #E5E5E5",
        //     boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        //   },
        // },
        paper: {
            elevation: 0,
            sx: {
              borderRadius: "12px",
              border: "1px solid #E5E5E5",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              mt: 1.5,
              minWidth: 200,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
      }}
    >
      <MenuItem component={RouterLink} to="/products"
      sx={{
              display:"flex",
              gap:3
            }}
      >
        <StorefrontIcon/>
        {t("Products")}
      </MenuItem>

      {token ? (
        <>
          <MenuItem component={RouterLink} to="/cart"
            sx={{
              display:"flex",
              gap:3
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
            {t("Cart")}
          </MenuItem>

          <MenuItem component={RouterLink} to="/profile"
          sx={{
              display:"flex",
              gap:3
            }}
            >
              <AccountCircleIcon />
            {t("Profile")}
          </MenuItem>

          <Divider />

          <MenuItem
           onClick={handleLogout}
           sx={{
              display:"flex",
              gap:3
            }}
           >
          <LogoutIcon
                    sx={{
                      transform:
                        i18n.language === "ar" ? "rotate(180deg)" : "none",
                    }}
                  />
          {t("Logout")}
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem component={RouterLink} to="/login"
          sx={{
              display:"flex",
              gap:3
            }}
          >
            <LoginIcon/>
            {t("Login")}
          </MenuItem>

          <MenuItem component={RouterLink} to="/register"
          sx={{
              display:"flex",
              gap:3
            }}
          >
            <PersonAddIcon/>
            {t("Register")}
          </MenuItem>
        </>
      )}

      <Divider />

      <MenuItem onClick={changeLanguage}
      sx={{
              display:"flex",
              gap:3
            }}
      >
        <LanguageIcon/>
        {i18n.language === "ar" ? "English" : "العربية"}
      </MenuItem>

      <MenuItem onClick={toggleMode}
      sx={{
              display:"flex",
              gap:3
            }}
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        {mode === "light" ? "Dark Mode" : "Light Mode"}
      </MenuItem>
    </Menu>
  );
}

export default MobileMenu