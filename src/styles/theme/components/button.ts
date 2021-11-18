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
      color: "light.700",
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
        zIndex:1
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
      h: "50px",
      fontWeight: "500",
      w: "100%",
      mb: "20px",
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
    "session-social": {
      h: "50px",
      fontWeight: "400",
      w: "100%",
      bg: "light.100",
      fontSize: "14px",
      lineHeight: "40px",
      textAlign: "center",
      color: "#42526E",
      boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
      borderRadius: "6px",
      _hover: {
        bgColor: "gray.100",
      },
      _active: {
        bgColor: "gray.200",
      },
    },
  },

  defaultProps: {
    font: 'Poppins',
  },
};
