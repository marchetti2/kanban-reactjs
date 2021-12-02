import {
  Flex,
  Avatar,
  HStack,
  Text,
  Editable,
  EditablePreview,
  useEditableControls,
  EditableInput,
  Box,
  Textarea,
  Button,
  Spinner,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";

import { auth } from "../../../../../../../services/firebase";

import { useComments } from "../../../../../../../contexts/CommentsContext";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Comment {
  id: string;
  user: UserData;
  issueId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentsWrapperProps {
  commentData: Comment;
}

function CommentsWrapper({ commentData }: CommentsWrapperProps) {
  const { colorMode } = useColorMode();
  const { deleteComment, updateComment } = useComments();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [isLoading, setLoading] = useState(false);
  const [comment, setComment] = useState(commentData.comment);
  const [tempComment, setTempComment] = useState(commentData.comment);
  const [isEditingComment, setIsEditingComment] = useState(false);

  async function handleEditComment() {
    setLoading(true);
    setComment(tempComment);
    try {
      await updateComment({ id: commentData.id, comment: tempComment });
    } finally {
      setTempComment(commentData.comment);
      setIsEditingComment(false);
      setLoading(false);
    }
  }

  async function handleDeleteComment() {
    setLoading(true);
    try {
      await deleteComment(commentData.id);
    } finally {
      setTempComment("");
      setIsEditingComment(false);
      setLoading(false);
    }
  }

  function handleCancelEditComment() {
    setIsEditingComment(false);
    setTempComment(commentData.comment);
  }

  return (
    <>
      <ConfirmDeleteModal
        isOpen={isOpen}
        id={commentData.id}
        onClose={onClose}
        handleDelete={handleDeleteComment}
        isLoading={isLoading}
      />
      <Flex mb="20px">
        <Avatar
          size="sm"
          name={auth.currentUser?.displayName!}
          src={auth.currentUser?.photoURL!}
        />
        <Flex flexDir="column" w="100%" ml="12px" alignItems="flex-start">
          <HStack spacing="12px" mb="12px">
            <Text fontWeight="500" fontSize="15px">
              {auth.currentUser?.displayName!}
            </Text>
            <Flex>
              <Text fontSize="13px" color={colorMode === "dark" ? "dark.800" : "gray.400"}>
                {commentData.createdAt}
              </Text>

              {commentData.updatedAt ? (
                <>
                  <Text mx="5px" fontSize="13px" color={colorMode === "dark" ? "dark.800" : "gray.400"}>
                    -
                  </Text>
                  <Text fontStyle="italic" fontSize="13px" color={colorMode === "dark" ? "dark.800" : "gray.400"}>
                    editado em {commentData.updatedAt}
                  </Text>
                </>
              ) : null}
            </Flex>
          </HStack>

          <Box w="100%">
            <Box display={isEditingComment ? "none" : "inline"}>
              <Text
                mb="12px"
                fontSize="15px"
                fontWeight="400"
                color={colorMode === "dark" ? "dark.600" : "gray.400"}
              >
                {comment}
              </Text>
              <Flex>
                <Box as="button" mr="7px">
                  <Text
                    color={colorMode === "dark" ? "dark.800" : "gray.400"}
                    transition=".2s"
                    _hover={{
                      color: colorMode === "dark" ? "white" :"gray.700",
                      textDecoration: "underline",
                    }}
                    onClick={() => setIsEditingComment(true)}
                  >
                    Editar
                  </Text>
                </Box>
                <Text fontSize="12px">•</Text>
                <Box as="button" ml="7px">
                  <Text
                    color={colorMode === "dark" ? "dark.800" : "gray.400"}
                    transition=".2s"
                    _hover={{
                      color: colorMode === "dark" ? "white" :"gray.700",
                      textDecoration: "underline",
                    }}
                    onClick={onOpen}
                  >
                    Deletar
                  </Text>
                </Box>
              </Flex>
            </Box>

            <Box display={isEditingComment ? "inline" : "none"}>
              <Textarea
                value={tempComment}
                onChange={(e: any) => setTempComment(e.target.value)}
                bgColor={colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50"}
                borderColor={colorMode === "dark" ? "dark.300" : "gray.200"}
                fontSize="15px"
                placeholder="Digite seu comentário.."
                _placeholder={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: colorMode === "dark" ? "dark.800" : "gray.400",
                }}
                _focus={{
                  border: "1px solid #856ac8",
                }}
              />
              <Flex mt="8px" h="32px">
                <Button
                variant="modal-cancel"
                  w="70px"
                  h="32px"
                  mr={2}
                  fontSize="13px"
                  onClick={handleCancelEditComment}
                >
                  Cancelar
                </Button>
                <Button
                variant="modal-submit"
                w="70px"
                h="32px"
                fontSize="13px"
                disabled={isLoading}
                onClick={handleEditComment}
                >
                  {isLoading ? (
                    <Spinner size="xs" color="main.400" />
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export { CommentsWrapper };
