import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  UseModalProps,
  Heading,
  Text,
  Button,
  Flex,
  useColorMode,
} from "@chakra-ui/react";

interface ConfirmDeleteModalProps extends UseModalProps {
  handleDelete: (id: any) => void;
  isLoading: boolean;
}

function ConfirmDeleteModal({
  isOpen,
  id,
  onClose,
  handleDelete,
  isLoading,
}: ConfirmDeleteModalProps) {
  const { colorMode } = useColorMode();
  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
      bg={colorMode === "dark" ? "dark.200" : "white"}
      borderColor={colorMode === "dark" ? "rgba(255, 255, 255, 0.24)" : "none"}
      borderWidth={colorMode === "dark" ? "1px" : "0"}
      >
        <ModalBody>
          <Flex
            w="100%"
            flexDir="column"
            align="center"
            justify="center"
            my="20px"
          >
            <Heading fontSize="20px" mb="25px">
              Deseja excluir o problema?
            </Heading>
            <Text lineHeight="20px" textAlign="center">
              Apos a confirmação, nao será possivel recupera-lo, deseja
              continuar?
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter pt="0">
          <Flex w="100%" align="center" justify="center" mb="15px">
            <Button variant="modal-cancel" w="100px" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="modal-confirm-logout"
              ml="20px"
              w="100px"
              onClick={() => handleDelete(id)}
              isLoading={isLoading}
            >
              Excluir
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export { ConfirmDeleteModal };
