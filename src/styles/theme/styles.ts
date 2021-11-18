import { StyleOptionsDTO } from "./StyleOptionsDTO";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  global: (props: StyleOptionsDTO) => ({
    body: {
      boxSizing: "border-box",
      margin: "0",
      padding: "0",
      bg: props.colorMode === "dark" ? "dark.100" : "light.100",
    },
    button: {
      cursor: "pointer",
    },
    a: {
      color: "inherit",
      textDecoration: "none",
      _hover: {
        textDecoration: "none",
      },
    },
  }),
};
