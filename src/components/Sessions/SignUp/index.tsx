import {
  Button,
  Box,
  Icon,
  Input,
  InputLeftElement,
  FormControl,
  FormErrorMessage,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { EmailIcon, LockIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

import { useAuth } from "../../../contexts/AuthContext";

function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [opacity, setOpacity] = useState(false);

  const { createUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const formValidations = {
    email: {
      required: "E-mail obrigatório",
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Formato inválido",
      },
      onChange: (e: any) =>
        setUser((prev) => ({ ...prev, email: e.target.value })),
      value: user.email,
    },
    name: {
      required: "Nome obrigatório",
      onChange: (e: any) =>
        setUser((prev) => ({ ...prev, name: e.target.value })),
      value: user.name,
    },
    password: {
      required: "Senha obrigatória",
      onChange: (e: any) =>
        setUser((prev) => ({ ...prev, password: e.target.value })),
      minLength: {
        value: 6,
        message: "Mínimo 6 caracteres",
      },
      maxLength: {
        value: 15,
        message: "Máximo 15 caracteres",
      },
    },
    confirmPassword: {
      required: "Corfimação de senha obrigatória",
      validate: {
        matchesPreviousPassword: (value: any) => {
          const { password } = getValues();
          return password === value || "A senhas devem ser iguais";
        },
      },
    },
  };

  useEffect(() => {
    setOpacity(true);
  }, []);

  async function onSubmit() {
    setLoading(true);
    try {
      await createUser(user.email, user.password, user.name);
    } finally {
      setLoading(false);
    }
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
      <Box>
        <FormControl
          h="50px"
          mb="10px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          isInvalid={!!errors.email}
        >
          <InputLeftElement h="100%" w="50px" pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="email"
            h="100%"
            pl="50px"
            placeholder="Digite seu e-mail"
            _placeholder={{
              fontSize: "14px",
              fontWeight: "400",
            }}
            focusBorderColor={!!errors.email ? "red.500" : "main.500"}
            {...register("email", formValidations.email)}
            formNoValidate
          />
          {!!errors && (
            <Tooltip label={errors.email?.message} placement="right" fontSize="13px"
            fontFamily="Inter">
              <FormErrorMessage ml={-7} mt={0} zIndex="tooltip">
                <InfoOutlineIcon color="red.500" w={4} h={4} />
              </FormErrorMessage>
            </Tooltip>
          )}
        </FormControl>

        <FormControl
          h="50px"
          mb="10px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          isInvalid={!!errors.name}
        >
          <InputLeftElement h="100%" w="50px" pointerEvents="none">
            <Icon as={AiOutlineUser} w={5} h={5} color="gray.300" />
          </InputLeftElement>

          <Input
            h="100%"
            pl="50px"
            placeholder="Digite seu nome"
            _placeholder={{
              fontSize: "14px",
              fontWeight: "400",
            }}
            focusBorderColor={!!errors.name ? "red.500" : "main.500"}
            {...register("name", formValidations.name)}
          />
          {!!errors && (
            <Tooltip label={errors.name?.message} placement="right" fontSize="13px"
            fontFamily="Inter">
              <FormErrorMessage ml={-7} mt={0} zIndex="tooltip">
                <InfoOutlineIcon color="red.500" w={4} h={4} />
              </FormErrorMessage>
            </Tooltip>
          )}
        </FormControl>

        <FormControl
          h="50px"
          mb="10px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          isInvalid={!!errors.password}
        >
          <InputLeftElement h="100%" w="50px" pointerEvents="none">
            <LockIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="password"
            h="100%"
            pl="50px"
            placeholder="Digite sua senha"
            _placeholder={{
              fontSize: "14px",
              fontWeight: "400",
            }}
            value={user.password}
            focusBorderColor={!!errors.password ? "red.500" : "main.500"}
            {...register("password", formValidations.password)}
          />
          {!!errors && (
            <Tooltip label={errors.password?.message} placement="right" fontSize="13px"
            fontFamily="Inter">
              <FormErrorMessage ml={-7} mt={0} zIndex="tooltip">
                <InfoOutlineIcon color="red.500" w={4} h={4} />
              </FormErrorMessage>
            </Tooltip>
          )}
        </FormControl>

        <FormControl
          h="50px"
          mb="20px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          isInvalid={!!errors.confirmPassword}
        >
          <InputLeftElement h="100%" w="50px" pointerEvents="none">
            <LockIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="password"
            h="100%"
            pl="50px"
            placeholder="Confirme sua senha"
            _placeholder={{
              fontSize: "14px",
              fontWeight: "400",
            }}
            focusBorderColor={!!errors.confirmPassword ? "red.500" : "main.500"}
            {...register("confirmPassword", formValidations.confirmPassword)}
          />
          {!!errors && (
            <Tooltip label={errors.confirmPassword?.message} placement="right" fontSize="13px"
            fontFamily="Inter">
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
      >
        {isLoading ? <Spinner color="white" /> : "Criar conta"}
      </Button>
    </Box>
  );
}

export { SignUp };
