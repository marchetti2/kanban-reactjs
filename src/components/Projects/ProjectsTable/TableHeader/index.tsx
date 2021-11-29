import { HStack, VStack, Text, Box, Thead, Tr, Th, useColorMode } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";

import { useProjects } from "../../../../contexts/ProjectsContext";
import { useAuth } from "../../../../contexts/AuthContext";

function TableHeader() {
  const [toggleFilter, setToggleFilter] = useState(false);
  const { colorMode } = useColorMode();
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
      <Thead>
        <Tr
        h={{
          base: "42.5px",
          sm: "48px",
          md: "56px",
        }}
        pointerEvents={projects.length > 0 ? "auto" : "none"}
        >
          <Th
            w="460px"
            borderBottomColor={colorMode === "dark" ? "dark.500" : "gray.300"}
            transition=".3s"
            _hover={{
              bgColor: colorMode === "dark" ? "dark.200" : "gray.100"
            }}
            _active={{
              bgColor: colorMode === "dark" ? "dark.300" : "gray.200" 
            }}
          >
            <HStack 
            as="button" 
            spacing={{
              base: "4px",
              sm: "8px"
            }} 
            onClick={() => handleFilter("title")}
            >
              <Text 
              textTransform="uppercase" 
              //letterSpacing=".5px"
              fontSize={{ base: "11px", sm: "13px", md:"14px"}}
              >
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
            borderBottomColor={colorMode === "dark" ? "dark.500" : "gray.300"}
            transition=".3s"
            _hover={{
              bgColor: colorMode === "dark" ? "dark.200" : "gray.100"
            }}
            _active={{
              bgColor: colorMode === "dark" ? "dark.300" : "gray.200" 
            }}
          >
            <HStack as="button" spacing={{
              base: "4px",
              sm: "8px"
            }}  onClick={() => handleFilter("type")}>
              <Text 
              textTransform="uppercase" 
              //letterSpacing=".5px"
              fontSize={{ base: "11px", sm: "13px", md:"14px"}}
              >
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
            borderBottomColor={colorMode === "dark" ? "dark.500" : "gray.300"}
            transition=".3s"
            _hover={{
              bgColor: colorMode === "dark" ? "dark.200" : "gray.100"
            }}
            _active={{
              bgColor: colorMode === "dark" ? "dark.300" : "gray.200" 
            }}
          >
            <HStack as="button" spacing={{
              base: "4px",
              sm: "8px"
            }}  onClick={() => handleFilter("leader")}>
              <Text 
              textTransform="uppercase" 
              //letterSpacing=".5px"
              fontSize={{ base: "11px", sm: "13px", md:"14px"}}
              >
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
            borderBottomColor={colorMode === "dark" ? "dark.500" : "gray.300"}
            transition=".3s"
            _hover={{
              bgColor: colorMode === "dark" ? "dark.200" : "gray.100"
            }}
            _active={{
              bgColor: colorMode === "dark" ? "dark.300" : "gray.200" 
            }}
          >
            <HStack as="button" spacing={{
              base: "4px",
              sm: "8px"
            }}  onClick={() => handleFilter("createdAt")}>
              <Text 
              textTransform="uppercase" 
              //letterSpacing=".5px"
              fontSize={{ base: "11px", sm: "13px", md:"14px"}}
              >
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
          <Th 
          w="70px"
         
          borderBottomColor={colorMode === "dark" ? "dark.500" : "gray.300"}
          />
        </Tr>
      </Thead>
  );
}

export { TableHeader };
