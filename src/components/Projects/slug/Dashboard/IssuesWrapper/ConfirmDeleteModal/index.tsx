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
  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
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
            <Button variant="ghost" w="100px" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              bgColor="red.300"
              _hover={{
                bgColor: "red.400",
              }}
              color="light.100"
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
