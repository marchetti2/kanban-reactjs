import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  UseModalProps,
  Button,
  Heading,
  Box,
  Select,
  Text,
  Container,
  Input,
  FormControl,
  Tooltip,
  FormErrorMessage,
  Spinner,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InfoOutlineIcon } from "@chakra-ui/icons";

import { auth } from "../../../../services/firebase";

import { useProjects } from "../../../../contexts/ProjectsContext";

function CreateProjectModal({ isOpen, onClose }: UseModalProps) {
  const { colorMode } = useColorMode();
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const { createProject } = useProjects();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formValidations = {
    title: {
      required: "Nome obrigatório",
      onChange: (e: any) => setTitle(e.target.value),
      value: title,
    },
    type: {
      required: "Tipo obrigatório",
      onChange: (e: any) => setType(e.target.value),
      value: type,
    },
  };

  async function onSubmit() {
    setLoading(true);
    try {
      await createProject({ title, type, user: auth.currentUser! });
    } finally {
      onModalClose();
      setLoading(false);
    }
  }

  async function onModalClose() {
    setTitle("");
    setType("");
    reset();
    onClose();
  }

  return (
    <Modal
      isCentered
      trapFocus={true}
      size="3xl"
      isOpen={isOpen}
      onClose={onModalClose}
    >
      <ModalOverlay />
      <ModalContent 
      p="10px"
      bg={colorMode === "dark" ? "dark.200" : "white"}
      borderColor={colorMode === "dark" ? "rgba(255, 255, 255, 0.24)" : "none"}
      borderWidth={colorMode === "dark" ? "1px" : "0"}
      >
        <ModalHeader pl="36px">
          <Heading variant="modal-title">Criar projeto</Heading>
        </ModalHeader>
        <ModalCloseButton m="15px 10px 0 0" onClick={onModalClose} />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit(() => onSubmit())} mb="20px">
            <Container maxWidth="750px" mb="30px">
              <Text fontWeight="500" mb="5px">
                Nome do projeto
              </Text>
              <FormControl
                h="40px"
                mb="5px"
                display="flex"
                flexDirection="row"
                alignItems="center"
                isInvalid={!!errors.title}
              >
                <Input
                  pl="20px"
                  type="text"
                  bgColor={colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50"}
                  borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
                  color={colorMode === "dark" ? "white" : "gray.700"}
                  {...register("title", formValidations.title)}
                  focusBorderColor={!!errors.title ? "red.500" : "main.500"}
                />
                {!!errors && (
                  <Tooltip
                    label={errors.title?.message}
                    placement="right"
                    fontSize="13px"
                    fontFamily="Inter"
                  >
                    <FormErrorMessage ml={-7} mt={0} zIndex="tooltip">
                      <InfoOutlineIcon color="red.500" w={4} h={4} />
                    </FormErrorMessage>
                  </Tooltip>
                )}
              </FormControl>
              <Text
                font-size="12px"
                lineHeight="15px"
                color={colorMode === "dark" ? "dark.600" : "gray.500"}
                mb="20px"
              >
                Crie um nome para seu projeto.
              </Text>

              <Text fontWeight="500" mb="5px">
                Tipo
              </Text>

              <FormControl
                h="40px"
                mb="5px"
                display="flex"
                flexDirection="row"
                alignItems="center"
                isInvalid={!!errors.type}
              >
                <Select
                  mb="5px"
                  variant="filled"
                  borderWidth="1px"
                  bgColor={colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50"}
                  borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
                  color={colorMode === "dark" ? "white" : "gray.700"}
                  placeholder="Selecione"
                  transition=" .3s"
                  _hover={{
                    bgColor: colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50",
                    borderColor: colorMode === "dark" ? "dark.300" : "gray.200",
                  }}
                  {...register("type", formValidations.type)}
                  focusBorderColor={!!errors.type ? "red.500" : "main.500"}
                >
                  <option value="Santa ceia">Santa ceia</option>
                  <option value="Slipknots">Slipknots</option>
                  <option value="Deboras">Deboras</option>
                  <option value="Premisas">Premisas</option>
                </Select>
                {!!errors.type && (
                  <Tooltip
                    label={errors.type?.message}
                    placement="right"
                    fontSize="13px"
                    fontFamily="Inter"
                  >
                    <FormErrorMessage
                      transform="translateX(-20px)"
                      ml={-7}
                      mt={-1}
                      zIndex="tooltip"
                    >
                      <InfoOutlineIcon color="red.500" w={4} h={4} />
                    </FormErrorMessage>
                  </Tooltip>
                )}
              </FormControl>
              <Text
                font-size="12px"
                lineHeight="15px"
                color={colorMode === "dark" ? "dark.600" : "gray.500"}
                mb="20px"
              >
                Defina o tipo do projeto.
              </Text>
            </Container>

            <Flex justifyContent="flex-end">
              <Button
                variant="modal-cancel"
                onClick={onModalClose}
                mr="10px"
                w="120px"
              >
                Cancelar
              </Button>
              <Button
                variant="modal-submit"
                type="submit"
                mr={3}
                w="120px"
              >
                {isLoading ? <Spinner color="white" /> : "Criar"}
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { CreateProjectModal };
