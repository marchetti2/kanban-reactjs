import {
  Button,
  Box,
  Input,
  InputLeftElement,
  FormControl,
  FormErrorMessage,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import { EmailIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "../../../contexts/AuthContext";

function ForgotPassword() {
  const [opacity, setOpacity] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { resetPassword } = useAuth();

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
      onChange: (e: any) => setEmail(e.target.value),
      value: email,
    },
  };

  useEffect(() => {
    setOpacity(true);
  }, []);

  async function onSubmit() {
    setLoading(true);
    try {
      await resetPassword(email);
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
      <FormControl
        h="50px"
        mb="20px"
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
          placeholder="Digite seu e-maila"
          _placeholder={{
            fontSize: "14px",
          }}
          focusBorderColor={!!errors.email ? "red.500" : "main.500"}
          {...register("email", formValidations.email)}
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

      <Button
        type="submit"
        variant="session"
        pointerEvents={isLoading ? "none" : "auto"}
      >
        {isLoading ? <Spinner color="white" /> : "Enviar"}
      </Button>
    </Box>
  );
}

export { ForgotPassword };
