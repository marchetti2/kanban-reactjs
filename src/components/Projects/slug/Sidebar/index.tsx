import { Flex, Icon, Box, useDisclosure, Button, useColorMode } from "@chakra-ui/react";
import { BsKanban, BsQuestionCircle } from "react-icons/bs";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";

import { CustomButton } from "./CustomButton";
import { CreateIssueModal } from "./CreateIssueModal";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Project {
  id: string;
  userId:string;
  title: string;
  type: string;
  description?: string;
  leader: UserData;
  assignees?: Array<UserData>;
  createdAt: string;
}

interface SidebarProps {
  project: Project;
}

function Sidebar({project}:SidebarProps) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      className="sidebar"
      h="100%"
      w="64px"
      bgColor={colorMode === "dark" ? "main.300" : "main.400"}
      py="30px"
      flexDirection="column"
      position="absolute"
      alignItems="center"
      zIndex="1"
      transition=".3s"
      _hover={{
        width: "200px",
        boxShadow: "7px 0px 30px 0px rgba(32,32,36,0.3)",
      }}
    >
      <Icon as={BsKanban} w={9} h={9} color="white" />
      <Flex
        w="64px"
        h="100%"
        pt="50px"
        alignSelf="flex-start"
        alignItems="stretch"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Box>
          <CustomButton
            onClick={onOpen}
            icon={HiOutlinePlusSm}
            name="Criar problema"
          />
          <CreateIssueModal project={project}  isOpen={isOpen} onClose={onClose} />
          <CustomButton icon={IoSearchOutline} name="Procurar" />
        </Box>
        <CustomButton icon={BsQuestionCircle} name="Sobre" />
      </Flex>
    </Flex>
  );
}

export { Sidebar };

BsKanban;
