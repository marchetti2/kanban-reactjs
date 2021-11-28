import {
  Flex,
  Text,
  Icon,
  HStack,
  VStack,
  Avatar,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  useColorMode,
  Box,
  Link,
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { BsKanban } from "react-icons/bs";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AddIcon } from "@chakra-ui/icons";
import { Search2Icon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useId } from "@reach/auto-id";

import { auth } from "../../../../services/firebase";

import { useIssues } from "../../../../contexts/IssuesContext";

import { CreateIssueModal } from "../../../../components/Projects/slug/Sidebar/CreateIssueModal";
import { NotificationsResponsive } from "../../../../components/Projects/Header/NotificationsResponsive";
import { IssuesWrapper } from "../../../../components/Projects/slug/Dashboard/IssuesWrapper";

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

interface ProjectResponsiveProps {
  project: Project;
}

function ProjectResponsive({ project }: ProjectResponsiveProps): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();
  const id = useId();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { searchListIssueData, issues, setSearchListIssueData } = useIssues();

  function handleInputFilterChange(inputValue: string) {
    if (inputValue !== "") {
      const filterBySummary = issues.filter(
        (issue) =>
          issue.summary.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );

      if (filterBySummary !== undefined) {
        setSearchListIssueData(filterBySummary);
        return;
      }

      if (issues.length === searchListIssueData.length) {
        return;
      }
    }

    setSearchListIssueData(issues);
    return;
  }

  return (
    <>
      <Box h="100vh" w="100vw">
        <CreateIssueModal project={project} isOpen={isOpen} onClose={onClose} />
        <Flex
          as="header"
          w="100vw"
          h="60px"
          bgColor="main.400"
          alignItems="center"
          justifyContent="space-between"
          px="24px"
        >
          <Icon as={BsKanban} w={9} h={9} color="light.100" />
          <HStack spacing="20px">
            <NotificationsResponsive />

            <Flex onClick={toggleColorMode}>
              {colorMode === "dark" ? (
                <Icon as={FaSun} w={5} h={5} color="light.100" />
              ) : (
                <Icon as={FaMoon} w={5} h={5} color="light.100" />
              )}
            </Flex>

            <Menu id={id}>
              <MenuButton>
                <Avatar
                  size="sm"
                  name={auth.currentUser?.displayName!}
                  src={auth.currentUser?.photoURL!}
                />
              </MenuButton>
              <MenuList boxShadow="md">
                <MenuGroup
                  color="light.600"
                  textTransform="capitalize"
                  fontWeight="500"
                  title={auth.currentUser?.displayName!}
                >
                  <MenuDivider />

                  <MenuItem
                    id={id}
                    //variant="link"
                    w="100%"
                    // onClick={() => onOpenModal("profile")}
                  >
                    <Text pl="5px">Meu perfil</Text>
                  </MenuItem>
                  <MenuItem
                    variant="link"
                    w="100%"
                    //onClick={() => onOpenModal("confirmLogout")}
                  >
                    <Text pl="5px">Sair</Text>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        <Flex
          h="80px"
          w="100%"
          bgColor="gray.100"
          borderBottomWidth="1px"
          boxShadow="sm"
          alignItems="center"
          justifyContent="space-between"
          px="24px"
        >
          <HStack>
            <VStack spacing="0" alignItems="flex-start">
              <HStack spacing="8px">
                <Heading
                  maxW="190px"
                  fontSize="16px"
                  textTransform="capitalize"
                  isTruncated
                >
                  asdasdasdasdasdasdas
                </Heading>
                <Icon
                  as={MdSettings}
                  width="20px"
                  height="20px"
                  color="gray.400"
                />
              </HStack>

              <Text
                maxW="190px"
                fontFamily="Inter"
                fontSize="13px"
                fontColor="gray.500"
                isTruncated
              >
                aaaaa
              </Text>
            </VStack>
          </HStack>
          <Flex
            alignItems="center"
            justifyContent="center"
            borderRadius="20px"
            width="40px"
            height="40px"
            bgColor="gray.200"
            onClick={() => router.push("/projects")}
            _hover={{
              bg: "gray.300",
            }}
          >
            <Icon
              as={IoMdArrowRoundBack}
              width="20px"
              height="20px"
              color="gray.400"
            />
          </Flex>
        </Flex>

        <Flex
          h="calc(100vh - 140px)"
          p="14px 24px 30px 24px"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Box>
              <HStack mb="10px">
                <Link href="/projects" passHref>
                  <Text
                    fontSize="12px"
                    fontFamily="Inter"
                    cursor="pointer"
                    textDecoration="underline"
                    _hover={{
                      color: "gray.700",
                    }}
                  >
                    Projetos
                  </Text>
                </Link>
                <Text fontSize="12px" fontFamily="Inter">
                  {" "}
                  /{" "}
                </Text>
                <Text
                  maxW="200px"
                  fontSize="12px"
                  fontFamily="Inter"
                  textTransform="capitalize"
                  isTruncated
                >
                  asdasdasdasd
                </Text>
              </HStack>

              <Heading
                fontSize="24px"
                textAlign="center"
                color="gray.700"
                fontWeight="500"
                mb="20px"
              >
                Quadro de problemas
              </Heading>
            </Box>

            <Flex
              flexDirection="column"
              h="350px"
              w="95%"
              m="auto"
              overflowX="scroll"
              //border="1px solid #333"
              position="absolute"
              marginLeft="auto"
              marginRight="auto"
              left="0"
              right="0"
            >
              <Flex justifyContent="space-between" w="980px">
                <Box
                  w="320px"
                  h="50px"
                  borderRadius="6px 6px 0 0"
                  bgColor="gray.50"
                >
                  <Heading variant="kanban-board-status" m="15px 10px">
                    não iniciado
                  </Heading>
                </Box>
                <Box
                  w="320px"
                  h="50px"
                  borderRadius="6px 6px 0 0"
                  bgColor="gray.50"
                >
                  <Heading variant="kanban-board-status" m="15px 10px">
                    em progresso
                  </Heading>
                </Box>
                <Box
                  w="320px"
                  h="50px"
                  borderRadius="6px 6px 0 0"
                  bgColor="gray.50"
                >
                  <Heading variant="kanban-board-status" m="15px 10px">
                    concluído
                  </Heading>
                </Box>
              </Flex>

              <Flex justifyContent="space-between" w="980px">
                <IssuesWrapper project={project} />
              </Flex>
            </Flex>
          </Box>

          <InputGroup h="40px" w="250px">
            <Input
              h="100%"
              pl="20px"
              color="gray.700"
              bgColor="gray.50"
              focusBorderColor="main.500"
              placeholder="Buscar problema"
              _placeholder={{
                fontSize: "13px",
              }}
              onChange={(e) => handleInputFilterChange(e.target.value)}
            />
            <InputRightElement h="100%" pointerEvents="none">
              <Search2Icon w={4} h={4} color="gray.300" />
            </InputRightElement>
          </InputGroup>
        </Flex>

        <Flex
          w="50px"
          h="50px"
          borderRadius="25px"
          display={{ base: "flex", sm: "none" }}
          onClick={onOpen}
          bgColor="main.300"
          boxShadow="lg" //"xl"
          position="absolute"
          bottom="25px"
          right="20px"
          alignItems="center"
          justifyContent="center"
          _active={{
            bgColor: "main.400",
            boxShadow: "base", //"xl"
          }}
        >
          <AddIcon color="white" />
        </Flex>
      </Box>
    </>
  );
}
export default ProjectResponsive;