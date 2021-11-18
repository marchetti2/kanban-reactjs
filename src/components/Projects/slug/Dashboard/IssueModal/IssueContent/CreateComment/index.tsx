import {
  Flex,
  Avatar,
  Editable,
  EditablePreview,
  useEditableControls,
  EditableInput,
  Box,
  Textarea,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useComments } from "../../../../../../../contexts/CommentsContext";
import { useAuth } from "../../../../../../../contexts/AuthContext";
import { auth } from "../../../../../../../services/firebase";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
interface CreateCommentProps {
  issueId: string;
}

function CreateComment({ issueId }: CreateCommentProps) {
  const { createComment, updatedCommentsListener } = useComments();
  const { user } = useAuth();

  const [isLoading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [isEditingComment, setIsEditingComment] = useState(false);

  async function handleCreateComment() {
    setLoading(true);
    try {
      await createComment({ issueId, comment, user });
    } finally {
      setComment("");
      setIsEditingComment(false);
      setLoading(false);
      await updatedCommentsListener(issueId);
    }
  }

  function handleCancelCreateComment() {
    setIsEditingComment(false);
    setComment("");
  }

  return (
    <Flex mb="20px">
      <Avatar
        size="sm"
        name={auth.currentUser?.displayName!}
        src={auth.currentUser?.photoURL!}
      />

      <Flex flexDir="column" w="100%" pl="10px" mb="15px">
        <Flex
          fontSize="15px"
          w="100%"
          h="40px"
          pl="15px"
          alignItems="center"
          borderColor="gray.200"
          borderWidth="1px"
          borderRadius="5px"
          color="gray.400"
          display={isEditingComment ? "none" : "flex"}
          onClick={() => setIsEditingComment(true)}
        >
          <Text>Digite seu comentário..</Text>
        </Flex>

        <Box display={isEditingComment ? "inline" : "none"}>
          <Textarea
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            fontSize="15px"
            placeholder="Digite seu comentário.."
            _placeholder={{
              fontSize: "14px",
              lineHeight: "18px",
              color: "light.600",
            }}
            _focus={{
              border: "1px solid #856ac8",
            }}
          />
          <Flex mt="8px" h="32px">
            <Button
              w="70px"
              h="32px"
              mr={2}
              fontSize="13px"
              bg="gray.100"
            color="gray.700"
            fontWeight="400"
            transition=".2s"
            _hover={{
              bg:"rgba(226,232,240,.8)"
            }}
            _active={{
              bgColor:"gray.200"
            }}
              onClick={handleCancelCreateComment}
            >
              Cancelar
            </Button>
            <Button
              w="70px"
              h="32px"
              fontSize="13px"
              bg="main.300"
            fontWeight="400"
            color="white"
            transition=".2s"
            _hover={{
              bg:"main.400"
            }}
            _active={{
              bgColor:"main.500"
            }}
              disabled={isLoading}
              onClick={handleCreateComment}
            >
              {isLoading ? <Spinner size="xs" color="main.400" /> : "Criar"}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export { CreateComment };
