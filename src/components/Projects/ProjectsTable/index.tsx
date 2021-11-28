import {
  HStack,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useDisclosure, Box, Table
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Search2Icon } from "@chakra-ui/icons";

import { useProjects } from "../../../contexts/ProjectsContext";

import { CreateProjectModal } from "../CreateProject/CreateProjectModal";
import { TableHeader } from "./TableHeader";

interface ProjectsTableProps {
  children: ReactNode;
}

function ProjectsTable({ children }: ProjectsTableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { projects, setSearchListData, searchListData } = useProjects();

  function handleInputChange(inputValue: string) {
    if (inputValue !== "") {
      const filterByTitle = projects.filter(
        (project) =>
          project.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );

      if (filterByTitle !== undefined) {
        setSearchListData(filterByTitle);
        return;
      }

      if (projects.length === searchListData.length) {
        return;
      }
    }

    setSearchListData(projects);
    return;
  }

  return (
    <Flex as="main" h="calc(100vh - 80px)">
      <Flex p="30px 0" flexDir="column" w="1120px" m="0 auto">
        <Flex w="100%" h="100%" flexDir="column">
          {projects.length > 0 ? (
            <Flex
              h={{ base: "auto", sm: "40px" }}
              flexDir="row"
              //w="100%"
              w={{base:"100%", sm:"440px", md:"100%"}}
              m="0 auto 35px auto"
              alignItems={{ base: "center", sm: "normal" }}
              justifyContent="space-between"
            >
              <InputGroup
                h={{ base: "40px", sm: "100%" }}
                w={{ base: "340px", sm: "250px" }}
                m={{ base: "0 auto", sm: "0" }}
              >
                <Input
                  h="100%"
                  pl="20px"
                  color="gray.700"
                  bgColor="gray.50"
                  focusBorderColor="main.500"
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                <InputRightElement h="100%" pointerEvents="none">
                  <Search2Icon w={4} h={4} color="gray.300" />
                </InputRightElement>
              </InputGroup>

              <Button
                type="button"
                variant="session"
                w="140px"
                h={{ base: "40px", sm: "100%" }}
                display={{ base: "none", sm: "flex" }}
                transition="0"
                onClick={onOpen}
              >
                Criar projeto
              </Button>
            </Flex>
          ) : null}
          <CreateProjectModal onClose={onClose} isOpen={isOpen} />
          <Box 
          w={{base:"340px", sm:"440px", md:"100%"}}
          m="0 auto"
          >
          <Box display={{base:"none", md:"inline"}}>
            <Table size="sm">
              <TableHeader />
            </Table>
          </Box>
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export { ProjectsTable };
