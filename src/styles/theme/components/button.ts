import { StyleOptionsDTO } from "../StyleOptionsDTO";
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  variants: {
    "aside-menu": {
      fontSize: "14px",
      fontWeight: "400",
      bg: "light.300",
      w: "190px",
      h: "40px",
      color: "light.600",
    },
    filter: {
      fontSize: "14px",
      lineHeight: "14px",
      fontWeight: "400",
      color: "light.700",
      bg: "none",
      _hover: {
        bg: "light.300",
      },
      _active: {
        bg: "rgba(207, 102, 121, 0.15)",
        color: "main.400",
      },
    },
    link: {
      fontSize: "14px",
      lineHeight: "14px",
      fontWeight: "500",
      color: "gray.600",
      _hover: {
        textDecoration: "none",
      },
      _focus: {
        outline: "none",
        boxShadow: "none",
      },
    },
    avatar: {
      transition: "transform .3s , border .2s",
      bgColor: "light.100",
      _hover: {
        transform: "translateY(-5px)",
        bgColor: "main.400",
        zIndex: 1,
      },
      _active: {
        bg: "main.400",
      },
      _focus: {
        outline: "none",
        boxShadow: "none",
      },
    },

    session: {
      height: {
        base: "42.5px",
        sm: "45px",
        md: "47.5px",
        lg: "42.5px",
        xl: "45px",
        "2xl": "47.5px",
        "4xl": "50px",
      },
      fontWeight: "500",
      w: "100%",
      bg: "main.300",
      color: "#fff",
      transition: ".2s",
      _hover: {
        bg: "main.400",
      },
      _active: {
        bgColor: "main.500",
      },
    },

    'create-project': {
      height: '40px',
      fontWeight: "500",
      w: "100%",
      bg: "main.300",
      color: "#fff",
      transition: ".2s",
      _hover: {
        bg: "main.400",
      },
      _active: {
        bgColor: "main.500",
      },
    },

    "session-cancel": ({ colorMode }: StyleOptionsDTO) => ({
      height: {
        base: "42.5px",
        sm: "45px",
        md: "47.5px",
        lg: "42.5px",
        xl: "45px",
        "2xl": "47.5px",
        "4xl": "50px",
      },
      w: "100%",
      bg: colorMode === "dark" ? "dark.200" : "gray.100",
      color: colorMode === "dark" ? "dark.600" : "gray.600",
      fontWeight: "400",
      transition: ".2s",
      _hover: {
        bg:
          colorMode === "dark"
            ? "rgba(31, 33, 39, .9)"
            : "rgba(226,232,240,.8)",
      },
      _active: {
        bgColor: colorMode === "dark" ? "rgba(31, 33, 39, .6)" : "gray.200",
      },
    }),

    "session-social": ({ colorMode }: StyleOptionsDTO) => ({
      h: {
        base: "42.5px",
        sm: "45px",
        md: "47.5px",
        lg: "42.5px",
        xl: "45px",
        "2xl": "47.5px",
        "4xl": "50px",
      },
      fontWeight: "400",
      w: "100%",
      bg: colorMode === "dark" ? "dark.200" : "gray.100",
      //fontSize: ["12px", "13px", "14px", "12px", "13px", "14px", "14px"],
      //lineHeight: "40px",
      textAlign: "center",
      color: "#42526E",
      boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
      borderRadius: "6px",
      // _hover: {
      //   bg:
      //     colorMode === "dark"
      //       ? "rgba(31, 33, 39, .9)"
      //       : "rgba(226,232,240,.8)",
      // },
      // _active: {
      //   bgColor: colorMode === "dark" ? "rgba(31, 33, 39, .6)" : "gray.200",
      // },
    }),
  },
  defaultProps: {
    font: "Poppins",
  },
};
