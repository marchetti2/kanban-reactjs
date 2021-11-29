import { StyleOptionsDTO } from "../StyleOptionsDTO";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  baseStyle: ({ colorMode }: StyleOptionsDTO) => ({
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    color: colorMode === "dark" ? "dark.600" : "gray.500",
  }),
  variants: {
    "sidebar-button-text": {
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "left",
      textTransform: "uppercase",
      color: "white",
    },
    "index-page-subtitle": ({ colorMode }: StyleOptionsDTO) => ({
      fontSize: ["14px", "16px", "18px", "14px", "15px", "16px", "18px"],
      lineHeight: ["21px", "24px", "27px", "21px", "22.5px", "24px", "27px"],
      fontWeight: "400",
      textAlign: {
        base: "center",
        md: "left",
        lg: "center",
        "2xl": "left",
      },
      color: colorMode === "dark" ? "dark.600" : "gray.200",
    }),
    "index-page-button-text": ({ colorMode }: StyleOptionsDTO) => ({
      fontSize: ["14px", "15px", "18px", "14px", "16px", "18px", "20px"],
      lineHeight: ["21px", "22.5px", "27px", "21px", "24px", "27px", "30px"],
      fontWeight: "700",
      color: colorMode === "dark" ? "main.300" : "main.500",
    }),
    "sessions-footer": {
      fontSize: ["12px", "13px", "14px", "12px", "13px", "14px", "14px"],
      lineHeight: "20px",
      textAlign: "center",
    },
    "breadcrumb": {
      fontSize:"15px",
      fontFamily:"Inter"
    },
    default: {
      fontSize: "14px",
      lineHeight: "18px",
    },
  },
  defaultProps: {
    variant: "default",
  },
};

/*

 ({ colorMode }) => ({
      bg: colorMode === "dark" ? "green.300" : "green.500",
      color: colorMode === "dark" ? "gray.800" : "white",
      textTransform: "uppercase",
      fontWeight: "semibold",
      letterSpacing: "0.02em",
      padding: "4px",
      borderRadius: "2px",
      fontSize: "12px",
    }),

*/
