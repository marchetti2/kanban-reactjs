import { Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, query, getDocs, doc, getDoc, onSnapshot, DocumentData } from "firebase/firestore";
import { database } from "../../../services/firebase";

import { IssuesProvider } from "../../../contexts/IssuesContext";

import Dashboard from "./dashboard";
import ProjectSettings from "./projectSettings";

import { Sidebar } from "../../../components/Projects/slug/Sidebar";
import { Aside } from "../../../components/Projects/slug/Aside";

import { useProjects } from "../../../contexts/ProjectsContext";


interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Project {
  leader: UserData;
  createdAt: string;
  type: string;
  title: string;
  userId: string;
  id: string;
  assignees: UserData[];
}

interface ProjectProps {
  project: Project;
}

function Project(/* { project }: ProjectProps */): JSX.Element {

  const [tabIndex, setTabIndex] = useState(0)

  const {getProject, project} = useProjects();
  const router = useRouter()

  useEffect(()=>{
    
    const { slug } = router.query
    const projectId = String(slug)
    getProject(projectId)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[router.query])

  function handleTabsChange (index: number) {
    setTabIndex(index)
  }

  return (
    <IssuesProvider>
      <Flex h="100vh" flexDirection="row">
        <Head>
          <title>Dashboard</title>
          <link rel="icon" href="/favicon.png" />
        </Head>

        <Sidebar project={project} />
        <Tabs
          variant="unstyled"
          display="flex"
          h="100vh"
          w="100vw"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          onChange={handleTabsChange}
          index={tabIndex}
        >
          <TabList
            display="flex"
            h="100%"
            w="294px"
            bgColor="gray.100"
            borderRightWidth="1px"
            borderColor="gray.300"
            justifyContent="right"
          >
            <Aside project={project} />
          </TabList>
          <Flex
            as="main"
            p="30px 40px"
            flexDirection="column"
            h="100%"
            w="calc(100vw - 294px)"
          >
            <TabPanels h="100%">
              <TabPanel h="100%" p="0">
                <Dashboard project={project} />
              </TabPanel>
              <TabPanel h="100%" p="0">
                <ProjectSettings project={project} setTabIndex={setTabIndex} />
              </TabPanel>
            </TabPanels>
          </Flex>
        </Tabs>
      </Flex>
    </IssuesProvider>
  );
}

export default Project;

// export async function getStaticPaths() {
//   const q = query(collection(database, "projects"));

//   const querySnapshot = await getDocs(q);

//   const projects = querySnapshot.docs.map((doc) => doc.data());

//   const paths = projects.map((project) => {
//     return {
//       params: {
//         slug: project.id,
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: true,
//   };
// }

export async function getServerSideProps(/* { params: { slug } }: any */) {

/*   const docRef = doc(database, "projects", slug);
  const docSnap = await getDoc(docRef);
  const project = docSnap.data(); */

  return {
    props: {/*  project  */},
  };
}
