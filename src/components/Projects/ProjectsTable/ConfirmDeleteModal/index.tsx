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
              Deseja excluir o projeto?
            </Heading>
            <Text lineHeight="20px" textAlign="center">
              Apos a confirmação, nao será possivel recuperar o projeto, deseja
              continuar?
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter pt="0">
          <Flex w="100%" align="center" justify="center" mb="15px">
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
              color="white"
              transition=".2s"
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
