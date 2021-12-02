import {
    Flex,
    Text,
    Icon,
    HStack,
    VStack,
    Avatar,
    Heading,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    MenuGroup,
    useColorMode,
    Box,
    Link,
    InputGroup,
    Input,
    InputRightElement,
    useDisclosure,
  } from "@chakra-ui/react";
  import { useCallback, useState } from "react";
  import { useRouter } from "next/router";
  import { BsKanban } from "react-icons/bs";
  import { FaSun, FaMoon } from "react-icons/fa";
  import { MdSettings } from "react-icons/md";
  import { IoMdArrowRoundBack } from "react-icons/io";
  import { AddIcon, Search2Icon } from "@chakra-ui/icons";
  
  import { useId } from "@reach/auto-id";
  
  import { auth } from "../../../../services/firebase";
  
  import { useIssues } from "../../../../contexts/IssuesContext";
  
  import { CreateIssueModal } from "../../../../components/Projects/slug/Sidebar/CreateIssueModal";
  import { NotificationsResponsive } from "../../../../components/Projects/Header/NotificationsResponsive";
  import { IssuesWrapper } from "../../../../components/Projects/slug/Dashboard/IssuesWrapper";
  import {ConfirmLogoutModal} from "../../../../components/Projects/Header/ConfirmLogoutModal"
  import {ProfileModal} from "../../../../components/Projects/Header/ProfileModal"
  import ProjectSettings from "../projectSettings"
   
  
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
  
  interface ProjectResponsiveProps {
    project: Project;
  }
  
  function ProjectSettingsResponsive({ project }: ProjectResponsiveProps): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode();
    const id = useId();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const { searchListIssueData, issues, setSearchListIssueData } = useIssues();
  
    const [isOpenConfirmLogout, setIsOpenConfirmLogout] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
  
    const [isProjectSetings, setIsProjectSetings] = useState(false);
  
    function handleInputFilterChange(inputValue: string) {
      if (inputValue !== "") {
        const filterBySummary = issues.filter(
          (issue) =>
            issue.summary.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        );
  
        if (filterBySummary !== undefined) {
          setSearchListIssueData(filterBySummary);
          return;
        }
  
        if (issues.length === searchListIssueData.length) {
          return;
        }
      }
  
      setSearchListIssueData(issues);
      return;
    }
  
    const onOpenModal = useCallback((modalName: string) => {
      if (modalName === "confirmLogout") {
        return setIsOpenConfirmLogout(true);
      }
      if (modalName === "profile") {
        return setIsOpenProfile(true);
      }
    }, []);
  
    function onCloseModal() {
      setIsOpenConfirmLogout(false);
      setIsOpenProfile(false);
      return;
    }
  
    return (
      <>
              <Flex
              h="calc(100vh - 140px)"
              //p="14px 24px 30px 24px"
              //flexDirection="column"
              //justifyContent="space-between"
            >
oioioioioi
            </Flex>
      </>
    );
  }
  export default ProjectSettingsResponsive;
  