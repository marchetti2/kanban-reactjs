import {
  FormLabel,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Image,
  Text,
  FormControl,
  FormErrorMessage,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import {
  useState,
  SetStateAction,
  Dispatch,
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
} from "react";
import { FieldError, FieldValues, UseFormTrigger } from "react-hook-form";
import { FiAlertCircle, FiPlus } from "react-icons/fi";
import { auth } from "../../../../services/firebase";

import { useAuth } from "../../../../contexts/AuthContext";

export interface FileInputProps {
  name: string;
  error?: FieldError;
  setAvatarUrl: Dispatch<SetStateAction<string>>;
  localAvatarUrl: string;
  setLocalAvatarUrl: Dispatch<SetStateAction<string>>;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<boolean | void>;
  trigger: UseFormTrigger<FieldValues>;
}

let tempFile: File | undefined = undefined;

const FileInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  FileInputProps
> = (
  {
    name,
    error = null,
    setAvatarUrl,
    localAvatarUrl,
    setLocalAvatarUrl,
    onChange,
    trigger,
    ...rest
  },
  ref
) => {
  const { uploadAvatar, uploadAvatarProgress } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const { setUploadAvatarProgress } = useAuth();

  useEffect(() => {
    if (auth.currentUser?.photoURL!) {
      setLocalAvatarUrl(auth.currentUser?.photoURL!);
    }
  }, []);

  async function handleInputFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return;
    }
    await onChange(event);
    trigger("image");
    tempFile = event.target.files[0];
  }

  useEffect(() => {
    if (tempFile && !!!error) {
      handleUpload(tempFile);
      return;
    }

    if (tempFile && !!error) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, tempFile]);

  const handleUpload = async (file: File) => {
    setAvatarUrl("");
    setLocalAvatarUrl("");
    setIsSending(true);

    try {
      const avatarUrl = await uploadAvatar(file);
      setAvatarUrl(avatarUrl);
      setLocalAvatarUrl(URL.createObjectURL(file));
    } catch (err) {
      tempFile = undefined;
      return;
    } finally {
      tempFile = undefined;
    }
  };

  useEffect(() => {
    //uploadAvatarProgress === 100 &&
    if (localAvatarUrl !== "") {
      setIsSending(false);
      setUploadAvatarProgress(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localAvatarUrl, uploadAvatarProgress]);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel
        mx="auto"
        w="220px"
        h="220px"
        justifyContent="center"
        alignItems="center"
        htmlFor={name}
        cursor={isSending ? "progress" : "pointer"}
        opacity={isSending ? 0.5 : 1}
        bgColor="light.200"
        borderColor="gray.200"
        borderWidth="1px"
        borderRadius="110px"
        transition=" .3s"
        _hover={{
          borderColor: "gray.300",
        }}
      >
        {localAvatarUrl && !isSending ? (
          <Flex
            w="220px"
            h="220px"
            //flexDir="column"
            justifyContent="center"
            alignItems="center"
            borderRadius="110px"
            bgColor="pGray.800"
            color="pGray.200"
            borderWidth={error?.message && 2}
            borderColor={error?.message && "red.500"}
          >
            <Flex
              pos="relative"
              h="full"
              alignItems="center"
              justifyContent="center"
            >
              {!!error && (
                <Tooltip label={error.message} bg="red.500" fontSize="13px"
                fontFamily="Inter">
                  <FormErrorMessage
                    pos="absolute"
                    right={2}
                    top={2}
                    mt={0}
                    zIndex="tooltip"
                  >
                    <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
                  </FormErrorMessage>
                </Tooltip>
              )}

              <Image
                w="218px"
                h="218px"
                borderRadius="109px"
                src={localAvatarUrl}
                alt="Uploaded photo"
                objectFit="cover"
              />
            </Flex>
          </Flex>
        ) : (
          <Flex
            w="220px"
            h="220px"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            borderRadius="110px"
            bgColor="pGray.800"
            color="pGray.200"
            borderWidth={error?.message && 2}
            borderColor={error?.message && "red.500"}
          >
            {isSending ? (
              <>
                <CircularProgress
                  trackColor="pGray.200"
                  value={uploadAvatarProgress}
                  color="orange.500"
                >
                  <CircularProgressLabel>
                    {uploadAvatarProgress}%
                  </CircularProgressLabel>
                </CircularProgress>
                <Text as="span" pt={2} textAlign="center">
                  Enviando...
                </Text>
              </>
            ) : (
              <Flex
                w="218px"
                h="218px"
                borderRadius="109px"
                pos="relative"
                alignItems="center"
                justifyContent="center"
              >
                {!!error && (
                  <Tooltip label={error.message} bg="red.500" fontSize="13px"
                  fontFamily="Inter">
                    <FormErrorMessage
                      pos="absolute"
                      right={2}
                      top={2}
                      mt={0}
                      zIndex="tooltip"
                    >
                      <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
                    </FormErrorMessage>
                  </Tooltip>
                )}

                <Flex
                  w="218px"
                  h="218px"
                  borderRadius="109px"
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                >
                  <Icon as={FiPlus} w={14} h={14} color="light.800" />
                  <Text as="span" pt={2} textAlign="center">
                    Adicione sua imagem
                  </Text>
                </Flex>
              </Flex>
            )}
          </Flex>
        )}
        <input
          disabled={isSending}
          id={name}
          name={name}
          onChange={handleInputFile}
          ref={ref}
          type="file"
          style={{
            display: "none",
          }}
          {...rest}
        />
      </FormLabel>
    </FormControl>
  );
};

export const FileInput = forwardRef(FileInputBase);
