import { extendTheme } from "@chakra-ui/react";

import Heading from "./components/heading";
import Text from "./components/text";
import Link from "./components/link";
import Button from "./components/button";

import styles from "./styles";

import colors from "./foundations/colors";
import fonts from "./foundations/fonts";
import breakpoints from "./foundations/breakpoints";
import config from "./foundations/themeConfig";

const theme = extendTheme({
  colors,
  fonts,
  components: {
    Heading,
    Text,
    Link,
    Button,
  },
  styles,
  breakpoints,
  config,
});

export { theme };

/*
  xs: "0.75rem"    =>  12px
  sm: "0.875rem"    =>  14px
  md: "1rem"    =>  16px
  lg: "1.125rem"    =>  18px
  xl: "1.25rem"    =>  20px
  "2xl": "1.5rem"    =>  24px
  "3xl": "1.875rem"    =>  30px
  "4xl": "2.25rem"    =>  36px
  "5xl": "3rem"    =>  48px
  "6xl": "3.75rem"    =>  60px
  "7xl": "4.5rem"    =>  72px
  "8xl": "6rem"    =>  96px
  "9xl": "8rem"    =>  128px
*/
