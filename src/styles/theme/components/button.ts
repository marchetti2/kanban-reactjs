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
    filter: ({ colorMode }: StyleOptionsDTO) => ({
      bg: colorMode === "dark" ? "dark.200" : "none",
      fontWeight:"400",
      fontSize:"14px",
      color: colorMode === "dark" ? "white" : "gray.700",
      transition:".2s",
      _hover:{
        bg: colorMode === "dark" ? "rgba(153, 153, 153,0.25)" : "gray.100",
      },
      _active:{
        color: "white",
        bgColor: colorMode === "dark" ? "main.300" : "main.400", 
      },
    }),
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

    'aside': ({ colorMode }: StyleOptionsDTO) => ({
      w:"190px",
      h:"40px",
      color:colorMode === "dark" ? "dark.600" : "gray.600",
      borderRadius:"6px",
      _selected:{ bg: colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.200" },
      _focus:{
        outline: "none",
        boxShadow: "none",
      },
      _hover:{
        bg: colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.200",
        color: colorMode === "dark" ? "main.300" : "main.500", 
      },
      justifyContent:"space-between",
      alignItems:"center",
    }),

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
      textAlign: "center",
      color: "#42526E",
      boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
      borderRadius: "6px",
      _hover: {
        bg:
          colorMode === "dark"
            ? "rgba(31, 33, 39, .9)"
            : "rgba(226,232,240,.2)",
      },
      _active: {
        bgColor: colorMode === "dark" ? "rgba(153, 153, 153,0.2)" : "gray.100",
      },
    }),


    "modal-cancel": ({ colorMode }: StyleOptionsDTO) => ({
      bg:colorMode === "dark" ? "dark.200" : "gray.100",//"gray.100",
      color:colorMode === "dark" ? "dark.600" : "gray.700",//"gray.700",
      fontWeight:"400",
      transition:".2s",
      _hover: {
        bg:
          colorMode === "dark"
            ?  "rgba(153, 153, 153,0.175)"
            : "rgba(226,232,240,.8)",
      },
      _active: {
        bgColor: colorMode === "dark" ? "rgba(153, 153, 153,0.3)" : "gray.200",
      },
    }),
    "modal-submit": {
      bg:"main.300",
      fontWeight:"400",
      color:"white",
      transition:".2s",
      _hover:{
        bg: "main.400",
      },
      _active:{
        bgColor: "main.500",
      },
    },

    "modal-confirm-logout": {
      bgColor:"red.300",
      fontWeight:"400",
      _hover:{
        bgColor: "red.400",
      },
      _active:{
        bgColor: "red.500",
      },
      color:"white",
      transition:".2s",
    },
  },
  defaultProps: {
    font: "Poppins",
  },
};
