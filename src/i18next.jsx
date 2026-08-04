import React from "react";
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector"

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Home": "Home",
          "Login":"Login",
          "Register":"Register",
          "Cart":"Cart",
          "Categories":"Categories",
          "Products":"Products",
          "Logout":"Logout"
        }
      },
      ar:{
        translation:{
          "Home": "الرئيسية",
          "Login":"تسجيل الدخول",
          "Register":"انشاء حساب",
          "Cart":"السلة",
          "Categories":"الاصناف",
          "Products":"المنتجات",
          "Logout":"تسجيل خروج"
        }
      }
    },
    fallbackLng: "en",

  });

  export default i18n