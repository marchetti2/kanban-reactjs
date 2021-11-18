import { HStack, VStack, Text, Table, Thead, Tr, Th } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";

import { useProjects } from "../../../../contexts/ProjectsContext";
import { useAuth } from "../../../../contexts/AuthContext";

function TableHeader() {
  const [toggleFilter, setToggleFilter] = useState(false);


  const { getAllProjects,  projects } = useProjects();
  const { user } = useAuth();

  function handleFilter(name: string) {
    getAllProjects({
      filterParam: name,
      orderByParam: toggleFilter ? "desc" : "asc",
      userId: user.id
    });
    setToggleFilter(!toggleFilter);
  }

  return (
    <Table size="sm">
      <Thead>
        <Tr h="56px" pointerEvents={projects.length > 0 ? "auto" : "none"}>
          <Th
            w="460px"
            borderBottomColor="gray.300"
            transition=".3s"
            _hover={{
              bgColor: "gray.100",
            }}
            _active={{
              bgColor: "gray.200",
            }}
          >
            <HStack as="button" onClick={() => handleFilter("title")}>
              <Text textTransform="uppercase" letterSpacing=".5px">
                Nome
              </Text>
              <VStack spacing="0">
                <ChevronUpIcon
                  w="10px"
                  h="10px"
                  transform="translateY(2.5px)"
                  color={toggleFilter ? "gray.300" : "rgba(94, 108, 132, .7)"}
                />
                <ChevronDownIcon
                  w="10px"
                  h="10px"
                  transform="translateY(-2.5px)"
                  color={toggleFilter ? "rgba(94, 108, 132, .7)" : "gray.300"}
                />
              </VStack>
            </HStack>
          </Th>
          <Th
            w="195px"
            borderBottomColor="gray.300"
            transition=".3s"
            _hover={{
              bgColor: "gray.100",
            }}
            _active={{
              bgColor: "gray.200",
            }}
          >
            <HStack as="button" onClick={() => handleFilter("type")}>
              <Text textTransform="uppercase" letterSpacing=".5px">
                Tipo
              </Text>
              <VStack spacing="0">
                <ChevronUpIcon
                  w="10px"
                  h="10px"
                  transform="translateY(2.5px)"
                  color={toggleFilter ? "gray.300" : "rgba(94, 108, 132, .7)"}
                />
                <ChevronDownIcon
                  w="10px"
                  h="10px"
                  transform="translateY(-2.5px)"
                  color={toggleFilter ? "rgba(94, 108, 132, .7)" : "gray.300"}
                />
              </VStack>
            </HStack>
          </Th>
          <Th
            w="195px"
            borderBottomColor="gray.300"
            transition=".3s"
            _hover={{
              bgColor: "gray.100",
            }}
            _active={{
              bgColor: "gray.200",
            }}
          >
            <HStack as="button" onClick={() => handleFilter("leader")}>
              <Text textTransform="uppercase" letterSpacing=".5px">
                Lider
              </Text>
              <VStack spacing="0">
                <ChevronUpIcon
                  w="10px"
                  h="10px"
                  transform="translateY(2.5px)"
                  color={toggleFilter ? "gray.300" : "rgba(94, 108, 132, .7)"}
                />
                <ChevronDownIcon
                  w="10px"
                  h="10px"
                  transform="translateY(-2.5px)"
                  color={toggleFilter ? "rgba(94, 108, 132, .7)" : "gray.300"}
                />
              </VStack>
            </HStack>
          </Th>
          <Th
            w="120px"
            borderBottomColor="gray.300"
            transition=".3s"
            _hover={{
              bgColor: "gray.100",
            }}
            _active={{
              bgColor: "gray.200",
            }}
          >
            <HStack as="button" onClick={() => handleFilter("createdAt")}>
              <Text textTransform="uppercase" letterSpacing=".5px">
                Data
              </Text>
              <VStack spacing="0">
                <ChevronUpIcon
                  w="10px"
                  h="10px"
                  transform="translateY(2.5px)"
                  color={toggleFilter ? "gray.300" : "rgba(94, 108, 132, .7)"}
                />
                <ChevronDownIcon
                  w="10px"
                  h="10px"
                  transform="translateY(-2.5px)"
                  color={toggleFilter ? "rgba(94, 108, 132, .7)" : "gray.300"}
                />
              </VStack>
            </HStack>
          </Th>
          <Th w="70px" borderBottomColor="gray.300"></Th>
        </Tr>
      </Thead>
    </Table>
  );
}

export { TableHeader };
