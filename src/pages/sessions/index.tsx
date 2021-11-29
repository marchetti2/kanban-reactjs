import {
  Box,
  Flex,
  Text,
  Button,
  Spinner,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../../contexts/AuthContext";

import { SignUp } from "../../components/Sessions/SignUp";
import { SignIn } from "../../components/Sessions/SignIn";
import { ForgotPassword } from "../../components/Sessions/ForgotPassword";
import { Footer } from "../../components/Sessions/Footer";

function Sessions(): JSX.Element {
  const { currentPage, setCurrentPage, isLogged, user, logout } = useAuth();
  const router = useRouter();
  const { colorMode } = useColorMode();

  const [isLoading, setLoading] = useState(false);
  const [isLoadingLogout, setLoadingLogout] = useState(false);
  const [username, setUsername] = useState("");

  function handleTogglePage(page: string) {
    setUsername("");
    setCurrentPage(page);
  }

  async function handleNavigate() {
    setLoading(true);
    await router.push("/projects");
  }

  async function handleLogout() {
    setLoadingLogout(true);
    await logout();
    setLoadingLogout(false);
  }

  if (isLogged) {
    return (
      <Flex
        w={{
          base: "350px",
          md: "400px",
          lg: "450px",
        }}
        flexDir="column"
        alignItems="stretch"
        justifyContent="center"
        p="32px 40px"
        m="auto"
        minH="430px"
        h="430px"
      >
        <Heading
          fontSize={["18px", "22px", "24px", "18px", "20px", "22px", "24px"]}
          textAlign="center"
          mb={{
            base: "20px",
            sm: "25px",
            md: "30px",
            lg: "15px",
            xl: "20px",
            "2xl": "25px",
            "4xl": "30px",
          }}
        >
          Bem vindo, {user.name}.
        </Heading>

        <Button
          variant="session"
          pointerEvents={isLoading ? "none" : "auto"}
          onClick={handleNavigate}
          fontSize={["14px", "15px", "16px", "14px", "14px", "15px", "16px"]}
          mb={{
            base: "15px",
            sm: "17.5px",
            md: "20px",
            lg: "12.5px",
            xl: "15px",
            "2xl": "17.5px",
            "4xl": "20px",
          }}
          w="90%"
          mx="auto"
        >
          {isLoading ? <Spinner color="white" /> : "Ir para meus projetos"}
        </Button>
        <Text
          textAlign="center"
          mb={{
            base: "15px",
            sm: "17.5px",
            md: "20px",
            lg: "12.5px",
            xl: "15px",
            "2xl": "17.5px",
            "4xl": "20px",
          }}
        >
          Ou
        </Text>
        <Button
          variant="session-cancel"
          pointerEvents={isLoadingLogout ? "none" : "auto"}
          onClick={handleLogout}
          fontSize={["14px", "15px", "16px", "14px", "14px", "15px", "16px"]}
          w="90%"
          mx="auto"
        >
          {isLoadingLogout ? <Spinner color="white" /> : "Desconectar-se"}
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      w="450px"
      transition=".5s"
      flexDir="column"
      alignItems="stretch"
      justifyContent="space-between"
      p="32px 40px"
      m="auto"
      h={{
        base: currentPage === "forgotPassword" ? "385px" : "495px",
        sm: username || currentPage === "forgotPassword" ? "415px" : "525px",
        md: username || currentPage === "forgotPassword" ? "430px" : "540px",
        lg: username || currentPage === "forgotPassword" ? "385px" : "495px",
        xl: username || currentPage === "forgotPassword" ? "400px" : "510px",
        "2xl": username || currentPage === "forgotPassword" ? "415px" : "525px",
        "4xl": username || currentPage === "forgotPassword" ? "430px" : "540px",
      }}
    >
      <Box as="header">
        <Heading variant="sessions-title">
          {currentPage === "forgotPassword"
            ? "Recuperar senha"
            : currentPage === "signUp"
            ? "Criar sua conta"
            : "Entrar com sua conta"}
        </Heading>
      </Box>

      <Flex
        as="main"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        transition=".5s"
        h={username || currentPage === "forgotPassword" ? "280px" : "360px"}
      >
        {currentPage === "forgotPassword" ? (
          <ForgotPassword />
        ) : currentPage === "signUp" ? (
          <SignUp />
        ) : (
          <SignIn username={username} setUsername={setUsername} />
        )}
      </Flex>

      <Box as="footer">
        <Footer currentPage={currentPage} handleTogglePage={handleTogglePage} />
      </Box>
    </Flex>
  );
}

export default Sessions;
