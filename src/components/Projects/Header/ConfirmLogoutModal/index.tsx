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
  Spinner,
  useColorMode
} from "@chakra-ui/react";
import { useState } from "react";

import { useAuth } from "../../../../contexts/AuthContext";

function ConfirmLogoutModal({ isOpen, onClose }: UseModalProps) {
  const { colorMode } = useColorMode();
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
      <ModalContent 
      p="20px 19px 20px 19px" 
      bg={colorMode === "dark" ? "dark.200" : "white"}
      borderColor={colorMode === "dark" ? "rgba(255, 255, 255, 0.24)" : "none"}
      borderWidth={colorMode === "dark" ? "1px" : "0"}
      >
        <ModalBody py="15px">
          <Flex  flexDir="column" align="center" justify="center">
            <Heading fontSize="20px">Deseja realmente sair?</Heading>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex w="100%" align="center" justify="center">
            <Button
              variant="modal-cancel"
              w="100px"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              variant="modal-confirm-logout"
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
