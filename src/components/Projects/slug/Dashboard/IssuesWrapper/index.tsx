import {
  Flex,
  VStack,
  Heading,
  Box,
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  Icon,
  MenuList,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { useIssues } from "../../../../../contexts/IssuesContext";

import { IssueModal } from "../IssueModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

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

interface IIssue {
  id: string;
  list: Issue[];
}

interface IObjectKeys {
  [key: string]: IIssue;
}

interface IssueWrapper extends IObjectKeys {
  "nao iniciado": {
    id: string;
    list: Issue[];
  };
  "em progresso": {
    id: string;
    list: Issue[];
  };
  concluido: {
    id: string;
    list: Issue[];
  };
}

interface IssuesWrapperProps {
  project: Project;
}

import { IssueCard } from "./IssueCard";

function IssuesWrapper({ project }: IssuesWrapperProps) {
  const router = useRouter();
  const { onClose } = useDisclosure();
  const {
    issues,
    updateIssue,
    getIssues,
    deleteIssue,
    updatedIssueListener,
    searchListIssueData,
  } = useIssues();

  const [id, setId] = useState("");
  const [issue, setIssue] = useState({} as Issue);
  const [isLoading, setLoading] = useState(false);
  const [loadingCloseModal, setLoadingCloseModal] = useState(false);
  const [columns, setColumns] = useState<IssueWrapper>({} as IssueWrapper);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenIssue, setIsOpenIssue] = useState(false);

  const onDragEnd = async ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      newList.splice(destination.index, 0, start.list[source.index]);

      const newCol = {
        id: start.id,
        list: newList,
      };

      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      const newEndList = end.list;

      newEndList.splice(destination.index, 0, start.list[source.index]);

      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));

      await updateIssue({ id: start.list[source.index].id, status: end.id });
      return null;
    }
  };

  function onOpenModal(issueId: string, modalName: string) {
    const issue = searchListIssueData.find(
      (issue: Issue) => issue.id === issueId
    );
    setIssue(issue!);
    setId(issueId);

    if (modalName === "confirmDelete") {
      return setIsOpenConfirmDelete(true);
    }

    if (modalName === "issue") {
      setIsOpenIssue(true);
      return router.push(`/projects/${project?.id}?issue=${issueId}`);
    }
  }

  function onCloseModal() {
    setLoading(true);
    setIsOpenConfirmDelete(false);

    if (isOpenIssue) {
      setIsOpenIssue(false);
      router.push(`/projects/${project?.id}`);
    }
    setLoading(false);
    return;
  }

  async function handleDelete(id: any) {
    setLoading(true);
    try {
      await deleteIssue(id);
    } finally {
      onCloseModal();
      setLoading(false);
      updatedIssueListener(project?.id);
    }
  }

  useEffect(() => {
    getIssues(project?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

  function handleIssues() {
    const columns: IssueWrapper = {
      "nao iniciado": {
        id: "nao iniciado", //"nao iniciado",
        list: [],
      },
      "em progresso": {
        id: "em progresso",
        list: [],
      },
      concluido: {
        id: "concluido",
        list: [],
      },
    };

    searchListIssueData.map((issue) => {
      if (issue.status === "nao iniciado") {
        columns["nao iniciado"].list.push(issue);
      }

      if (issue.status === "em progresso") {
        columns["em progresso"].list.push(issue);
      }

      if (issue.status === "concluido") {
        columns["concluido"].list.push(issue);
      }
    });

    return columns;
  }

  useEffect(() => {
    const response = handleIssues();
    setColumns(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchListIssueData]);

  useEffect(() => {
    setLoadingCloseModal(false);
  }, [router.query.issue]);

  return (
    <>
      <ConfirmDeleteModal
        isOpen={isOpenConfirmDelete}
        onClose={onCloseModal}
        handleDelete={handleDelete}
        id={id}
        isLoading={isLoading}
      />
      <IssueModal
        project={project}
        issue={issue}
        isOpen={isOpenIssue}
        onCloseModal={onCloseModal}
        setLoadingCloseModal={setLoadingCloseModal}
        loadingCloseModal={loadingCloseModal}
        id={id}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex
          //maxH="360px"
          justifyContent="space-between"
          w="980px"
        >
          {Object.values(columns).map((column) => (
            <Flex
              key={column.id}
              w="320px"
              minH="210px"
              borderRadius="0 0 6px 6px"
              flexDirection="column"
              alignItems="stretch"
              bgColor="gray.50"
            >
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <Flex
                    flexDirection="column"
                    h="100%"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {column.list.map((card: Issue, index: number) => (
                      <Flex key={card.id}>
                        <Box m="auto">
                          <IssueCard
                            index={index}
                            id={card.id}
                            type={card.type}
                            priority={card.priority}
                            summary={card.summary}
                            assignees={card.assignees}
                            onOpenModal={onOpenModal}
                          />
                        </Box>
                      </Flex>
                    ))}
                    {provided.placeholder}
                  </Flex>
                )}
              </Droppable>
            </Flex>
          ))}
        </Flex>
      </DragDropContext>
    </>
  );
}

export { IssuesWrapper };
