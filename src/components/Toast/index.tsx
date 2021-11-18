/* eslint-disable react/display-name */
import { Text, Heading, Flex, Button, HStack, Box } from "@chakra-ui/react";
import { UseToastOptions } from "@chakra-ui/react";

// SUCCESS

const toastUserCreated = (): UseToastOptions => ({
  position: "top-right",
  duration: 2500,
  render: () => (
    <Flex
      h="80px"
      w="320px"
      bg="success.500"
      boxShadow="base"
      borderRadius="6px"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      p="20px"
    >
      <Heading 
      color="white" 
      mb="5px"
      >
        Usuario criado com sucesso!
      </Heading>
      <Text color="gray.50" opacity=".9"> Entre com o seu email e senha criado.</Text>
    </Flex>
  ),
});

const toastUserUpdated = (): UseToastOptions => ({
  position: "top-right",
  duration: 2500,
  render: () => (
    <Flex
    h="80px"
    w="320px"
    bg="success.500"
    boxShadow="base"
    borderRadius="6px"
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    p="20px"
    >
      <Heading 
      color="white" 
      mb="5px"
      >
        Perfil atualizado com sucesso!
      </Heading>
    </Flex>
  ),
});

const toastRecoverEmailSended = (): UseToastOptions => ({
  position: "top-right",
  duration: 2500,
  render: () => (
    <Flex
    h="80px"
    w="320px"
    bg="success.500"
    boxShadow="base"
    borderRadius="6px"
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    p="20px"
    >
      <Heading 
      color="white" 
      mb="5px"
      >
        Email de recuperação enviado!
      </Heading>
      <Text color="gray.50" opacity=".9" textAlign="center">
        Entre no seu email para recuperar sua senha.
      </Text>
    </Flex>
  ),
});

//ERROR

const toastUserAlreadyExists = (
  setCurrentPage: (page: string) => void
): UseToastOptions => ({
  position: "top-right",
  duration: 4000,
  render: () => (
    <Flex
    h="80px"
    w="320px"
    bg="error.500"
    boxShadow="base"
    borderRadius="6px"
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    p="20px"
    >
      <Heading 
      color="white" 
      mb="5px"
      >
        Usuario existente!
      </Heading>
      <HStack>
        <Text color="gray.50" opacity=".9" textAlign="center">
          <Button
            variant="link"
            onClick={() => setCurrentPage("forgotPassword")}
            fontWeight="500px" 
            color="white"
            textDecoration="underline"
            _hover={{
              textDecoration:"underline"
            }}
          >
            Recupere sua senha
          </Button>{" "}
          ou escolha um email diferente.
        </Text>
      </HStack>
    </Flex>
  ),
});

const toastInvalidCredentials = (
  setCurrentPage: (page: string) => void
): UseToastOptions => ({
  position: "top-right",
  duration: 4000,
  render: () => (
    <Flex
      h="80px"
      w="320px"
      bg="error.500"
      boxShadow="base"
      borderRadius="6px"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      p="20px"
    >
      <Heading 
      color="white" 
      mb="5px"
      >
        Usuario ou senha invalidos!
      </Heading>
      <HStack>
        <Text color="gray.50" opacity=".7">Esqueceu a senha?</Text>
        <Button variant="link" onClick={() => setCurrentPage("forgotPassword")}>
          <Text
            fontWeight="500px"
            color="white"
            opacity=".9"
            _hover={{
              textDecoration: "underline",
            }}
          >
            Recuperar.
          </Text>
        </Button>
      </HStack>
    </Flex>
  ),
});

const ToastServerError = (): UseToastOptions => ({
  position: "top-right",
  duration: 3000,
  render: () => (
    <Flex
    h="80px"
    w="320px"
    bg="error.500"
    boxShadow="base"
    borderRadius="6px"
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    p="20px"
    >
      <Heading 
      color="white" 
      mb="5px"
      >
        Erro ao tentar entrar
      </Heading>
      <HStack>
        <Text  color="gray.50" opacity=".7">Tente novamente mais tarde</Text>
      </HStack>
    </Flex>
  ),
});

const ToastEmailDoesNotExist = (
  setCurrentPage: (page: string) => void
): UseToastOptions => ({
  position: "top-right",
  duration: 3000,
  render: () => (
    <Flex
    h="80px"
    w="320px"
    bg="error.500"
    boxShadow="base"
    borderRadius="6px"
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    p="20px"
    >
      <Heading 
      color="white" 
      mb="5px"
      >
        E-mail não encontrado!
      </Heading>
      <HStack>
        <Text color="gray.50" opacity=".7" textAlign="center">
          Verifique se o e-mail foi digitado corretamente ou{" "}
          <Button variant="link" onClick={() => setCurrentPage("signUp")}>
            <Text
              fontWeight="500px" color="white"
              opacity=".9"
              _hover={{
                textDecoration: "underline",
              }}
            >
              cadastre-se
            </Text>
          </Button>
        </Text>
      </HStack>
    </Flex>
  ),
});

export {
  toastUserCreated,
  toastInvalidCredentials,
  toastUserAlreadyExists,
  ToastServerError,
  toastRecoverEmailSended,
  ToastEmailDoesNotExist,
  toastUserUpdated
};
