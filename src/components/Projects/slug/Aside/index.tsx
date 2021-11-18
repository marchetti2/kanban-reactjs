import {
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
  Tab,
  SkeletonText,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsKanban } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { GoLinkExternal } from "react-icons/go";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Project {
  id: string;
  userId: string;
  title: string;
  type: string;
  description?: string;
  leader: UserData;
  assignees?: Array<UserData>;
  createdAt: string;
}

interface AsideProps {
  project: Project;
}

function Aside({ project }: AsideProps) {
  const router = useRouter();

  return (
    <Flex
      w="calc(100% - 64px)"
      p="30px 20px"
      alignItems="center"
      flexDirection="column"
    >
      <VStack>
        {project?.title === undefined ? (
          <SkeletonText w="120px" noOfLines={1} />
        ) : (
          <Heading maxW="190px" textAlign="center" textTransform="capitalize">
            {project?.title}
          </Heading>
        )}
        {project?.type === undefined ? (
          <SkeletonText w="70px" noOfLines={1} />
        ) : (
          <Text fontFamily="Inter" fontSize="13px">{project?.type}</Text>
        )}
      </VStack>
      <Divider borderColor="gray.300" my="30px" />

      <VStack>
        <Tab
          w="190px"
          h="40px"
          color="gray.600"
          borderRadius="6px"
          _selected={{ bg: "gray.200" }}
          _focus={{
            outline: "none",
            boxShadow: "none",
          }}
          _hover={{
            bg: "gray.200",
            color: "main.500",
          }}
          px="10px"
          justifyContent="space-between"
        >
          <Icon mr="7px" as={BsKanban} w={4} h={4} color="gray.400" />
          <Text          
          fontSize="14px"
          fontFamily="Inter"
          fontWeight="400"
          color="inherit"
          >
            Quadro de problemas
          </Text>
        </Tab>
        <Tab
          w="190px"
          h="40px"
          color="gray.600"
          borderRadius="6px"
          _selected={{ bg: "gray.200" }}
          _focus={{
            outline: "none",
            boxShadow: "none",
          }}
          _hover={{
            bg: "gray.200",
            color: "main.500",
          }}
          px="10px"
          justifyContent="space-between"
        >
          <Icon
            as={IoSettingsSharp}
            w={4}
            h={4}
            color="gray.400"
          />
          <Text  
          w="100%"        
          fontSize="14px"
          fontFamily="Inter"
          fontWeight="400"
          color="inherit"
          >
            Configurações
          </Text>
        </Tab>
      </VStack>

      <Divider borderColor="gray.300" my="30px" />

      <Flex
        as="button"
        w="190px"
        h="40px"
        color="gray.600"
        borderRadius="6px"
        _selected={{ bg: "gray.200" }}
        _focus={{
          outline: "none",
          boxShadow: "none",
        }}
        _hover={{
          bg: "gray.200",
          color: "main.500",
        }}
        onClick={() => router.push("/projects")}
        pl="10px"
        pr="10px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Icon
          as={GoLinkExternal}
          w={4}
          h={4}
          color="gray.400"
        />
        <Text  
          w="100%"        
          fontSize="14px"
          fontFamily="Inter"
          fontWeight="400"
          color="inherit"
        >
          Meus projetos
        </Text>
      </Flex>
    </Flex>
  );
}

export { Aside };
