import {
  Flex,
  Heading,
  Text,
  Box,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

import Sessions from "./sessions";

function App(): JSX.Element {
  const { colorMode } = useColorMode();
  const bgColorMode = useColorModeValue("main.500", "dark.100");

  return (
    <Flex
      height={{
        base: "auto",
        md: "100vh",
      }}
      width="100vw"
      overflow={{
        base: "auto",
        sm: "hidden",
      }}
      flexDirection={{
        base: "column",
        lg: "row",
      }}
    >
      <Flex
        height="100%"
        minH={{
          base: "100vh",
          md: "100%",
        }}
        width={{
          base: "100%",
          lg: "55%",
        }}
        bgColor={bgColorMode}
        boxShadow={{
          base: "base",
          lg: "lg",
        }}
        paddingX={{
          base: "20px",
          sm: "40px",
        }}
      >
        <Flex
          m="auto"
          maxW="630px"
          h="540px"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Box
              mb={{
                base: "20px",
                sm: "0",
                lg: "20px",
                "2xl": "0",
              }}
            >
              <Heading variant="index-page-title">
                Gerencie seus projetos em um único lugar.
              </Heading>
            </Box>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexDirection={{
                base: "column-reverse",
                sm: "row",
                lg: "column-reverse",
                "2xl": "row",
              }}
            >
              <Flex
                flexDirection="column"
                h="100%"
                w="300px"
                pr={{
                  base: "0",
                  sm: "15px",
                  "2xl": "0",
                }}
              >
                <Text
                  variant="index-page-subtitle"
                  width="100%"
                  m={{
                    base: "24px auto 34px auto",
                    "4xl": "0 auto 44px auto",
                  }}
                >
                  Tenha controle total sobre projetos, finanças, produtividade,
                  arquivos, mídias e clientes. Tudo isso em tempo real!
                </Text>
                <Link href="#sessions" passHref>
                  <Flex
                    height={{
                      base: "40px",
                      sm: "42.5px",
                      md: "45px",
                      lg: "40px",
                      xl: "42.5px",
                      "2xl": "45px",
                      "4xl": "50px",
                    }}
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="6px"
                    bg={colorMode === "light" ? "white" : "dark.300"}
                    transition=".3s"
                    _active={{
                      bg: {
                        base: "gray.200",
                        lg: "white",
                      },
                    }}
                  >
                    <Text variant="index-page-button-text">
                      Crie sua conta gratis
                    </Text>
                  </Flex>
                </Link>
              </Flex>
              <Image
                height={{
                  base: "160px",
                  sm: "160px",
                  md: "235px",
                  lg: "170px",
                  xl: "180px",
                  "2xl": "235px",
                  "4xl": "288px",
                }}
                width={{
                  base: "163px",
                  sm: "163px",
                  md: "230px",
                  lg: "173px",
                  xl: "183px",
                  "2xl": "230px",
                  "4xl": "280px",
                }}
                src={
                  colorMode === "light"
                    ? "/logo-home.svg"
                    : "/logo-home-dark.svg"
                }
                alt="kanban board image"
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Flex
        height="100%"
        minH={{
          base: "100vh",
          md: "100%",
        }}
        width={{
          base: "100%",
          lg: "45%",
        }}
        id="sessions"
      >
        <Sessions />
      </Flex>
    </Flex>
  );
}
export default App;
