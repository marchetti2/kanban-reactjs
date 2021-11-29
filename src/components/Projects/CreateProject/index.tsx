import {
  Flex,
  Heading,
  Image,
  Text,
  Button,
  useDisclosure, useColorMode
} from "@chakra-ui/react";

import { CreateProjectModal } from "./CreateProjectModal";

function CreateProject() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      maxW={{ base: "300px", md: "350px" }}
      h="100%"
      m="auto"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        m="0 15px 22px 0"
        w="160px"
        h="136px"
        alt="pageSketch"
        src="newProject.svg"
      />
      <Heading fontSize={{ base: "18px", md: "21px" }} mb="18px">
        Voce não tem nenhum projeto
      </Heading>
      <Text
        fontSize={{ base: "12px", sm: "13px", md: "14px" }}
        lineHeight="20px"
        textAlign="center"
        color={colorMode === "dark" ? "dark.600" : "gray.700"}
        mb="24px"
      >
        Crie um novo projeto sozinho, ou com a sua equipe para planear,
        monitorizar e lançar problemas.
      </Text>
      <Button
        type="button"
        variant="session"
        w="160px"
        onClick={onOpen}
        h={{
          base: "42.5px",
          sm: "45px",
          md: "50px",
        }}
      >
        Criar projeto
      </Button>
      <CreateProjectModal onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
}

export { CreateProject };
