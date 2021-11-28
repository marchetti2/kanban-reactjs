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
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InfoOutlineIcon } from "@chakra-ui/icons";

import { auth } from "../../../../services/firebase";

import { useProjects } from "../../../../contexts/ProjectsContext";

function CreateProjectModal({ isOpen, onClose }: UseModalProps) {
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
      <ModalContent p="10px">
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
                  bgColor="gray.50"
                  color="gray.700"
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
                color="gray.500"
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
                  borderColor="gray.200"
                  bgColor="gray.50"
                  placeholder="Selecione"
                  transition=" .3s"
                  _hover={{
                    bgColor: "gray.50",
                    borderColor: "gray.300",
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
                color="gray.500"
                mb="20px"
              >
                Defina o tipo do projeto.
              </Text>
            </Container>

            <Flex justifyContent="flex-end">
              <Button
                onClick={onModalClose}
                mr="10px"
                w="120px"
                bg="gray.100"
                color="gray.700"
                fontWeight="400"
                transition=".2s"
                _hover={{
                  bg: "rgba(226,232,240,.8)",
                }}
                _active={{
                  bgColor: "gray.200",
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                mr={3}
                w="120px"
                bg="main.300"
                fontWeight="400"
                color="white"
                transition=".2s"
                _hover={{
                  bg: "main.400",
                }}
                _active={{
                  bgColor: "main.500",
                }}
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
