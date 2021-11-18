import { Box, Flex, Text, Button, Spinner, Heading } from "@chakra-ui/react";
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
          w="450px"
          transition=".5s"
          flexDir="column"
          alignItems="stretch"
          justifyContent="center"
          p="32px 40px"
          m="auto"
          minH="430px"
          h="430px"
        >
          <Heading
            fontSize="24px"
            color="gray.700"
            mb="30px"
            textAlign="center"
          >
            Bem vindo, {user.name}.
          </Heading>

          <Button
            variant="session"
            pointerEvents={isLoading ? "none" : "auto"}
            onClick={handleNavigate}
          >
            {isLoading ? <Spinner color="white" /> : "Ir para meus projetos"}
          </Button>
          <Text textAlign="center" mb="20px">
            Ou
          </Text>
          <Button
            h="50px"
            bg="gray.200"
            color="gray.700"
            fontWeight="400"
            pointerEvents={isLoadingLogout ? "none" : "auto"}
            onClick={handleLogout}
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
        minH={username || currentPage === "forgotPassword" ? "430px" : "540px"}
        h={username || currentPage === "forgotPassword" ? "430px" : "540px"}
      >
        <Box as="header">
          <Text variant="18px-500">
            {currentPage === "forgotPassword"
              ? "Recuperar senha"
              : currentPage === "signUp"
              ? "Criar sua conta"
              : "Entrar com sua conta"}
          </Text>
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
          <Footer
            currentPage={currentPage}
            handleTogglePage={handleTogglePage}
          />
        </Box>
      </Flex>

  );
}

export default Sessions;
