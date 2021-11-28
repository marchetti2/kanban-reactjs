import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  UseModalProps,
  Input,
  Spinner,
  Flex,
  Heading,
  Text,
  Container,
  ButtonGroup,
  IconButton,
  FormControl,
  Tooltip,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CheckIcon,
  CloseIcon,
  EditIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import { auth } from "../../../../services/firebase";

import { useAuth } from "../../../../contexts/AuthContext";
import { useEffect } from "react";

import { FileInput } from "./FileInput";

function ProfileModal({ isOpen, onClose }: UseModalProps) {
  const { user, updateUser } = useAuth();

  const [isLoading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [localAvatarUrl, setLocalAvatarUrl] = useState("");

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  useEffect(() => {
    if (auth.currentUser?.photoURL!) {
      setLocalAvatarUrl(auth.currentUser?.photoURL!);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  function onCloseModal() {
    setUsername("");
    setPassword("");
    onClose();
  }

  const formValidations = {
    image: {
      validate: {
        lessThan10MB: (data: any) => {
          return (
            data[0]?.size < 10000000 || "O arquivo deve ser menor que 10MB"
          );
        },
        acceptedFormats: (data: any) => {
          return (
            data[0]?.type === "image/jpeg" ||
            data[0]?.type === "image/jpg" ||
            data[0]?.type === "image/png" ||
            data[0]?.type === "image/gif" ||
            "Somente são aceitos arquivos PNG, JPEG/JPG e GIF"
          );
        },
      },
    },
    username: {
      onChange: (e: any) => setUsername(e.target.value),
      value: username,
    },
    password: {
      onChange: (e: any) => setPassword(e.target.value),
      value: password,
      minLength: {
        value: 6,
        message: "Mínimo 6 caracteres",
      },
      maxLength: {
        value: 15,
        message: "Máximo 15 caracteres",
      },
    },
  };

  async function onSubmit(): Promise<void> {
    setLoading(true);
    try {
      await updateUser({
        user: auth.currentUser!,
        avatar: avatarUrl,
        name: username,
        password,
      });
    } finally {
      onCloseModal();
      setLoading(false);
    }
  }

  return (
    <>
      <Modal size="md" isOpen={isOpen} onClose={onCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader px="36px" pt="20px">
            <Heading variant="modal-title">Meu perfil</Heading>
          </ModalHeader>
          <ModalCloseButton m="8px 8px 0 0" onClick={onCloseModal} />

          <ModalBody>
            <Container
              as="form"
              onSubmit={handleSubmit(() => onSubmit())}
              mt="10px"
            >
              <FileInput
                setAvatarUrl={setAvatarUrl}
                localAvatarUrl={localAvatarUrl}
                setLocalAvatarUrl={setLocalAvatarUrl}
                trigger={trigger}
                error={errors.image}
                {...register("image", formValidations.image)}
              />

              <Text mt="30px" mb="5px">
                Name
              </Text>

              <FormControl
                cursor="text"
                display="flex"
                h="40px"
                mb="20px"
                bgColor="gray.50"
                borderColor="gray.200"
                borderWidth="1px"
                borderRadius="6px"
                color="light.800"
              >
                <Input
                  readOnly
                  id="preview-username-input"
                  cursor="text"
                  display={isEditingUsername ? "none" : "flex"}
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
                  placeholder={user.name}
                  value={username}
                />
                <Input
                  display={isEditingUsername ? "flex" : "none"}
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
                  {...register("username", formValidations.username)}
                />
                {isEditingUsername ? (
                  <ButtonGroup
                    justifyContent="center"
                    alignItems="center"
                    size="sm"
                    pr="5px"
                  >
                    <IconButton
                      aria-label="Check Icon"
                      bg="none"
                      color="gray.500"
                      _hover={{
                        bg: "none",
                      }}
                      _focus={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                      icon={<CheckIcon />}
                      onClick={() => setIsEditingUsername(false)}
                    />
                    <IconButton
                      aria-label="Close Icon"
                      bg="none"
                      color="gray.500"
                      _hover={{
                        bg: "none",
                      }}
                      _focus={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                      icon={<CloseIcon />}
                      onClick={() => setIsEditingUsername(false)}
                    />
                  </ButtonGroup>
                ) : (
                  <Flex justifyContent="center" alignItems="center">
                    <IconButton
                      pr="10px"
                      aria-label="edit Icon"
                      bg="none"
                      color="gray.500"
                      _hover={{
                        bg: "none",
                      }}
                      _focus={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                      size="sm"
                      icon={<EditIcon />}
                      onClick={() => setIsEditingUsername(true)}
                    />
                  </Flex>
                )}
              </FormControl>

              <Text mb="5px">Senha</Text>
              <FormControl
                cursor="text"
                display="flex"
                h="40px"
                mb="20px"
                bgColor="gray.50"
                borderColor="gray.200"
                borderWidth="1px"
                borderRadius="6px"
                color="light.800"
                isInvalid={!!errors.password}
              >
                <Input
                  readOnly
                  id="preview-password-input"
                  cursor="text"
                  display={isEditingPassword ? "none" : "flex"}
                  type="password"
                  border="none"
                  w="100%"
                  h="40px"
                  bg="none"
                  alignItems="center"
                  justifyContent="left"
                  pl="20px"
                  placeholder="••••••"
                  {...register("password", formValidations.password)}
                />
                <Input
                  display={isEditingPassword ? "flex" : "none"}
                  type="password"
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
                  errorBorderColor="none"
                  {...register("password", formValidations.password)}
                />
                {!!errors && (
                  <Tooltip
                    label={errors.password?.message}
                    placement="right"
                    fontSize="13px"
                    fontFamily="Inter"
                  >
                    <FormErrorMessage ml={-7} mt={0} zIndex="tooltip">
                      <InfoOutlineIcon color="red.500" w={4} h={4} />
                    </FormErrorMessage>
                  </Tooltip>
                )}
                {isEditingPassword ? (
                  <ButtonGroup
                    justifyContent="center"
                    alignItems="center"
                    size="sm"
                    pr="5px"
                  >
                    <IconButton
                      aria-label="Check Icon"
                      bg="none"
                      color="gray.500"
                      _hover={{
                        bg: "none",
                      }}
                      _focus={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                      icon={<CheckIcon />}
                      onClick={() => setIsEditingPassword(false)}
                    />
                    <IconButton
                      aria-label="Close Icon"
                      bg="none"
                      color="gray.500"
                      _hover={{
                        bg: "none",
                      }}
                      _focus={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                      icon={<CloseIcon />}
                      onClick={() => setIsEditingPassword(false)}
                    />
                  </ButtonGroup>
                ) : (
                  <Flex justifyContent="center" alignItems="center">
                    <IconButton
                      pr="10px"
                      ml="10px"
                      aria-label="edit Icon"
                      bg="none"
                      color="gray.500"
                      _hover={{
                        bg: "none",
                      }}
                      _focus={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                      size="sm"
                      icon={<EditIcon />}
                      onClick={() => setIsEditingPassword(true)}
                    />
                  </Flex>
                )}
              </FormControl>

              <Flex justifyContent="flex-end" mt="40px" mb="25px">
                <Button
                  //variant="ghost"
                  onClick={onCloseModal}
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
                  {isLoading ? <Spinner color="white" /> : "Salvar"}
                </Button>
              </Flex>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { ProfileModal };
