/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  baseStyle: {
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "500",
    color: "light.700",
  },
  variants: {
    "13px-500-light600-upper": {
      fontSize:"13px",
      lineHeight:"15px",
      color:"light.600",
      textTransform:"uppercase"
    },
    "15px-400-light800": {
      fontSize:"15px",
      lineHeight:"21px",
      fontWeight:"400",
      color:"light.800"
    },
    "15px-500": {
      fontSize: "15px",
      lineHeight:"18px",
    },
    "21px-500-light800": {
      fontSize:"21px",
      lineHeight:"25px",
      color:"light.800"
    },
    "24px-500-light800": {
      fontSize:"24px",
      lineHeight:"29px",
      color:"light.800"
    },
  },
  defaultProps: {
    variant: "15px-500",
  },
};
