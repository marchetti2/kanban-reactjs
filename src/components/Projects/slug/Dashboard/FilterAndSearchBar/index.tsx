import {
  Button,
  HStack,
  Input,
  Avatar,
  AvatarGroup,
  InputRightElement,
  InputGroup,
  Divider,
  Center,
  Flex,
  Icon,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { useIssues } from "../../../../../contexts/IssuesContext";
import { auth } from "../../../../../services/firebase";

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

interface FilterAndSearchBarProps {
  project: Project;
}
function FilterAndSearchBar({ project }: FilterAndSearchBarProps) {
  const [active, setActive] = useState<Array<string>>([]);

  const { searchListIssueData, issues, setSearchListIssueData } = useIssues();

  function verify(buttonName: string) {
    const index = active.findIndex((button) => button === buttonName);

    if (index !== -1) {
      const newArray = active.filter((button) => button !== buttonName);

      return setActive(newArray);
    }
    setActive((prevProps) => [...prevProps, buttonName]);
  }

  function isActive(buttonName: string) {
    const button = active.find((button) => button === buttonName);

    if (button) {
      return true;
    }
    return false;
  }

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

  function handleButtonFilter() {
    const assigneesAvatarSelected = issues.filter((issue) => {
      const assignee = issue.assignees?.find(
        (assigne) =>
          assigne.name === active.find((value) => value === assigne.name)
      );

      if (
        issue.assignees?.length === 0 &&
        active.includes(auth.currentUser?.displayName!)
      ) {
        return issue;
      }

      return assignee;
    });

    if (assigneesAvatarSelected.length > 0) {
      return setSearchListIssueData(assigneesAvatarSelected);
    }

    setSearchListIssueData(issues);
    return;
  }

  useEffect(() => {
    handleButtonFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <HStack h="45px" spacing="18px" mb="40px">
      <InputGroup w="250px">
        <Input
          pl="20px"
          fontSize="14px"
          placeholder="Buscar problema"
          color="gray.700"
          bgColor="gray.50"
          focusBorderColor="main.500"
          onChange={(e) => handleInputFilterChange(e.target.value)}
        />
        <InputRightElement pointerEvents="none">
          <Icon as={AiOutlineSearch} w={5} h={5} color="light.500" />
        </InputRightElement>
      </InputGroup>
      <AvatarGroup size="sm" max={4} borderColor="light.100" spacing={-2}>
        <IconButton
          w="36px"
          h="36px"
          aria-label="avatar"
          cursor="default"
          //variant="avatar"
          isRound
          _focus={{
            outline: "none",
            boxShadow: "none",
          }}
          //isActive={isActive(project.leader?.name)}
          //onClick={() => verify(project.leader?.name)}
        >
          <Tooltip
            key={project?.leader?.id}
            label={`Líder: ${project?.leader?.name}`}
            placement="top"
            gutter={10}
            fontSize="13px"
            fontFamily="Inter"
          >
            <Avatar
              size="sm"
              name={project?.leader?.name}
              src={project?.leader?.avatar}
            />
          </Tooltip>
        </IconButton>
        {project?.assignees?.map((avatar) => (
          <IconButton
            key={avatar.id}
            w="36px"
            h="36px"
            aria-label="avatar"
            variant="avatar"
            isRound
            isActive={isActive(avatar.name)}
            onClick={() => verify(avatar.name)}
          >
            <Tooltip
              label={avatar.name}
              placement="top"
              gutter={10}
              fontSize="13px"
              fontFamily="Inter"
            >
              <Avatar size="sm" name={avatar.name} src={avatar.avatar} />
            </Tooltip>
          </IconButton>
        ))}
      </AvatarGroup>

      <HStack spacing="5px">
        <Button
          bg="none"
          fontWeight="400"
          fontSize="14px"
          color="gray.700"
          transition=".2s"
          _hover={{
            bg: "gray.100",
          }}
          _active={{
            color: "white",
            bgColor: "main.400",
          }}
          isActive={isActive(auth.currentUser?.displayName!)}
          onClick={() => verify(auth.currentUser?.displayName!)}
        >
          Meu problemas
        </Button>
        {/* <Button
          variant="filter"
          isDisabled
          isActive={isActive("Problemas recentes")}
          onClick={() => verify("Problemas recentes")}
        >
          Problemas recentes
        </Button> */}
      </HStack>
      <Flex
        transition=".2s"
        transform={active.length > 0 ? "translateX(5px)" : "none"}
        visibility={active.length > 0 ? "visible" : "hidden"}
        opacity={active.length > 0 ? 1 : 0}
      >
        <Center height="32px">
          <Divider
            borderColor="gray.300"
            m="0 15px 0 0"
            orientation="vertical"
          />
        </Center>
        <Button variant="link" color="gray.700" onClick={() => setActive([])}>
          Limpar
        </Button>
      </Flex>
    </HStack>
  );
}

export { FilterAndSearchBar };

/*

  function handleButtonFilter() {
    // const leader = active.find((leader) => leader === "Meu problemas");

    // if (leader) {
    //   const filterWithoutAssignees = issues.filter(
    //     (issue) => issue.assignees?.length === 0
    //   );

    //   const filterByLeader = issues.filter((issue) => {
    //     const assignee = issue.assignees?.find(
    //       (assigne) => assigne.id === project?.userId
    //     );
    //     return assignee;
    //   });

    //   if (filterWithoutAssignees !== undefined) {
    //     if (filterByLeader !== undefined) {
    //       setSearchListIssueData(filterByLeader.concat(filterWithoutAssignees));
    //       return;
    //     }
    //     setSearchListIssueData(filterWithoutAssignees);
    //     return;
    //   }

    //   if (filterByLeader !== undefined) {
    //     return setSearchListIssueData(filterByLeader);
    //   }
    // }
    //
    const assigneesAvatarSelected = issues.filter((issue) => {
      const assignee = issue.assignees?.find(
        (assigne) =>
          assigne.name === active.find((value) => value === assigne.name)
      );

      if (
        issue.assignees?.length === 0 &&
        active.includes(auth.currentUser?.displayName!)
      ) {
        return issue;
      }

      return assignee;
    });

    if (assigneesAvatarSelected.length > 0) {
      return setSearchListIssueData(assigneesAvatarSelected);
    }

    setSearchListIssueData(issues);
    return;
  }




*/
