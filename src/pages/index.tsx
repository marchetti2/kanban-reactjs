import { Flex, Text, Box, Image } from "@chakra-ui/react";

import Sessions from "./sessions";

function App(): JSX.Element {

  return (
    <Flex height="100vh" width="100vw" overflow="hidden">
      <Flex height="100%" width="55%" bgColor="main.500" boxShadow="2xl">
        <Flex display="row" m="auto" w="630px" h="540px" alignItems="center" 
          justifyContent="center" >
          <Box h='122px' mt="60px">
            <Text fontSize="40px" fontWeight="600" lineHeight="60px" color="white">Gerencie seus projetos em um único lugar.</Text>
          </Box>
          <Flex  
          justifyContent="space-between" 
          h='418px'
          >
            <Flex flexDirection="column" h="100%" w="300px">
              <Text 
              width="100%"  
              fontSize="18px" 
              fontWeight="400" 
              lineHeight="28px" 
              color="gray.200"
              m="44px auto 44px auto"
              >
                Tenha controle total sobre projetos, finanças, produtividade, arquivos, mídias e clientes. Tudo isso em tempo real!
              </Text>
  
              <Flex 
              height="50px" 
              width="100%" 
              alignItems="center" 
              justifyContent="center" 
              borderRadius="6px"
              bg="white"
              >
                <Text fontSize="20px" fontWeight="700" lineHeight="30px" color="main.500">Crie sua conta gratis</Text>
              </Flex>
            </Flex>
            <Image   
            mt="0"          
            height="288px" 
            width="280px"  
            src="/logo-home.svg" 
            alt="kanban board image" 
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex height="100%" width="45%">
        <Sessions/>
      </Flex>
    </Flex>
  )
}
export default App;


/*
 
(
      <Flex w="100vw" h="100vh" bg="#FAFBFC">
        <Flex
          h="540px"
          w="450px"
          flexDir="column"
          alignItems="stretch"
          justifyContent="space-between"
          p="32px 40px"
          m="auto"
        >
          <Box mx="auto" w="180px">
            <SkeletonText noOfLines={1} />
          </Box>
  
          <Box h="360px">
            <Skeleton height="50px" mb="10px" />
            <Skeleton height="50px" mb="20px" />
            <Skeleton height="50px" mb="30px" />
            <Box mx="auto" mb="30px" w="50px">
              <SkeletonText noOfLines={1} />
            </Box>
            <Skeleton height="50px" mb="10px" />
            <Skeleton height="50px" mb="20px" />
          </Box>
  
          <Box mx="auto" w="250px">
            <SkeletonText noOfLines={1} />
          </Box>
        </Flex>
      </Flex>
    )




*/