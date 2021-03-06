import {
  Button,
  Box,
  Text,
  Input,
  InputLeftElement,
  Icon,
  HStack,
  Center,
  FormControl,
  FormErrorMessage,
  Tooltip,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { EmailIcon, LockIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useId } from "@reach/auto-id";

import { useAuth } from "../../../contexts/AuthContext";

interface SignInProps {
  username: string;
  setUsername: (value: string) => void;
}

function SignIn({ username, setUsername }: SignInProps): JSX.Element {
  const { colorMode } = useColorMode();
  const [password, setPassword] = useState("");
  const [opacity, setOpacity] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const id = useId();

  const { login, googleAuthProvider, facebookAuthProvider } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formValidations = {
    email: {
      required: "E-mail obrigatório",
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Formato inválido",
      },
      onChange: (e: any) => setUsername(e.target.value),
      value: username,
    },
    password: {
      required: "Senha obrigatória",
      onChange: (e: any) => setPassword(e.target.value),
      value: password,
    },
  };

  useEffect(() => {
    setOpacity(true);
  }, []);

  async function onSubmit() {
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {}
    setLoading(false);
  }

  return (
    <Box
      as="form"
      w="100%"
      transition=".6s"
      opacity={opacity ? "1" : "0"}
      visibility={opacity ? "visible" : "hidden"}
      onSubmit={handleSubmit(() => onSubmit())}
    >
      <Box
        transition="transform .5s"
        transform={{
          base: "none",
          sm: username ? "translateY(85px)" : "none",
        }}
      >
        <Box mb="20px">
          <FormControl
            h={{
              base: "42.5px",
              sm: "45px",
              md: "47.5px",
              lg: "42.5px",
              xl: "45px",
              "2xl": "47.5px",
              "4xl": "50px",
            }}
            mb="10px"
            display="flex"
            flexDirection="row"
            alignItems="center"
            isInvalid={!!errors.email}
          >
            <InputLeftElement h="100%" w="50px" pointerEvents="none">
              <EmailIcon
                color={colorMode === "dark" ? "dark.800" : "gray.300"}
              />
            </InputLeftElement>
            <Input
              id={id}
              type="email"
              h="100%"
              pl="50px"
              placeholder="Digite seu e-mail"
              borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
              _placeholder={{
                fontSize: [
                  "12px",
                  "13px",
                  "14px",
                  "12px",
                  "13px",
                  "14px",
                  "14px",
                ],
                fontWeight: "400",
                color: colorMode === "dark" ? "dark.800" : "gray.400",
              }}
              bg={colorMode === "dark" ? "dark.300" : "gray.50"}
              focusBorderColor={!!errors.email ? "red.500" : "main.500"}
              {...register("email", formValidations.email)}
            />
            {!!errors && (
              <Tooltip
                label={errors.email?.message}
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

          <FormControl
            h={{
              base: "42.5px",
              sm: "45px",
              md: "47.5px",
              lg: "42.5px",
              xl: "45px",
              "2xl": "47.5px",
              "4xl": "50px",
            }}
            display="flex"
            flexDirection="row"
            alignItems="center"
            isInvalid={!!errors.password}
          >
            <InputLeftElement h="100%" w="50px" pointerEvents="none">
              <LockIcon
                color={colorMode === "dark" ? "dark.800" : "gray.300"}
              />
            </InputLeftElement>
            <Input
              id="field-4"
              type="password"
              h="100%"
              pl="50px"
              placeholder="Digite sua senha"
              borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
              _placeholder={{
                fontSize: [
                  "12px",
                  "13px",
                  "14px",
                  "12px",
                  "13px",
                  "14px",
                  "14px",
                ],
                fontWeight: "400",
                color: colorMode === "dark" ? "dark.800" : "gray.400",
              }}
              bg={colorMode === "dark" ? "dark.300" : "gray.50"}
              focusBorderColor={!!errors.password ? "red.500" : "main.500"}
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
          </FormControl>
        </Box>

        <Button
          type="submit"
          variant="session"
          pointerEvents={isLoading ? "none" : "auto"}
          fontSize={["14px", "15px", "16px", "14px", "14px", "15px", "16px"]}
          mb="20px"
        >
          {isLoading ? <Spinner color="white" /> : "Entrar"}
        </Button>
      </Box>

      <Box
        transition="opacity 1s"
        opacity={{
          base: "1",
          sm: !username ? "1" : "0",
        }}
        visibility={{
          base: "visible",
          sm: !username ? "visible" : "hidden",
        }}
      >
        <Center>
          <Text
            fontSize={["12px", "13px", "14px", "12px", "13px", "14px", "14px"]}
            mb="20px"
          >
            ou
          </Text>
        </Center>

        <Button
          type="button"
          variant="session-social"
          mb="16px"
          bg={colorMode === "dark" ? "dark.300" : "white"}
          onClick={googleAuthProvider}
        >
          <HStack justifyContent="space-between" w="100%">
            <Icon as={FcGoogle} w={5} h={5} />
            <Text
              fontSize={[
                "12px",
                "13px",
                "14px",
                "12px",
                "13px",
                "14px",
                "14px",
              ]}
            >
              Continuar com Google
            </Text>
            <Box />
          </HStack>
        </Button>
        <Button
          type="button"
          variant="session-social"
          mb="16px"
          bg={colorMode === "dark" ? "dark.300" : "white"}
          onClick={facebookAuthProvider}
        >
          <HStack justifyContent="space-between" w="100%">
            <Icon as={AiFillFacebook} w={5} h={5} color="#4267B2" />
            <Text
              fontSize={[
                "12px",
                "13px",
                "14px",
                "12px",
                "13px",
                "14px",
                "14px",
              ]}
            >
              Continuar com Facebook
            </Text>
            <Box />
          </HStack>
        </Button>
      </Box>
    </Box>
  );
}

export { SignIn };
