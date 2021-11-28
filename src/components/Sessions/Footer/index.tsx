import {
  Button,
  Box,
  Text,
  HStack,
  Divider,
  useColorMode,
} from "@chakra-ui/react";

interface FooterProps {
  currentPage: string;
  handleTogglePage: (page: string) => void;
}

function Footer({ currentPage, handleTogglePage }: FooterProps) {
  const { colorMode } = useColorMode();

  return (
    <>
      {currentPage === "signIn" ? (
        <Box>
          <Divider
            mb="20px"
            borderColor={colorMode === "dark" ? "dark.500" : "gray.200"}
          />
          <HStack w="100%" align="center" justifyContent="center">
            <Button
              variant="link"
              onClick={() => handleTogglePage("forgotPassword")}
            >
              <Text
                variant="sessions-footer"
                transition=".2s"
                _hover={{
                  color: colorMode === "dark" ? "main.300" : "main.400",
                }}
              >
                Esqueceu a senha?
              </Text>
            </Button>
            <Text>•</Text>
            <Button variant="link" onClick={() => handleTogglePage("signUp")}>
              <Text
                variant="sessions-footer"
                fontWeight="700"
                transition=".2s"
                color={colorMode === "dark" ? "main.300" : "main.400"}
                _hover={{
                  color: colorMode === "dark" ? "main.400" : "main.500",
                }}
              >
                Crie uma conta
              </Text>
            </Button>
          </HStack>
        </Box>
      ) : currentPage === "signUp" ? (
        <Box>
          <Divider
            mb="20px"
            borderColor={colorMode === "dark" ? "dark.500" : "gray.200"}
          />
          <HStack w="100%" align="center" justifyContent="center">
            <Text variant="sessions-footer">Já tem uma conta?</Text>
            <Button variant="link" onClick={() => handleTogglePage("signIn")}>
              <Text
                variant="sessions-footer"
                fontWeight="700"
                color={colorMode === "dark" ? "main.300" : "main.400"}
                _hover={{
                  color: colorMode === "dark" ? "main.400" : "main.500",
                }}
              >
                Entrar
              </Text>
            </Button>
          </HStack>
        </Box>
      ) : (
        <Box>
          <Divider
            mb="20px"
            borderColor={colorMode === "dark" ? "dark.500" : "gray.200"}
          />
          <HStack w="100%" align="center" justifyContent="center">
            <Text variant="sessions-footer">Já tem uma conta?</Text>
            <Button variant="link" onClick={() => handleTogglePage("signIn")}>
              <Text
                variant="sessions-footer"
                fontWeight="700"
                color={colorMode === "dark" ? "main.300" : "main.400"}
                _hover={{
                  color: colorMode === "dark" ? "main.400" : "main.500",
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
