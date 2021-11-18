import {
    Box,
    Flex,
    HStack,
    Divider,
    Skeleton, 
    SkeletonText, 
    SkeletonCircle
  } from "@chakra-ui/react";
  
  function IssueHeaderSkeleton() {
  
    return (

      <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      pl="35px"
      pr="40px"
    >
      <HStack>
        <Skeleton w="10px" h="10px" />
        <SkeletonText w="40px" noOfLines={1}/>
      </HStack>

      <HStack spacing="7px">
        <Skeleton 
          h="32px"
          w="80px"
          borderRadius="6px"
          my="4px"
        />
        <Skeleton 
          h="32px"
          w="80px"
          borderRadius="6px"
          my="4px"
        />
                <Skeleton 
          h="32px"
          w="40px"
          borderRadius="6px"
          my="4px"
        />
      </HStack>
    </Flex>



















      
    );
  }
  
  export { IssueHeaderSkeleton };
  


  <Flex
        margin="auto"
        h="100%"
        maxH="800px"
        w="100%"
        maxW="1152px"
        flexDir="column"
      >
        <Flex as="main" w="100%" h="100%" flexDir="row">
          <Flex w="60%" h="100%" p="25px 15px 20px 20px">
            <Flex flexDir="column" w="100%">
              <Skeleton
                mb="25px"
                h="25px"
                w="250px"
              />
              <Flex flexDir="column" mb="20px" >
                <SkeletonText mb="5px" noOfLines={1} w="60px"/>
                <Skeleton h="15px" mb="5px"/>
                <Skeleton h="15px" mb="5px"/>
                <Skeleton h="15px" mb="5px"/>
                <Skeleton h="15px" mb="5px"/>
              </Flex>
              <Flex
                flexDir="column"
              >
                <SkeletonText mb="15px" noOfLines={1} w="70px"/>
                <Flex mb="20px">
                  <SkeletonCircle size="6" />
                  <Flex w="100%" pl="10px">
                    <Skeleton w="100%" h="40px"/>
                  </Flex>
                </Flex>
  
                <Flex>
                  <SkeletonCircle size="6"/>
                  <Flex
                  flexDir="column"
                    w="100%"
                    ml="12px"
                  >
                    <Flex mb="10px">
                      <SkeletonText w="50px" mr="10px" noOfLines={1}/>
                      <SkeletonText w="40px"  noOfLines={1}/>
                    </Flex>

                    <Flex flexDir="column" mb="12px">
                      <SkeletonText w="100px" mr="10px" noOfLines={3}/>
                    </Flex>

                    <Flex>
                       <Box  mr="7px">
                         <SkeletonText w="40px" noOfLines={1}/>
                       </Box>
                       <Box ml="7px">
                         <SkeletonText w="40px" noOfLines={1}/>
                       </Box>
                    </Flex>
                  </Flex>



                  </Flex>
                  
              </Flex>
            </Flex>
          </Flex>
  
          <Flex w="40%" h="100%" p="25px 20px 20px 15px">
            <Flex flexDir="column" w="100%">
              <Box mb="20px">
                <SkeletonText w="45px" mb="5px" noOfLines={1}/>
                <Skeleton w="70px" h="20px" />
              </Box>
              <Box mb="20px">
                <SkeletonText w="45px" mb="5px" noOfLines={1}/>
                <Skeleton w="70px" h="30px" borderRadius="15px" />
              </Box>
              <Box mb="20px">
              <SkeletonText w="55px" mb="5px" noOfLines={1}/>
              <Skeleton w="100%" h="40px" />
              </Box>
              <Box mb="20px">
              <SkeletonText w="40px" mb="5px" noOfLines={1}/>
              <Skeleton w="100%" h="40px" />
              </Box>
              <Divider borderColor="light.500" mb="20px" />
              <Flex flexDir="column" alignItems="flex-start">
                <SkeletonText w="80px" noOfLines={2}/>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>