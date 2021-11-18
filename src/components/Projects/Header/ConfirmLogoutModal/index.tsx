import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  UseModalProps,
  Heading,
  Button,
  Flex,
  Spinner
} from "@chakra-ui/react";
import { useState } from "react";

import { useAuth } from "../../../../contexts/AuthContext";

function ConfirmLogoutModal({ isOpen, onClose }: UseModalProps) {
  const [isLoading, setLoading] = useState(false);
  const { logout } = useAuth();

  async function handleLogOut() {
    setLoading(true)
     try {
      await logout()
    } catch(err) {
      setLoading(false)
    }
  }

  function onCloseModal() {
    onClose()
    setLoading(false)
  }

  return (
    <Modal size="xs" isOpen={isOpen} onClose={onCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent p="20px">
        <ModalBody py="15px">
          <Flex  flexDir="column" align="center" justify="center">
            <Heading fontSize="20px">Deseja realmente sair?</Heading>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex w="100%" align="center" justify="center">
            <Button
              w="100px"
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
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              bgColor="red.300"
              fontWeight="400"
              _hover={{
                bgColor: "red.400",
              }}
              _active={{
                bgColor: "red.500",
              }}
              color="#fff"
              transition=".2s"
              ml="20px"
              w="100px"
              onClick={handleLogOut}
            >
              {isLoading ? <Spinner color="white" /> : "Sair"}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export { ConfirmLogoutModal };
