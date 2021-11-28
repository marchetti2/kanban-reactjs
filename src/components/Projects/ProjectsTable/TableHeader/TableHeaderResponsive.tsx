import { HStack, VStack, Text, Thead, Tr, Th } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";

import { useProjects } from "../../../../contexts/ProjectsContext";
import { useAuth } from "../../../../contexts/AuthContext";

function TableHeaderResponsive() {
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
      <Thead 
      opacity={{
        base: "1",
        md:"0",
      }}
      visibility={{
        base: "visible",
        md: "hidden",
      }}
      >
        <Tr
        h={{
          base: "42.5px",
          md: "0",
        }}
        pointerEvents={projects.length > 0 ? "auto" : "none"}
        >
          
          <Th
          p={{
            base: "4px 16px",
            md: "0",
          }}
            w="460px"
            borderBottomColor={{
              base: "gray.300",
              md: "none",
            }}
/*             transition={{
              base: ".3s",
              sm: "0",
            }}
            _hover={{
              bgColor: "gray.100",
            }} */
            _active={{
              bgColor: "gray.200",
            }}
          >
            <HStack 
            display={{base:"flex", md:"none"}}
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
            p={{
              base: "4px 16px",
              md: "0",
            }}
            w="195px"
            borderBottomColor={{
              base: "gray.300",
              md: "none",
            }}
            /* transition={{
              base: ".3s",
              sm: "0",
            }}
            _hover={{
              bgColor: "gray.100",
            }} */
            _active={{
              bgColor: "gray.200",
            }}
          >
            <HStack 
            as="button" 
            spacing={{
              base: "4px",
              sm: "8px"
            }} 
            display={{base:"flex", md:"none"}} 
            onClick={() => handleFilter("type")}
            >
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
          p={{
            base: "4px 16px",
            md: "0",
          }}
            w="195px"
            borderBottomColor={{
              base: "gray.300",
              md: "none",
            }}
            /* transition={{
              base: ".3s",
              sm: "0",
            }}
            _hover={{
              bgColor: "gray.100",
            }} */
            _active={{
              bgColor: "gray.200",
            }}
          >
            <HStack 
            as="button" 
            spacing={{
              base: "4px",
              sm: "8px"
            }}  
            display={{base:"Flex", md:"none"}}
            onClick={() => handleFilter("leader")}
            >
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
          p={{
            base: "4px 16px",
            md: "0",
          }}
            w="120px"
            borderBottomColor={{
              base: "gray.300",
              md: "none",
            }}
            /* transition={{
              base: ".3s",
              sm: "0",
            }}
            _hover={{
              bgColor: "gray.100",
            }} */
            _active={{
              bgColor: "gray.200",
            }}
          >
            <HStack 
            as="button" 
            spacing={{
              base: "4px",
              sm: "8px"
            }}  
            display={{base:"Flex", md:"none"}} 
            onClick={() => handleFilter("createdAt")}
            >
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
          borderBottomColor={{
            base: "gray.300",
            md: "none",
          }}
          p={{
            base: "4px 16px",
            md: "0",
          }}
          />




        </Tr>
      </Thead>
  );
}

export { TableHeaderResponsive };



/*





*/