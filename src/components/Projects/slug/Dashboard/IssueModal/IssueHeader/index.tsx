import { Flex, HStack, Icon, Text, IconButton, useDisclosure, Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge, Button
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { IoCheckbox, IoPaperPlaneOutline, IoCopy, IoAlertCircleSharp } from "react-icons/io5";
import { FiTrash2, FiLink } from "react-icons/fi";

import { ConfirmDeleteModal } from '../../IssuesWrapper/ConfirmDeleteModal'
import { Dispatch, SetStateAction, useState } from "react";
import { useIssues } from "../../../../../../contexts/IssuesContext";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Project {
  id: string;
  userId: string;
  title: string;
  type: string;
  description?: string;
  leader: UserData;
  assignees?: Array<UserData>;
  createdAt: string;
}

interface Issue {
  id: string;
  projectId: string;
  status: string;
  summary: string;
  type: string;
  description?: string;
  leader: string;
  assignees?: Array<UserData>;
  createdAt: string;
  updatedAt: string;
  priority: string;
}

interface IssueHeaderProps {
  id: string | undefined; 
  project: Project;
  onCloseModal: ()=>void;
  issue: Issue;
}

function IssueHeader({id, project, onCloseModal, issue }: IssueHeaderProps) {

  const { isOpen, onClose, onOpen } = useDisclosure()
  const { deleteIssue,updateIssue, updatedIssueListener, issues} = useIssues();
  
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState(issue.type)
  
  async function handleDelete(id: any) {
    setLoading(true);
    try {
      await deleteIssue(id);
    } finally {
      onCloseModal();
      onClose()
      //setLoading(false);
      updatedIssueListener(project?.id);
    }
  }
  
  function GetIssueType() {
    switch (type) {
      case "tarefa":
        return <Icon as={IoCheckbox} w={5} h={5} color="#4bade8" />

      case "subtarefa":
        return <Icon as={IoCopy} w={5} h={5} color="green.400" />

      case "erro":
        return <Icon as={IoAlertCircleSharp} w={5} h={5} color="red.500"/>

      default:
        return <Box/>
    }
  }

  async function handleChangeIssueType(type:string){
    setType(type)
    await updateIssue({id: issue.id,  type})
  }

  return (
    <>
    <ConfirmDeleteModal
    isOpen={isOpen}
    onClose={onClose}
    handleDelete={handleDelete}
    id={id}
    isLoading={loading}
    />
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      pl="35px"
      pr="40px"
    >
      <HStack 
      alignItems="center" 
      justifyContent="center" 
      fontSize="0"
      >
      <Menu>
        <MenuButton >
          <GetIssueType />
        </MenuButton>
        <MenuList w="180px">
          <MenuItem
            minH="40px"
            onClick={() => handleChangeIssueType("tarefa")}
          >
            <Flex alignItems="center" justifyContent="center" fontSize="0" >
              <Icon as={IoCheckbox} mr="10px" w={5} h={5} color="#4bade8" />
              <Text>Tarefa</Text>
            </Flex>
          </MenuItem>
          <MenuItem
            minH="40px"
            onClick={() => handleChangeIssueType("subtarefa")}
          >
            <Flex alignItems="center" justifyContent="center" fontSize="0" >
              <Icon as={IoCopy} mr="10px"  w={5} h={5} color="green.400" />
              <Text>Subtarefa</Text>
            </Flex>
          </MenuItem>
          <MenuItem minH="40px" onClick={() => handleChangeIssueType("erro")}>
            <Flex alignItems="center" justifyContent="center" fontSize="0" >
              <Icon as={IoAlertCircleSharp} mr="10px"  w={5} h={5} color="red.500"/>
              <Text>Erro</Text>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>

        
        <Text textTransform="capitalize">{`${type}`}</Text>
      </HStack>

      <HStack spacing="7px">
        <HStack
          as="button"
          p="12px"
          h="32px"
          transition=" .3s"
          _hover={{
            bgColor: "light.200",
          }}
          _active={{
            bgColor: "light.300",
          }}
          borderRadius="6px"
          my="4px"
        >
          <Icon as={IoPaperPlaneOutline} w={5} h={5} color="light.600" />
          <Text>Feedback</Text>
        </HStack>
        <HStack
          as="button"
          p="12px"
          h="32px"
          transition=" .3s"
          _hover={{
            bgColor: "light.200",
          }}
          _active={{
            bgColor: "light.300",
          }}
          borderRadius="6px"
        >
          <Icon as={FiLink} w={5} h={5} color="light.600" />
          <Text>Copiar o link</Text>
        </HStack>

        <IconButton
          variant="unstyled"
          aria-label="Call Segun"
          fontSize="0"
          p="12px"
          h="32px"
          transition=" .3s"
          _hover={{
            bgColor: "light.200",
          }}
          _active={{
            bgColor: "light.300",
          }}
          borderRadius="6px"
          onClick={onOpen}
        >
          <Icon as={FiTrash2} w={5} h={5} color="light.600" />
        </IconButton>
      </HStack>
    </Flex>
    </>
  );
}

export { IssueHeader };
