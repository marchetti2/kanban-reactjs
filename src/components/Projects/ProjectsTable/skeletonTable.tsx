import {
  HStack,
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Box,
  Tbody,
  Td,
} from "@chakra-ui/react";

function SkeletonTable(): JSX.Element {
  const projects = ["", "", "", "", "", "", ];
  return (
    <Flex as="main" h="calc(100vh - 80px)">
      <Flex p="30px 40px" flexDir="column" w="1120px" m="0 auto">
        <Flex w="100%" h="100%" flexDir="column">
          <HStack h="40px" w="100%" mb="35px" justifyContent="space-between">
            <Skeleton h="100%" w="250px" />
            <Skeleton h="100%" w="100px" />
          </HStack>

          <Table size="sm">
            <Thead>
              <Tr h="56px">
                <Th w="460px">
                  <Box w="50px">
                    <SkeletonText noOfLines={1} />
                  </Box>
                </Th>
                <Th w="195px">
                  <Box w="50px">
                    <SkeletonText noOfLines={1} />
                  </Box>
                </Th>
                <Th w="195px">
                  <Box w="120px">
                    <SkeletonText noOfLines={1} />
                  </Box>
                </Th>
                <Th w="120px">
                  <Box w="50px">
                    <SkeletonText noOfLines={1} />
                  </Box>
                </Th>
                <Th w="70px"></Th>
              </Tr>
            </Thead>

            <Tbody>
              {projects.map((project, index) => (
                <Tr h="56px" key={index}>
                  <Td w="460px" maxW="460px">
                    <Box w="340px">
                      <SkeletonText noOfLines={1} />
                    </Box>
                  </Td>
                  <Td w="195px" maxW="195px">
                    <Box w="90px">
                      <SkeletonText noOfLines={1} />
                    </Box>
                  </Td>
                  <Td w="195px" maxW="195px">
                    <HStack>
                      <SkeletonCircle size="6" />
                      <Box w="90px">
                        <SkeletonText noOfLines={1} />
                      </Box>
                    </HStack>
                  </Td>
                  <Td w="120px" maxW="120px">
                    <Box w="70px">
                      <SkeletonText noOfLines={1} />
                    </Box>
                  </Td>
                  <Td w="70px" maxW="70px">
                    <SkeletonCircle size="6" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
}

export { SkeletonTable };
