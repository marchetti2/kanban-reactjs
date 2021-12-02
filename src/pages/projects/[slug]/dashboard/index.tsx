import {
  SimpleGrid,
  Box,
  HStack,
  Flex,
  Heading,
  useColorMode,
} from "@chakra-ui/react";

import { Header } from "../../../../components/Projects/slug/Header";
import { FilterAndSearchBar } from "../../../../components/Projects/slug/Dashboard/FilterAndSearchBar";
import { IssuesWrapper } from "../../../../components/Projects/slug/Dashboard/IssuesWrapper";
import { CommentsProvider } from "../../../../contexts/CommentsContext";

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

interface DashboardProps {
  project: Project;
}

function Dashboard({ project }: DashboardProps): JSX.Element {
  const { colorMode } = useColorMode();
  return (
    <CommentsProvider>
      <Header projectTitle={project?.title} current="Quadro de problemas" />
      <FilterAndSearchBar project={project} />
      <Box h="410px" w="calc(100vw - 334px)">
        <Flex justifyContent="space-between" w="980px">
          <Box
            w="320px"
            h="50px"
            borderRadius="6px 6px 0 0"
            bgColor={colorMode === "dark" ? "dark.300" : "gray.50"}
          >
            <Heading variant="kanban-board-status" m="15px 10px">
              não iniciado
            </Heading>
          </Box>
          <Box
            w="320px"
            h="50px"
            borderRadius="6px 6px 0 0"
            bgColor={colorMode === "dark" ? "dark.300" : "gray.50"}
          >
            <Heading variant="kanban-board-status" m="15px 10px">
              em progresso
            </Heading>
          </Box>
          <Box
            w="320px"
            h="50px"
            borderRadius="6px 6px 0 0"
            bgColor={colorMode === "dark" ? "dark.300" : "gray.50"}
          >
            <Heading variant="kanban-board-status" m="15px 10px">
              concluído
            </Heading>
          </Box>
        </Flex>
        <Box
          maxH="360px"
          //w="calc(100vw - 334px)"
          overflowY="auto"
          overflowX="hidden"
          w="1000px"
        >
          {console.log(project)}
          <IssuesWrapper project={project} />
        </Box>
      </Box>
    </CommentsProvider>
  );
}

export default Dashboard;
