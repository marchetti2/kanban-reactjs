import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "../contexts/AuthContext";
import { ProjectsProvider } from "../contexts/ProjectsContext";

import { theme } from "../styles/theme";
import { NotificationsProvider } from "../contexts/NotificationsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <NotificationsProvider>
        <AuthProvider>
          <ProjectsProvider>
            <Component {...pageProps} />
          </ProjectsProvider>
        </AuthProvider>
      </NotificationsProvider>
    </ChakraProvider>
  );
}
export default MyApp;
