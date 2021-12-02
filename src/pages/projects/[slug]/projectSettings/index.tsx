import {
  Text,
  Input,
  Button,
  Select,
  Container,
  Box,
  Flex,
  Spinner,
  ButtonGroup,
  IconButton,
  FormControl,
  useColorMode,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

import { useProjects } from "../../../../contexts/ProjectsContext";

import { Header } from "../../../../components/Projects/slug/Header";
import { TextEditor } from "../../../../components/TextEditor";

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

interface ProjectSettingsProps {
  project: Project;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

function ProjectSettings({
  project,
  setTabIndex,
}: ProjectSettingsProps): JSX.Element {
  const { colorMode } = useColorMode();
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [initialTitle, setInitialTitle] = useState("");
  const [tempTitle, setTempTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [initialDescription, setInitialDescription] = useState("");

  const [isEditingDescription, setIsEditingDescription] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const { updateProject, projects } = useProjects();

  const { register, handleSubmit } = useForm();

  const formValidations = {
    title: {
      onChange: (e: any) => setTempTitle(e.target.value),
    },
    type: {
      onChange: (e: any) => setType(e.target.value),
    },
  };

  async function onSubmit() {
    setLoading(true);
    try {
      await updateProject({ id: project?.id, title, type, description });
    } finally {
      setLoading(false);
    }
  }

  function handleSaveDescriptionChanges() {
    setDescription(tempDescription);
    setIsEditingDescription(false);
  }

  function handleSaveTitleChanges() {
    setTitle(tempTitle);
    setIsEditingTitle(false);
  }

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setInitialTitle(project.title);
      setTempTitle(project.title);
      setType(project.type);
      setDescription(project.description!);
      setInitialDescription(project.description!);
      setTempDescription(project.description!);
    }

    if (project?.description !== "") {
      setIsEditingDescription(false);
    }
  }, [project, projects]);

  function handleCancelChanges() {
    setTitle(project.title);
    setInitialTitle(project.title);
    setTempTitle(project.title);
    setType(project.type);
    setDescription(project.description!);
    setInitialDescription(project.description!);
    setTempDescription(project.description!);

    setTabIndex(0);
  }

  return (
    <>
      <Header projectTitle={project?.title} current="Configuração do Projeto" />
      <Container
        m="auto auto auto 0"
        fontWeight="500"
        color="light.800"
        mt="30px"
        maxWidth="680px"
      >
        <Text mb="5px">Name</Text>

        <FormControl
          cursor="text"
          display="flex"
          h="40px"
          mb="20px"
          bgColor={
            colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50"
          }
          borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
          color={colorMode === "dark" ? "white" : "gray.700"}
          borderWidth="1px"
          borderRadius="6px"
        >
          <Input
            readOnly
            id="preview-username-input"
            cursor="text"
            display={isEditingTitle ? "none" : "flex"}
            type="text"
            border="none"
            w="100%"
            h="40px"
            bg="none"
            alignItems="center"
            justifyContent="left"
            pl="20px"
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
            placeholder={title}
            value={tempTitle}
          />
          <Input
            display={isEditingTitle ? "flex" : "none"}
            type="text"
            border="none"
            w="100%"
            h="40px"
            bg="none"
            alignItems="center"
            justifyContent="left"
            pl="20px"
            value={tempTitle}
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
            focusBorderColor="main.500"
            {...register("title", formValidations.title)}
          />
          {isEditingTitle ? (
            <ButtonGroup
              justifyContent="center"
              alignItems="center"
              size="xs"
              pr="5px"
            >
              <IconButton
                aria-label="Check Icon"
                bg="none"
                color={colorMode === "dark" ? "dark.800" : "gray.500"}
                _hover={{
                  bg: "none",
                }}
                _active={{
                  bg: "none",
                }}
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                }}
                icon={<CheckIcon />}
                onClick={handleSaveTitleChanges}
              />
              <IconButton
                aria-label="Close Icon"
                bg="none"
                color={colorMode === "dark" ? "dark.800" : "gray.500"}
                _hover={{
                  bg: "none",
                }}
                _active={{
                  bg: "none",
                }}
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                }}
                icon={<CloseIcon />}
                onClick={() => setIsEditingTitle(false)}
              />
            </ButtonGroup>
          ) : (
            <Flex justifyContent="center" alignItems="center">
              <IconButton
                pr="10px"
                aria-label="edit Icon"
                bg="none"
                color={colorMode === "dark" ? "dark.800" : "gray.500"}
                _hover={{
                  bg: "none",
                }}
                _active={{
                  bg: "none",
                }}
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                }}
                size="sm"
                icon={<EditIcon />}
                onClick={() => setIsEditingTitle(true)}
              />
            </Flex>
          )}
        </FormControl>

        <Text mt="20px" mb="5px">
          Categoria do projeto
        </Text>
        <Select
          h="40px"
          mb="20px"
          variant="filled"
          borderWidth="1px"
          bgColor={
            colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50"
          }
          borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
          color={colorMode === "dark" ? "white" : "gray.700"}
          transition=" .3s"
          _hover={{
            bgColor:
              colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50",
            borderColor: colorMode === "dark" ? "dark.300" : "gray.200",
          }}
          {...register("type", formValidations.type)}
          focusBorderColor="main.500"
          value={project?.type}
        >
          <option value="Santa ceia">Santa ceia</option>
          <option value="Slipknots">Slipknots</option>
          <option value="Deboras">Deboras</option>
          <option value="Premisas">Premisas</option>
        </Select>

        <Text mb="5px">Descrição do projeto</Text>

        {!isEditingDescription ? (
          <>
            <Flex
              minHeight="50px"
              flexDir="column"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              sx={{
                li: {
                  marginLeft: "40px",
                  fontSize: "24px",
                  fontWeight: "400",
                  color: "gray.700",
                },
                a: {
                  color: "blue",
                  transition: ".3s",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                },
                ".ql-size-small": {
                  fontSize: "16px",
                  fontWeight: "400",
                },
                p: {
                  fontSize: "24px",
                },
                ".ql-size-large": {
                  fontSize: "32px",
                },
                ".ql-size-huge": {
                  fontSize: "40px",
                },
              }}
              onClick={() => setIsEditingDescription(true)}
              cursor="text"
              pl="14px"
            />
          </>
        ) : (
          <Box>
            <TextEditor
              setTempDescription={setTempDescription}
              tempDescription={tempDescription}
            />
            <Flex mt="8px" h="32px">
              <Button
                variant="modal-cancel"
                w="70px"
                h="32px"
                mr={2}
                fontSize="13px"
                onClick={() => setIsEditingDescription(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="modal-submit"
                w="70px"
                h="32px"
                fontSize="13px"
                onClick={handleSaveDescriptionChanges}
              >
                {isLoading ? <Spinner color="white" /> : "Salvar"}
              </Button>
            </Flex>
          </Box>
        )}

        <Flex justifyContent="flex-end" mt="50px">
          <Button
            variant="modal-cancel"
            disabled={
              isEditingTitle ||
              isEditingDescription ||
              (initialTitle === title && initialDescription === description)
            }
            onClick={handleCancelChanges}
            mr="10px"
            w="120px"
          >
            Cancelar
          </Button>
          <Button
            variant="modal-submit"
            disabled={
              isEditingTitle ||
              (initialTitle === title && initialDescription === description)
            }
            type="submit"
            w="120px"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? <Spinner color="white" /> : "Salvar"}
          </Button>
        </Flex>
      </Container>
    </>
  );
}

export default ProjectSettings;
