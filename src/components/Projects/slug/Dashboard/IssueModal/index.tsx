import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorMode
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

import { IssueContent } from "./IssueContent";
import { IssueHeader } from "./IssueHeader";

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

interface Issue {
  id: string;
  projectId: string;
  status: string;
  summary: string;
  type: string;
  description?: string;
  leader: string;
  assignees?: Array<UserData>;
  createdAt: string;
  updatedAt: string;
  priority: string;
}

interface IssueModalProps {
  project: Project;
  issue: Issue;
  onCloseModal: () => void;
  isOpen: boolean;
  id: string | undefined;
}

function IssueModal({
  isOpen,
  onCloseModal,
  project,
  issue,
  id,
}: IssueModalProps) {

  const { colorMode } = useColorMode(); 

  function handleClose() {
    onCloseModal();
  }

  return (
    <Modal
      isCentered
      trapFocus={true}
      size="6xl"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent 
      p="20px"
      bg={colorMode === "dark" ? "dark.200" : "white"}
      borderColor={colorMode === "dark" ? "rgba(255, 255, 255, 0.24)" : "none"}
      borderWidth={colorMode === "dark" ? "1px" : "0"}
      >
        <ModalHeader p="0">
          <IssueHeader
            project={project}
            id={id}
            onCloseModal={onCloseModal}
            issue={issue}
          />
        </ModalHeader>
        <ModalCloseButton m="17px 10px 0 0" onClick={handleClose}/>
        <ModalBody>
        <IssueContent project={project} issue={issue}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export  {IssueModal} 