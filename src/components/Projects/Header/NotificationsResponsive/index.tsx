import {
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  Portal,
  Image,
  useColorMode,
  Box,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { BellIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useId } from "@reach/auto-id";

import { useNotifications } from "../../../../contexts/NotificationsContext";
import { auth } from "../../../../services/firebase";

function NotificationsResponsive() {
  const { colorMode} = useColorMode();
  const {
    notifications,
    getNotifications,
    deleteNotification,
    updatedNotificationsListener,
  } = useNotifications();
  const id = useId();

  useEffect(() => {
    getNotifications(auth.currentUser?.uid!);
  }, []);

  async function handleDeleteNotification(id: string) {
    await deleteNotification(id);
    await updatedNotificationsListener(auth.currentUser?.uid!);
  }
  return (
    <Popover id={id} arrowShadowColor={colorMode === "dark" ? "rgba(255, 255, 255, 0.24)" : "#A38FD6"}>
      <PopoverTrigger>
        <Box position="relative" alignItems="center" justifyContent="center">
          <Box display={{ base: "flex", sm: "none" }}>
            <Icon as={BellIcon} w={6} h={6} color="white" />
          </Box>

          {notifications.length > 0 ? (
            <Flex
              h="12px"
              w="12px"
              borderRadius="6px"
              bg="red.500"
              position="absolute"
              top="0"
              right="0"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="9px" fontWeight="500" color="white">
                {notifications.length}
              </Text>
            </Flex>
          ) : null}
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          _focus={{
            borderColor: colorMode === "dark" ? "rgba(255, 255, 255, 0.24)" : "main.300",
            borderWidth: "1px",
            boxShadow: "md",
          }}
        >
          <PopoverArrow /* boxShadow="base" */ />
          <PopoverHeader>
            <Heading variant="notifications-title" textAlign="left">
              Notificações
            </Heading>
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody h="215px" px="0">
            {notifications?.length === 0 ? (
              <Flex
                flexDir="column"
                align="center"
                justifyContent="center"
                h="200px"
              >
                <Image alt="empty" h="50px" w="50px" src="/empty.svg" />
                <Text>Nenhuma notificação</Text>
              </Flex>
            ) : (
              <Box h="200px" w="100%" overflowY="auto" px="15px">
                {notifications?.map((notification) => (
                  <Flex
                    key={notification.id}
                    h="60px"
                    w="100%"
                    bgColor="rgba(	163, 143, 214, .1)"
                    //border="1px solid #ddd"
                    borderRadius="5px"
                    justifyContent="space-between"
                    alignItems="center"
                    pl="12px"
                    boxShadow="base"
                    transition=".3s"
                    /*                     _hover={{
                        bg: "gray.50",
                      }} */
                    mb="5px"
                  >
                    <Text>{notification.content}</Text>
                    <IconButton
                      aria-label="Close Icon"
                      bg="none"
                      isRound
                      color="gray.500"
                      transition=".3s"
                      _hover={{
                        bg: "rgba(	163, 143, 214, .15)",
                      }}
                      _active={{
                        bg: "rgba(	163, 143, 214, .25)",
                      }}
                      _focus={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                      mr="8px"
                      size="sm"
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      <CloseIcon w={2} h={2} />
                    </IconButton>
                  </Flex>
                ))}
              </Box>
            )}
          </PopoverBody>
          <PopoverFooter></PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export { NotificationsResponsive };
