/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  baseStyle: {
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "400",
    color: "gray.500",
  },
  variants: {
    "13px-400": {
      fontSize: "13px",
      lineHeight: "16px",
    },
    "14px-400": {
      fontSize: "14px",
      lineHeight: "18px",
    },
    "14px-400-main400": {
      fontSize: "14px",
      color: "main.400",
    },
    "14px-400-light800": {
      fontSize: '14px',
      lineHeight: '20px',
      textAlign: 'center',
      color: '#172B4D'
    },
    "14px-500-light100": {
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "left",
      textTransform: "uppercase",
      color: "light.100",
    },
    "14px-400-light700": {
      fontSize: "14px",
      color: "light.700",
      lineHeight: "14px",
    },
    "15px-400": {
      fontSize: "15px",
      lineHeight: "18px",
    },
    "16px-500": {
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "18px",
      textAlign: "center",
    },
    "18px-500": {
      fontSize: "18px",
      fontWeight: "500",
      lineHeight: "18px",
      textAlign: "center",
      color: "gray.800"
    },
  },
  defaultProps: {
    variant: "14px-400",
  },
};




