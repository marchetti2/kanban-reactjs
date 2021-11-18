import {
  Flex,
  Text,
  Heading,
  IconButton,
  useColorMode,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  SkeletonText,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useId } from "@reach/auto-id";

import { ConfirmLogoutModal } from "../../Header/ConfirmLogoutModal";
import { ProfileModal } from "../../Header/ProfileModal";
import { Notifications } from "../../Header/Notifications";

import { auth } from "../../../../services/firebase";

interface HeaderProps {
  current: string;
  projectTitle: string;
}

function Header({ projectTitle, current }: HeaderProps) {
  const [isOpenConfirmLogout, setIsOpenConfirmLogout] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const id = useId();
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
      <Flex flexDirection="row" justifyContent="space-between">
        <Flex flexDirection="column" align="flex-start">
          <HStack mb="10px">
            <Link href="/projects" passHref>
              <Text
                fontSize="15px"
                fontFamily="Inter"
                cursor="pointer"
                _hover={{
                  color: "gray.700",
                  textDecoration: "underline",
                }}
              >
                Projetos
              </Text>
            </Link>
            <Text fontSize="15px" fontFamily="Inter">
              {" "}
              /{" "}
            </Text>
            {projectTitle === undefined ? (
              <SkeletonText w="120px" noOfLines={1} />
            ) : (
              <Text
                maxW="200px"
                fontSize="15px"
                fontFamily="Inter"
                textTransform="capitalize"
                isTruncated
              >
                {projectTitle}
              </Text>
            )}
          </HStack>

          <Heading fontSize="24px" fontWeight="500" mb="30px">
            {current}
          </Heading>
        </Flex>
        <HStack spacing="15px" alignItems="flex-start">
          <Notifications />

          <IconButton
            isRound
            aria-label="Color-mode"
            bgColor="light.100"
            color="light.700"
            transition=".3s"
            _hover={{
              color: "main.400",
              bgColor: "gray.100",
            }}
            _active={{
              bgColor: "rgba(105,73,188, 0.5)",
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
              bgColor="light.100"
              transition=".3s"
              _hover={{
                bg: "gray.100",
              }}
              _active={{
                bgColor: "rgba(105,73,188, 0.5)",
              }}
            >
              <Avatar
                size="sm"
                name={auth.currentUser?.displayName!}
                src={auth.currentUser?.photoURL!}
              />
            </MenuButton>
            <MenuList boxShadow="md">
              <MenuGroup
                color="light.600"
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
    </>
  );
}

export { Header };
