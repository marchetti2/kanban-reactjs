import {
  HStack,
  Heading,
  Avatar,
  AvatarGroup,
  //Icon,
  Badge,
  Flex,
  Tooltip,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  Icon,
  MenuList,
  Text,
  IconButton,
} from "@chakra-ui/react";
import {
  BiChevronUp,
  BiChevronDown,
  BiChevronsUp,
  BiChevronsDown,
} from "react-icons/bi";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoCheckbox, IoCopy, IoAlertCircleSharp } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Draggable } from "react-beautiful-dnd";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
interface IssueCardProps {
  id: string;
  assignees: Array<UserData> | undefined;
  summary: string;
  type: string;
  index: any;
  priority: string;
  onOpenModal: (issueId: string, modalName: string) => void | Promise<boolean>;
}

function IssueCard({
  id,
  summary,
  assignees,
  index,
  priority,
  type,
  onOpenModal,
}: IssueCardProps) {
  function handlePriorityIcon(priority: string) {
    switch (priority) {
      case "muito alta":
        return <Icon as={BiChevronsUp} w={5} h={5} color="red.500" />;
      case "alta":
        return <Icon as={BiChevronUp} w={5} h={5} color="red.400" />;
      case "media":
        return <Icon as={HiMenuAlt4} w={5} h={5} color="orange.500" />;
      case "baixa":
        return <Icon as={BiChevronDown} w={5} h={5} color="green.400" />;
      case "muito baixa":
        return <Icon as={BiChevronsDown} w={5} h={5} color="green.500" />;
      default:
        break;
    }
  }

  function handleTypeIcon(type: string) {
    switch (type) {
      case "tarefa":
        return <Icon as={IoCheckbox} w={5} h={5} color="#4bade8" />;
      case "subtarefa":
        return <Icon as={IoCopy} w={5} h={5} color="green.400" />;
      case "erro":
        return <Icon as={IoAlertCircleSharp} w={5} h={5} color="red.500" />;
      default:
        break;
    }
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Flex
          display="block"
          marginBottom="5px"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
          position="relative"
        >
          <Box zIndex="1" position="absolute" top="7px" right="10px">
            <Menu placement="left">
              <MenuButton
                as={IconButton}
                variant="unstyled"
                isRound
                aria-label="config"
                transition=".3s"
                _hover={{
                  bgColor: "gray.100",
                }}
                _active={{
                  bgColor: "gray.200",
                }}
                size="sm"
                justifyContent="center"
                alignItems="center"
                fontSize="0"
              >
                <Icon
                  as={HiOutlineDotsHorizontal}
                  w={4}
                  h={4}
                  color="gray.500"
                />
              </MenuButton>
              <MenuList minWidth="80px" p="0">
                <Button
                  variant="link"
                  w="100%"
                  onClick={() => onOpenModal(id, "confirmDelete")}
                >
                  <MenuItem>
                    <Text pl="5px">Excluir</Text>
                  </MenuItem>
                </Button>
              </MenuList>
            </Menu>
          </Box>

          <Flex
            w="310px"
            m="auto"
            minH="90px"
            flexDir="column"
            justifyContent="space-between"
            bgColor="white"
            borderRadius="4px"
            p="12px"
            transition=".3s"
            _hover={{
              bgColor: "gray.100",
            }}
            transform={
              snapshot.isDragging && !snapshot.isDropAnimating
                ? "rotate(-1.75deg)"
                : "rotate(0)"
            }
            boxShadow={
              snapshot.isDragging
                ? "5px 10px 30px 0px rgba(9, 30, 66, 0.15)"
                : "md" //"0px 1px 2px rgba(9, 30, 66, 0.25)"
            }
            userSelect="none"
            onClick={() => onOpenModal(id, "issue")}
            //position="relative"
          >
            <Heading
              maxW="250px"
              fontWeight="500"
              textAlign="left"
              fontSize="15px"
              lineHeight="18px"
              pb="10px"
            >
              {summary}
            </Heading>
            <HStack justifyContent="space-between">
              <Flex>
                <Tooltip
                  textTransform="capitalize"
                  label={type}
                  gutter={2}
                  fontSize="13px"
                  fontFamily="Inter"
                >
                  <Box mr="5px">{handleTypeIcon(type)}</Box>
                </Tooltip>
                <Tooltip
                  label={`Prioridade ${priority}`}
                  gutter={2}
                  fontSize="13px"
                  fontFamily="Inter"
                >
                  <Box>{handlePriorityIcon(priority)}</Box>
                </Tooltip>
              </Flex>

              <AvatarGroup
                size="xs"
                max={4}
                borderColor="light.100"
                spacing={-1}
              >
                {assignees?.map((assignee) => (
                  <Box key={assignee.email} h="24px" w="24px">
                    <Tooltip
                      label={assignee.name}
                      gutter={2}
                      fontSize="13px"
                      fontFamily="Inter"
                    >
                      <Avatar
                        //ml={-1}
                        //borderWidth="1px"
                        //borderColor="light.100"
                        size="xs"
                        name={assignee.name}
                        src={assignee.avatar}
                      />
                    </Tooltip>
                  </Box>
                ))}
              </AvatarGroup>
            </HStack>
          </Flex>
        </Flex>
      )}
    </Draggable>
  );
}

export { IssueCard };

{
  /* <Badge ml="1" colorScheme="green">
New
</Badge> 

            <AvatarGroup size="xs" max={4} borderColor="light.100" spacing={-1}>
              {assignees?.map((assignee) => (
                            <Tooltip key={assignee.email}label={assignee.name} gutter={2} fontSize="13px"
                  fontFamily="Inter">
                            <Box>
                            <Avatar
                            ml={-1}
                            borderWidth="1px"
                            borderColor="light.100"
                  size="xs"
                  name={assignee.name}
                  src={assignee.avatar}
                />
                            </Box>
                          </Tooltip>

              ))}
            </AvatarGroup>



*/
}
