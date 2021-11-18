import {
  Flex,
  Heading,
  Image,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { CreateProjectModal } from "./CreateProjectModal";

function CreateProject() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      maxW="420px"
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
      <Heading variant="21px-500-light800" mb="18px">
        Voce não tem nenhum projeto
      </Heading>
      <Text variant="14px-400-light800" mb="24px">
        Crie um novo projeto sozinho, ou com a sua equipe para planear,
        monitorizar e lançar problemas.
      </Text>
      <Button type="button" variant="session" w="160px" onClick={onOpen}>
        Criar projeto
      </Button>
      <CreateProjectModal onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
}

export { CreateProject };
