import { Theme } from "@chakra-ui/react";

export interface StyleOptionsDTO {
  theme: Theme;
  colorMode: "light" | "dark";
  colorScheme: string;
}
