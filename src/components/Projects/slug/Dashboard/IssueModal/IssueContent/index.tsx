import {
  Box,
  Flex, 
  Icon,
  Text,
  IconButton, 
  VStack, 
  Avatar,
  Button,
  Spinner,
  Tag,
  TagLabel,
  Divider, 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Input,
  ButtonGroup,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import {
  BiChevronUp,
  BiChevronDown,
  BiChevronsUp,
  BiChevronsDown,
} from "react-icons/bi";
import { HiMenuAlt4 } from "react-icons/hi";
import { CheckIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { useAuth } from "../../../../../../contexts/AuthContext";
import { useIssues } from "../../../../../../contexts/IssuesContext";
import { useComments } from "../../../../../../contexts/CommentsContext";

import { TextEditor } from "../../../../../../components/TextEditor";
import { AssigneesSelect } from "../../../../../../components/Projects/slug/Sidebar/CreateIssueModal/AssigneesSelect";
import { CommentsWrapper } from "./CommentsWrapper";
import { CreateComment } from "./CreateComment";

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

interface IssueContentProps {
  project: Project;
  issue: Issue;
}

function IssueContent({ project, issue }: IssueContentProps) {
  const { colorMode } = useColorMode(); 
  const { user } = useAuth();
  const { updateIssue, updatedIssueListener } = useIssues();
  const { comments, getComments } = useComments();

  const [isLoading, setLoading] = useState(false);
  const [assignees, setAssignees] = useState<Array<UserData>>([]);
  const [projectAssignees, setProjectAssignees] = useState<Array<UserData>>([]);

  const [status, setStatus] = useState(issue.status!);
  const [priority, setPriority] = useState(issue.priority!);

  const [description, setDescription] = useState(issue.description!);
  const [tempDescription, setTempDescription] = useState(issue.description!);
  const [isEditingDescription, setIsEditingDescription] = useState(
    !!!description
  );

  const [summary, setSummary] = useState(issue.summary!);
  const [tempSummary, setTempSummary] = useState(issue.summary!);
  const [isEditingSummary, setIsEditingSummary] = useState(false);

  const issueAssigneesFormatted = issue.assignees?.map((assignee) => {
    return { label: assignee.name, value: assignee.email, color: "gray.400" };
  });

  async function handleChangeIssueSummary() {
    setSummary(tempSummary);
    setIsEditingSummary(false);
    await updateIssue({ id: issue.id, summary: tempSummary });
  }

  async function handleSaveDescriptionChanges() {
    setLoading(true)
    setDescription(tempDescription);
    setIsEditingDescription(false);
    await updateIssue({ id: issue.id, description: tempDescription });
    setLoading(false)
  }

  async function handleChangeIssuePriority(priority: string) {
    setPriority(priority);
    await updateIssue({ id: issue.id, priority });
  }

  async function handleChangeIssueStatus(status: string) {
    setStatus(status);
    await updateIssue({ id: issue.id, status });
  }

  const getIssueStatus = useCallback(()=>{
    switch (status) {
      case "nao iniciado":
        return <Badge>Não iniciado</Badge>;
      case "em progresso":
        return <Badge colorScheme="blue">Em progresso</Badge>;
      case "concluido":
        return <Badge colorScheme="green">Concluído</Badge>;
      default:
        return {
        };
    }
  },[status])

  const getIssuePriority = useCallback(() => {
    switch (priority) {
      case "muito alta":
        return (
          <Flex alignItems="center">
            <Icon mr="12px" as={BiChevronsUp} w={5} h={5} color="red.500" />
            <Text>Muito alta</Text>
          </Flex>
        );
      case "alta":
        return (
          <Flex alignItems="center">
            <Icon mr="12px" as={BiChevronUp} w={5} h={5} color="red.400" />
            <Text>Alta</Text>
          </Flex>
        );
      case "media":
        return (
          <Flex alignItems="center">
            <Icon mr="12px" as={HiMenuAlt4} w={5} h={5} color="orange.500" />
            <Text>Média</Text>
          </Flex>
        );
      case "baixa":
        return (
          <Flex alignItems="center">
            <Icon mr="12px" as={BiChevronDown} w={5} h={5} color="green.400" />
            <Text>Baixa</Text>
          </Flex>
        );
      case "muito baixa":
        return (
          <Flex alignItems="center">
            <Icon mr="12px" as={BiChevronsDown} w={5} h={5} color="green.500" />
            <Text>Muito Baixa</Text>
          </Flex>
        );
      default:
        return;
    }
  },[priority])

  useEffect(() => {
    updatedIssueListener(project?.id);
    if (assignees.length > 0) {
      updateIssue({ id: issue.id, assignees });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignees]);

  useEffect(() => {
    getComments(issue.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issue.id]);

  return (
    <Flex
      margin="auto"
      h="100%"
      maxH="800px"
      w="100%"
      maxW="1152px"
      flexDir="column"
    >
      <Flex as="main" w="100%" h="100%" flexDir={{base:"column", md:"row"}} m="auto">
        <Flex
          w={{base:"100%", md:"60%"}}
          p="15px 15px 20px 20px"
          flexDir="column"
        >
          <Box>
            <Flex
              cursor="text"
              minH="40px"
              borderColor={isEditingSummary ? colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.200" : "none"}
              borderWidth={isEditingSummary ?colorMode === "dark" ? "0" : "1px" : "0"}
              borderRadius="6px"
              mb="20px"
              alignItems="center"
              bgColor={colorMode === "dark" ? isEditingSummary ? "rgba(153, 153, 153,0.175)" : "none": "none"}

            >
              <Flex
                id="preview-username-input"
                cursor="text"
                alignItems="center"
                display={isEditingSummary ? "none" : "flex"}
                onClick={() => setIsEditingSummary(true)}
                w="100%"
                h="100%"
                ml="1px"
              >
                <Text
                  fontSize="24px"
                  lineHeight="29px"
                  maxW="470px"
                >
                  {summary}
                </Text>
              </Flex>
              <Input
                display={isEditingSummary ? "flex" : "none"}
                type="text"
                border="none"
                w="100%"
                h="100%"
                bg="none"
                autoFocus
                pl="0"
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                }}
                value={tempSummary}
                onChange={(e: any) => setTempSummary(e.target.value)}
                fontSize="24px"
              />
              {isEditingSummary && (
                <ButtonGroup
                  justifyContent="center"
                  alignItems="center"
                  size="xs"
                  pr="5px"
                  fontSize="0"
                >
                  <IconButton
                    disabled={summary === tempSummary}
                    aria-label="Check Icon"
                    bg="none"
                    color={colorMode === "dark" ? "dark.800" : "gray.500"}
                    _hover={{
                      bg: "none",
                    }}
                    _focus={{
                      outline: "none",
                      boxShadow: "none",
                    }}
                    icon={<CheckIcon />}
                    onClick={handleChangeIssueSummary}
                  />
                  <IconButton
                    aria-label="Close Icon"
                    bg="none"
                    color={colorMode === "dark" ? "dark.800" : "gray.500"}
                    _hover={{
                      bg: "none",
                    }}
                    _focus={{
                      outline: "none",
                      boxShadow: "none",
                    }}
                    icon={<CloseIcon />}
                    onClick={() => {
                      setTempSummary(summary);
                      return setIsEditingSummary(false);
                    }}
                  />
                </ButtonGroup>
              )}
            </Flex>

            <Flex flexDir="column" mb="20px">
              <Text mb="5px" fontSize="15px">
                Descrição
              </Text>

              {!isEditingDescription ? (
                <>
                  <Flex
                    minHeight="50px"
                    flexDir="column"
                    dangerouslySetInnerHTML={{
                      __html: description!,
                    }}
                    sx={{
                      li: {
                        marginLeft: "40px",
                        fontSize: "24px",
                        fontWeight: "400",
                        color: "gray.700",
                      },
                      a: {
                        color: "blue",
                        transition: ".3s",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      },
                      ".ql-size-small": {
                        fontSize: "16px",
                        fontWeight: "400",
                      },
                      p: {
                        fontSize: "24px",
                      },
                      ".ql-size-large": {
                        fontSize: "32px",
                      },
                      ".ql-size-huge": {
                        fontSize: "40px",
                      },
                    }}
                    onClick={() => setIsEditingDescription(true)}
                    cursor="text"
                    pl="14px"
                  />
                </>
              ) : (
                <Box>
                  <TextEditor
                    setTempDescription={setTempDescription}
                    tempDescription={tempDescription!}
                  />
                  <Flex mt="8px" h="32px">
                    <Button
                    variant="modal-cancel"
                      w="70px"
                      h="32px"
                      mr={2}
                      fontSize="13px"
                      onClick={() => {
                        setTempDescription(description);
                        return setIsEditingDescription(false);
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                    variant="modal-submit"
                      w="70px"
                      h="32px"
                      fontSize="13px"
                      onClick={handleSaveDescriptionChanges}
                    >
                      {isLoading ? <Spinner color="white" /> : "Salvar"}
                    </Button>
                  </Flex>
                </Box>
              )}
            </Flex>
          </Box>

          <Box>
            <Flex
              flexDir="column"
              //m="auto 0 0 0"
            >
              <Text mb="15px" fontSize="15px">
                Comentarios
              </Text>

              <Box>
                <CreateComment issueId={issue.id} />
              </Box>

              <Box maxH="200px" overflowY="auto">
                {comments?.map((comment) => (
                  <CommentsWrapper key={comment.id} commentData={comment} />
                ))}
              </Box>
            </Flex>
          </Box>
        </Flex>

        <Flex w={{base:"100%", md:"40%"}} h="100%" p="10px 20px 20px 15px">
          <Flex flexDir="column" w="100%" pt="10px">
            <Box mb="20px">
              <Text fontWeight="500" mb="5px">
                Situação
              </Text>

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  h="40px"
                  bgColor={colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50"}
                  fontSize="16px"
                  fontWeight="400"
                  borderWidth="1px"
                  borderColor={ colorMode === "dark" ? "#202024" : "#E2E8F0"}
                  textAlign="left"
                  pl="10px"
                  pr="10px"
                  w="100%"
                  value={status}
                  _focus={{
                    outline: "none",
                    boxShadow: "none",
                  }}
                  _hover={{
                    bgColor: colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50",
                    borderColor: colorMode === "dark" ? "dark.300" : "gray.300",
                  }}
                >
                  {getIssueStatus()}
                </MenuButton>
                <MenuList 
                bg={colorMode === "dark" ? "dark.200" : "white"}
                w="250px"                
                >
                  <MenuItem
                    minH="40px"
                    onClick={() => handleChangeIssueStatus("nao iniciado")}
                  >
                    <Badge>Não iniciado</Badge>
                  </MenuItem>
                  <MenuItem
                    minH="40px"
                    onClick={() => handleChangeIssueStatus("em progresso")}
                  >
                    <Badge colorScheme="blue">Em progresso</Badge>
                  </MenuItem>
                  <MenuItem
                    minH="40px"
                    onClick={() => handleChangeIssueStatus("concluido")}
                  >
                    <Badge colorScheme="green">Concluído</Badge>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>

            <Box mb="20px">
              <Text fontWeight="500" mb="10px">
                Líder
              </Text>

              <Tag 
              size="lg" 
              borderRadius="full" 
              bgColor={colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.200"}
              >
                <Avatar
                  src={user.avatar}
                  size="xs"
                  name={user.name}
                  ml={-1}
                  mr={2}
                />
                <TagLabel>{user.name}</TagLabel>
              </Tag>
            </Box>

            <Box mb="20px">
              <Text fontWeight="500" mb="5px">
                Responsáveis
              </Text>

              <Box w="100%">
                <AssigneesSelect
                  setAssignees={setAssignees}
                  project={project}
                  assignees={issueAssigneesFormatted}
                  setProjectAssignees={setProjectAssignees}
                />
              </Box>
            </Box>

            <Box mb="20px">
              <Text fontWeight="500" mb="5px">
                Prioridade
              </Text>

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<Icon as={BiChevronDown} w={5} h={5} />}
                  h="40px"
                  bgColor={colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50"}
                  fontSize="16px"
                  fontWeight="400"
                  borderWidth= "1px" 
                  borderColor={ colorMode === "dark" ? "#202024" : "#E2E8F0"}
                  textAlign="left"
                  pl="10px"
                  pr="10px"
                  w="100%"
                  value={priority}
                  _focus={{
                    outline: "none",
                    boxShadow: "none",
                  }}
                  _hover={{
                    bgColor: colorMode === "dark" ? "rgba(153, 153, 153,0.175)" : "gray.50",
                    borderColor: colorMode === "dark" ? "dark.300" : "gray.300",
                  }}
                >
                  {getIssuePriority()}
                </MenuButton>
                <MenuList 
                w="250px"
                bg={colorMode === "dark" ? "dark.200" : "white"}

                >
                  <MenuItem
                    minH="40px"
                    onClick={() => handleChangeIssuePriority("muito alta")}
                  >
                    <Flex alignItems="center">
                      <Icon
                        mr="12px"
                        as={BiChevronsUp}
                        w={5}
                        h={5}
                        color="red.500"
                      />
                      <Text>Muito alta</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    minH="40px"
                    onClick={() => handleChangeIssuePriority("alta")}
                  >
                    <Flex alignItems="center">
                      <Icon
                        mr="12px"
                        as={BiChevronUp}
                        w={5}
                        h={5}
                        color="red.400"
                      />
                      <Text>Alta</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    minH="40px"
                    onClick={() => handleChangeIssuePriority("media")}
                  >
                    <Flex alignItems="center">
                      <Icon
                        mr="12px"
                        as={HiMenuAlt4}
                        w={5}
                        h={5}
                        color="orange.500"
                      />
                      <Text>Média</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    minH="40px"
                    onClick={() => handleChangeIssuePriority("baixa")}
                  >
                    <Flex alignItems="center">
                      <Icon
                        mr="12px"
                        as={BiChevronDown}
                        w={5}
                        h={5}
                        color="green.400"
                      />
                      <Text>Baixa</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    minH="40px"
                    onClick={() => handleChangeIssuePriority("muito baixa")}
                  >
                    <Flex alignItems="center">
                      <Icon
                        mr="12px"
                        as={BiChevronsDown}
                        w={5}
                        h={5}
                        color="green.500"
                      />
                      <Text>Muito Baixa</Text>
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>

            <Divider borderColor={colorMode === "dark" ? "dark.500" : "gray.300"} mb="20px" />

            <VStack alignItems="flex-start">
              <Text fontSize="13px">{`Criado em ${issue.createdAt}`}</Text>
              {issue.updatedAt ? (
                <Text fontSize="13px">{`Atualizado em ${issue.updatedAt}`}</Text>
              ) : null}
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export { IssueContent };
