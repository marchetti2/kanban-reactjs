import {
  Flex,
  Text,
  Icon,
  HStack,
  VStack,
  Avatar,
  Heading,
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
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { BsKanban } from "react-icons/bs";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";

import { useId } from "@reach/auto-id";

import { auth } from "../../../../services/firebase";

import { useIssues } from "../../../../contexts/IssuesContext";

import { CreateIssueModal } from "../../../../components/Projects/slug/Sidebar/CreateIssueModal";
import { NotificationsResponsive } from "../../../../components/Projects/Header/NotificationsResponsive";
import { IssuesWrapper } from "../../../../components/Projects/slug/Dashboard/IssuesWrapper";
import {ConfirmLogoutModal} from "../../../../components/Projects/Header/ConfirmLogoutModal"
import {ProfileModal} from "../../../../components/Projects/Header/ProfileModal"
import ProjectSettingsResponsive from "../_projectSettingsResponsive/ProjectSettingsResponsive"
 

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

function ProjectDashboardResponsive({ project }: ProjectResponsiveProps): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();
  const id = useId();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { searchListIssueData, issues, setSearchListIssueData } = useIssues();

  const [isOpenConfirmLogout, setIsOpenConfirmLogout] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const [isProjectSetings, setIsProjectSetings] = useState(false);

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

  const onOpenModal = useCallback((modalName: string) => {
    if (modalName === "confirmLogout") {
      return setIsOpenConfirmLogout(true);
    }
    if (modalName === "profile") {
      return setIsOpenProfile(true);
    }
  }, []);

  function onCloseModal() {
    setIsOpenConfirmLogout(false);
    setIsOpenProfile(false);
    return;
  }

  return (
    <>
      <Box h="100vh" w="100vw">
        <ProfileModal isOpen={isOpenProfile} onClose={onCloseModal} />
        <ConfirmLogoutModal isOpen={isOpenConfirmLogout} onClose={onCloseModal} />
        <CreateIssueModal project={project} isOpen={isOpen} onClose={onClose} />
        <Flex
          as="header"
          w="100vw"
          h="60px"
          bgColor={colorMode === "dark" ? "main.300" : "main.400"}
          alignItems="center"
          justifyContent="space-between"
          px="24px"
        >
          <Icon as={BsKanban} w={9} h={9} color="white" />
          <HStack spacing="20px">
            <NotificationsResponsive />

            <Flex onClick={toggleColorMode}>
              {colorMode === "dark" ? (
                <Icon as={FaSun} w={5} h={5} color="white" />
              ) : (
                <Icon as={FaMoon} w={5} h={5} color="white" />
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
                  color={colorMode === "dark" ? "white" : "gray.500"}
                  textTransform="capitalize"
                  fontWeight="500"
                  title={auth.currentUser?.displayName!}
                >
                  <MenuDivider />

                  <MenuItem
                    id={id}
                    //variant="link"
                    w="100%"
                    onClick={() => onOpenModal("profile")}
                  >
                    <Text pl="5px">Meu perfil</Text>
                  </MenuItem>
                  <MenuItem
                    variant="link"
                    w="100%"
                    onClick={() => onOpenModal("confirmLogout")}
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
          bgColor={colorMode === "dark" ? "dark.300" : "gray.100"}
          borderBottomWidth={colorMode === "dark" ? "0" : "1px"}
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
                  {project?.title}
                </Heading>
                <Box
                onClick={()=>setIsProjectSetings(true)}
                >
                <Icon
                  as={MdSettings}
                  width="20px"
                  height="20px"
                  color={colorMode === "dark" ? "dark.800" : "gray.400"} 
                />
                </Box>
              </HStack>

              <Text
                maxW="190px"
                fontFamily="Inter"
                fontSize="13px"
                fontColor={colorMode === "dark" ? "dark.600" : "gray.500"} 
                isTruncated
              >
               {project?.type}
              </Text>
            </VStack>
          </HStack>
          <Flex
            alignItems="center"
            justifyContent="center"
            borderRadius="20px"
            width="40px"
            height="40px"
            bgColor={colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.200"}
            onClick={() => router.push("/projects")}
            _hover={{
              bg: colorMode === "dark" ? "rgba(153, 153, 153,0.25)" : "gray.300"
            }}
          >
            <Icon
              as={IoMdArrowRoundBack}
              width="20px"
              height="20px"
              color={colorMode === "dark" ? "dark.600" :"gray.400"}
            />
          </Flex>
        </Flex>


        {
          isProjectSetings ? (
          <ProjectSettingsResponsive project={project}/>
          ) : (

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
                      variant="breadcrumb"
                      fontSize="12px"
                      cursor="pointer"
                      textDecoration="underline"
                      _hover={{
                        color: colorMode === "dark" ? "white" :"gray.700",
                      }}
                    >
                      Projetos
                    </Text>
                  </Link>
                  <Text 
                  variant="breadcrumb"
                  fontSize="12px"
                  >
                    {" "}
                    /{" "}
                  </Text>
                  <Text
                    variant="breadcrumb"
                    maxW="200px"
                    fontSize="12px"
                    textTransform="capitalize"
                    isTruncated
                  >
                    {project?.title}
                  </Text>
                </HStack>
  
                <Heading
                  variant="project-responsive-title"
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
                    bgColor={colorMode === "dark" ? "dark.300" : "gray.50"}
                  >
                    <Heading variant="kanban-board-status" m="15px 10px">
                      não iniciado
                    </Heading>
                  </Box>
                  <Box
                    w="320px"
                    h="50px"
                    borderRadius="6px 6px 0 0"
                    bgColor={colorMode === "dark" ? "dark.300" : "gray.50"}
                  >
                    <Heading variant="kanban-board-status" m="15px 10px">
                      em progresso
                    </Heading>
                  </Box>
                  <Box
                    w="320px"
                    h="50px"
                    borderRadius="6px 6px 0 0"
                    bgColor={colorMode === "dark" ? "dark.300" : "gray.50"}
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
                borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
                color={colorMode === "dark" ? "white" : "gray.700"}
                bgColor={colorMode === "dark" ? "dark.300" : "gray.50"}
                focusBorderColor={colorMode === "dark" ? "main.300" : "main.500"}
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
  
          )
        }


        <Flex
          w="50px"
          h="50px"
          borderRadius="25px"
          display={{ base: "flex", lg: "none" }}
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
export default ProjectDashboardResponsive;
