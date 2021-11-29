import { StyleOptionsDTO } from "../StyleOptionsDTO";
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  baseStyle: ({ colorMode }: StyleOptionsDTO) => ({
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    color: colorMode === "dark" ? "white" : "gray.700",
  }),
  variants: {
    "index-page-title": {
      fontSize: ["28px", "36px", "40px", "28px", "32px", "36px", "40px"],
      lineHeight: ["42px", "54px", "60px", "42px", "48px", "54px", "60px"],
      fontWeight: "600",
      color: "white",
      textAlign: {
        base: "center",
        md: "left",
        lg: "center",
        "2xl": "left",
      },
    },
    "kanban-board-status": ({ colorMode }: StyleOptionsDTO) => ({
      fontSize: "13px",
      lineHeight: "15px",
      color: colorMode === "dark" ? "dark.800" : "gray.500",
      textTransform: "uppercase",
    }),
    "modal-title": {
      fontSize: "21px",
      lineHeight: "25px",
      color: "gray.700",
    },
    "notifications-title": {
      fontSize: "16px",
      lineHeight: "18px",
      textAlign: "center",
    },
    "sessions-title": {
      fontSize: ["14px", "16px", "18px", "14px", "15px", "16px", "18px"],
      lineHeight: ["14px", "18px", "18px", "14px", "18px", "18px", "18px"],
      textAlign: "center",
    },
    "project-responsive-title": ({ colorMode }: StyleOptionsDTO) => ({
      fontSize:"24px",
      textAlign:"center",
      color:colorMode === "dark" ? "white" : "gray.700",
      fontWeight:"500",
    }),

    default: {
      fontSize: "15px",
    },
  },
  defaultProps: {
    variant: "default",
  },
};
