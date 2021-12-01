import {
  Heading,
  HStack,
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useCallback } from "react";
import { useId } from "@reach/auto-id";

import { ConfirmLogoutModal } from "./ConfirmLogoutModal";
import { ProfileModal } from "./ProfileModal";
import { Notifications } from "./Notifications";

import { auth } from "../../../services/firebase";

function ProjectsHeader(): JSX.Element {
  const id = useId();

  const [isOpenConfirmLogout, setIsOpenConfirmLogout] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const onOpenModal = useCallback((modalName: string) => {
    if (modalName === "confirmLogout") {
      return setIsOpenConfirmLogout(true);
    }
    if (modalName === "profile") {
      return setIsOpenProfile(true);
    }
  }, []);

  function onCloseModal() {
    setIsOpenConfirmLogout(false);
    setIsOpenProfile(false);
    return;
  }

  return (
    <>
      <ProfileModal isOpen={isOpenProfile} onClose={onCloseModal} />
      <ConfirmLogoutModal isOpen={isOpenConfirmLogout} onClose={onCloseModal} />
      <Flex
        as="header"
        w="100vw"
        h={{ base: "60px", sm: "70px", md: "80px" }}
        borderBottomWidth=" 1px"
        borderBottomColor={colorMode === "dark" ? "dark.500" : "gray.300"}
      >
        <Flex
          maxW="1120px"
          w={{base:"380px", sm:"440px", md:"100%"}}//"100%"
          m="auto"
          px={{ base: "20px", sm:"0", md: "40px" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading
            fontSize={{ base: "18px", md: "22px", "2xl": "24px" }}
            color={colorMode === "dark" ? "white" : "gray.800"}
          >
            Meus projetos
          </Heading>
          <HStack spacing={{ base: "8px", sm: "10px", md: "15px" }}>
            <Notifications />

            <IconButton
              isRound
              aria-label="Color-mode"
              bgColor={colorMode === "dark" ? "dark.100" : "white"}
              color={colorMode === "dark" ? "white" : 'gray.600'}
              transition=".3s"
              _hover={{
                color: colorMode === "dark" ? "main.300" : "main.400",
                bgColor: colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.100",
              }}
              _active={{
                bgColor: colorMode === "dark" ? "main.300" : "rgba(105,73,188, 0.5)",
              }}
              onClick={toggleColorMode}
            >
              {colorMode === "dark" ? <FaSun /> : <FaMoon />}
            </IconButton>

            <Menu id={id}>
              <MenuButton
                as={IconButton}
                isRound
                aria-label="config"
                bgColor={colorMode === "dark" ? "dark.100" : "white"}
                transition=".3s"
                _hover={{
                  bg: colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.100",
                }}
                _active={{
                  bgColor: colorMode === "dark" ? "main.300" : "rgba(105,73,188, 0.5)" ,
                }}
              >
                <Avatar
                  size="sm"
                  name={auth.currentUser?.displayName!}
                  src={auth.currentUser?.photoURL!}
                />
              </MenuButton>
              <MenuList 
              boxShadow="md" 
              bg={colorMode === "dark" ? "dark.200" : "white"}
              >
                <MenuGroup
                  color={colorMode === "dark" ? "dark.700" : "gray.500"}
                  textTransform="capitalize"
                  fontWeight="500"
                  title={auth.currentUser?.displayName!}
                >
                  <MenuDivider />

                  <MenuItem
                    id={id}
                    //variant="link"
                    w="100%"
                    onClick={() => onOpenModal("profile")}
                  >
                    <Text pl="5px">Meu perfil</Text>
                  </MenuItem>
                  <MenuItem
                    variant="link"
                    w="100%"
                    onClick={() => onOpenModal("confirmLogout")}
                  >
                    <Text pl="5px">Sair</Text>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}

export { ProjectsHeader };
