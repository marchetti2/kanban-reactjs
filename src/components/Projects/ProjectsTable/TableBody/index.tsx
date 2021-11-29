import {
  HStack,
  Avatar,
  Tbody,
  Text,
  Tr,
  Icon,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Table,
  useDisclosure,
  Box,
  Spinner,
  Button,
  Flex,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { AddIcon } from "@chakra-ui/icons";

import { useProjects } from "../../../../contexts/ProjectsContext";

import { ConfirmDeleteModal } from "../ConfirmDeleteModal";
import { ProjectSettingsModal } from "../ProjectSettingsModal";
import { CreateProjectModal } from "../../CreateProject/CreateProjectModal";

import { TableHeaderResponsive } from "../TableHeader/TableHeaderResponsive";

interface OnOpenModalProps {
  id?: string;
  modalName: string;
}

function TableBody() {
  const [id, setId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenProjectSettings, setIsOpenProjectSettings] = useState(false);
  const [isOpenCreateProject, setIsOpenCreateProject] = useState(false);

  const [isLoadingProject, setLoadingProject] = useState<Array<boolean>>([]);

  const { onClose } = useDisclosure();
  const router = useRouter();

  const { deleteProject, searchListData } = useProjects();

  const onOpenModal = useCallback(({ id, modalName }: OnOpenModalProps) => {
    if (id) {
      setId(id);
    }

    if (modalName === "confirmDelete") {
      return setIsOpenConfirmDelete(true);
    }

    if (modalName === "projectSettings") {
      return setIsOpenProjectSettings(true);
    }

    if (modalName === "createProjects") {
      return setIsOpenCreateProject(true);
    }
  }, []);

  function onCloseModal() {
    setIsOpenConfirmDelete(false);
    setIsOpenProjectSettings(false);
    setIsOpenCreateProject(false);

    return;
  }

  async function handleDelete(id: any) {
    setLoading(true);
    try {
      await deleteProject(id);
    } finally {
      onCloseModal();
      setLoading(false);
    }
  }

  async function handleNavigate(projectId: string, index: any) {
    setLoading(true);
    let loading: Array<boolean> = isLoadingProject.slice();
    loading[index] = true;
    setLoadingProject(loading);
    await router.push(`/projects/${projectId}`);
    setLoadingProject([]);
  }

  return (
    <Box
      overflowY="auto"
      overflowX={{
        base: "auto",
        md: "hidden",
      }}
      maxH="400px"
    >
      <ConfirmDeleteModal
        isOpen={isOpenConfirmDelete}
        onClose={onCloseModal}
        handleDelete={handleDelete}
        id={id}
        isLoading={isLoading}
      />
      <ProjectSettingsModal
        isOpen={isOpenProjectSettings}
        onClose={onCloseModal}
        id={id}
      />
      <CreateProjectModal onClose={onCloseModal} isOpen={isOpenCreateProject} />
      <Table size="sm">
        <TableHeaderResponsive />
        <Tbody>
          {searchListData.map((project, index) => (
            <Tr
              pointerEvents={isLoading ? "none" : "auto"}
              cursor="pointer"
              className="tableButton"
              key={project?.id}
              h="56px"
              transition=".3s"
              _hover={{
                bgColor: "gray.100",
              }}
              _active={{
                bgColor: "gray.200",
              }}
              opacity={isLoadingProject[index] ? ".3" : 1}
            >
              <Td
                onClick={() => handleNavigate(project.id, index)}
                w="460px"
                maxW="460px"
                borderBottomColor="gray.300"
              >
                <HStack spacing={3}>
                  <Box
                    //maxW={{ base: "50px", md: "428px" }}
                    maxW="428px"
                  >
                    <Text
                      transition=".3s"
                      sx={{
                        ".tableButton:hover &": {
                          color: "main.400",
                        },
                      }}
                      fontWeight="500"
                      fontSize={{ base: "12px", md: "14px" }}
                      textTransform="capitalize"
                      isTruncated
                    >
                      {project?.title}
                    </Text>
                  </Box>
                  {isLoadingProject[index] ? (
                    <Spinner size="sm" color="gray.400" speed="0.68s" />
                  ) : null}
                </HStack>
              </Td>
              <Td
                onClick={() => handleNavigate(project?.id, index)}
                w="195px"
                maxW="195px"
                borderBottomColor="gray.300"
              >
                <Text fontSize={{ base: "12px", md: "14px" }} isTruncated>
                  {project?.type}
                </Text>
              </Td>
              <Td
                onClick={() => handleNavigate(project?.id, index)}
                w="195px"
                maxW="195px"
                borderBottomColor="gray.300"
              >
                <HStack>
                  <Box
                  //display={{base:'none', sm:"inline"}}
                  >
                    <Avatar
                      size="xs"
                      name={project?.leader?.name}
                      src={project?.leader?.avatar}
                    />
                  </Box>
                  <Text fontSize={{ base: "12px", md: "14px" }} isTruncated>
                    {project?.leader?.name}
                  </Text>
                </HStack>
              </Td>
              <Td
                onClick={() => handleNavigate(project?.id, index)}
                w="120px"
                maxW="120px"
                borderBottomColor="gray.300"
              >
                <Text fontSize={{ base: "12px", md: "14px" }} isTruncated>
                  {project?.createdAt}
                </Text>
              </Td>
              <Td
                w="70px"
                maxW="70px"
                borderBottomColor="gray.300"
                cursor="default"
              >
                <Menu gutter={3} placement="bottom-end">
                  <MenuButton
                    as={IconButton}
                    variant="unstyled"
                    isRound
                    aria-label="config"
                    border="none"
                    transition=".3s"
                    _hover={{
                      bgColor: "gray.200",
                    }}
                    _active={{
                      bgColor: "gray.300",
                    }}
                    pt="3px"
                  >
                    <Icon
                      as={HiOutlineDotsHorizontal}
                      w={5}
                      h={5}
                      color="gray.500"
                    />
                  </MenuButton>
                  <MenuList boxShadow="md">
                    <MenuItem
                      variant="link"
                      w="100%"
                      onClick={() =>
                        onOpenModal({
                          id: project?.id,
                          modalName: "projectSettings",
                        })
                      }
                    >
                      <Text pl="5px">Definições do projeto</Text>
                    </MenuItem>
                    <MenuItem
                      variant="link"
                      w="100%"
                      onClick={() =>
                        onOpenModal({
                          id: project?.id,
                          modalName: "confirmDelete",
                        })
                      }
                    >
                      <Text pl="5px">Excluir</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex
        w="50px"
        h="50px"
        borderRadius="25px"
        display={{ base: "flex", sm: "none" }}
        onClick={() => onOpenModal({ modalName: "createProjects" })}
        bgColor="main.300"
        boxShadow="lg" //"xl"
        position="absolute"
        bottom="10px"
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
  );
}

export { TableBody };
