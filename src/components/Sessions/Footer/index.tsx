import { Button, Box, Text, HStack, Divider } from "@chakra-ui/react";

interface FooterProps {
  currentPage: string;
  handleTogglePage: (page: string) => void;
}

function Footer({ currentPage, handleTogglePage }: FooterProps) {
  return (
    <>
      {currentPage === "signIn" ? (
        <Box>
          <Divider mb="20px" borderColor="#D5D8DE" />
          <HStack w="100%" align="center" justifyContent="center">
            <Button
              variant="link"
              onClick={() => handleTogglePage("forgotPassword")}
            >
              <Text
                fontSize="14px"
                lineHeight="20px"
                textAlign="center"
                transition=".2s"
                _hover={{
                  color:"main.400"
                }}
              >
                Esqueceu a senha?
              </Text>
            </Button>
            <Text>•</Text>
            <Button variant="link" onClick={() => handleTogglePage("signUp")}>
              <Text
                fontSize="14px"
                lineHeight="20px"
                fontWeight="700"
                textAlign="center"
                transition=".2s"
                color="main.400"
                _hover={{
                  color:"main.500"
                }}
              >
                Crie uma conta
              </Text>
            </Button>
          </HStack>
        </Box>
      ) : currentPage === "signUp" ? (
        <Box>
          <Divider mb="20px" borderColor="#D5D8DE" />
          <HStack w="100%" align="center" justifyContent="center">
            <Text
              fontSize="14px"
              lineHeight="20px"
              textAlign="center"
            >
              Já tem uma conta?
            </Text>
            <Button variant="link" onClick={() => handleTogglePage("signIn")}>
              <Text
                fontSize="14px"
                lineHeight="20px"
                fontWeight="700"
                textAlign="center"
                color="main.400"
                _hover={{
                  color:"main.500"
                }}
              >
                Entrar
              </Text>
            </Button>
          </HStack>
        </Box>
      ) : (
        <Box>
          <Divider mb="20px" borderColor="#D5D8DE" />
          <HStack w="100%" align="center" justifyContent="center">
            <Text
              fontSize="14px"
              lineHeight="20px"
              textAlign="center"
            >
              Já tem uma conta?
            </Text>
            <Button variant="link" onClick={() => handleTogglePage("signIn")}>
              <Text
                fontSize="14px"
                lineHeight="20px"
                fontWeight="700"
                textAlign="center"
                color="main.400"
                _hover={{
                  color:"main.500"
                }}
              >
                Entrar
              </Text>
            </Button>
          </HStack>
        </Box>
      )}
    </>
  );
}

export { Footer };
