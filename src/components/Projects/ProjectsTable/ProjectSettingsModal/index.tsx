import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  UseModalProps,
  Heading,
  Text,
  Button,
  Flex,
  Spinner,
  Input,
  Select,
  Container,
  Box,
  ModalHeader,
  ModalCloseButton,
  ButtonGroup,
  IconButton,
  FormControl,
  useColorMode,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

import { useProjects } from "../../../../contexts/ProjectsContext";

import { TextEditor } from "../../../../components/TextEditor";

interface ConfirmDeleteModalProps extends UseModalProps {
  id: string;
}

function ProjectSettingsModal({
  isOpen,
  id,
  onClose,
}: ConfirmDeleteModalProps) {
  const { colorMode } = useColorMode();
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [initialTitle, setInitialTitle] = useState("");
  const [tempTitle, setTempTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [initialDescription, setInitialDescription] = useState("");

  const [isEditingDescription, setIsEditingDescription] = useState(
    !!!description
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const { updateProject, projects } = useProjects();

  useEffect(() => {
    const project = projects.find((project) => project.id === id);

    if (project) {
      setTitle(project.title);
      setInitialTitle(project.title);
      setTempTitle(project.title);
      setType(project.type);
      setDescription(project.description!);
      setInitialDescription(project.description!);
      setTempDescription(project.description!);
    }
  }, [id, projects]);

  const { register, handleSubmit } = useForm();

  const formValidations = {
    title: {
      onChange: (e: any) => setTempTitle(e.target.value),
      value: title,
    },
    type: {
      onChange: (e: any) => setType(e.target.value),
      value: type,
    },
  };

  async function onSubmit() {
    setLoading(true);
    try {
      await updateProject({ id, title, type, description });
    } finally {
      onClose();
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

  function onCloseModal() {
    onClose();
    setIsEditingDescription(true);
    setLoading(false);
    setTitle(initialTitle);
    setTempTitle(initialTitle);
    setDescription(initialDescription);
    setTempDescription(initialDescription);
  }

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent
      bg={colorMode === "dark" ? "dark.200" : "white"}
      borderColor={colorMode === "dark" ? "rgba(255, 255, 255, 0.24)" : "none"}
      borderWidth={colorMode === "dark" ? "1px" : "0"}
      >
        <ModalHeader px="36px" pt="20px">
          <Heading variant="modal-title">Definições do projeto</Heading>
        </ModalHeader>
        <ModalCloseButton m="8px 8px 0 0" onClick={onClose} />

        <ModalBody>
          <Container
            /* fontWeight="500"
            color="gray.700" */
            mt="10px"
            maxWidth="680px"
          >
            <Text mb="5px">Name</Text>

            <FormControl
              cursor="text"
              display="flex"
              h="40px"
              mb="20px"
              bgColor={colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50"}
              borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
              color={colorMode === "dark" ? "white" : "gray.700"}
              borderWidth="1px"
              borderRadius="6px"
              alignItems="center"
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
                value={title}
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
                  size="sm"
                  pr="5px"
                >
                  <IconButton
                    aria-label="Check Icon"
                    bg="none"
                    color={colorMode === "dark" ? "dark.800" : "gray.500"} 
                    _hover={{
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
              bgColor={colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50"}
              borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
              color={colorMode === "dark" ? "white" : "gray.700"}
              transition=" .3s"
              _hover={{
                bgColor: colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50",
                borderColor: colorMode === "dark" ? "dark.300" : "gray.200",
              }}
              {...register("type", formValidations.type)}
              focusBorderColor="main.500"
              value={type}
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
                    p: {
                      fontSize: "17px",
                      color: "gray.700",
                      fontWeight: "400",
                    },
                    h1: {
                      fontSize: "26px",
                      fontWeight: "500",
                      color: "gray.700",
                    },
                    h2: {
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "gray.700",
                    },
                    h3: {
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "gray.700",
                    },
                    li: {
                      marginLeft: "40px",
                      fontSize: "17px",
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
                    fontWeight="400"
                    onClick={handleSaveDescriptionChanges}
                  >
                    {isLoading ? <Spinner color="white" /> : "Salvar"}
                  </Button>
                </Flex>
              </Box>
            )}
          </Container>
        </ModalBody>

        <ModalFooter mb="15px">
          <Flex justifyContent="flex-end">
            <Button
              variant="modal-cancel"
              onClick={onCloseModal}
              mr="10px"
              w="120px"
            >
              Cancelar
            </Button>
            <Button
            disabled={
              isEditingTitle ||
              isEditingDescription ||
              (initialTitle === title && initialDescription === description)
            }
            type="submit"
            mr={3}
            w="120px"
            variant="modal-submit"
            onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? <Spinner color="white" /> : "Salvar"}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export { ProjectSettingsModal };
