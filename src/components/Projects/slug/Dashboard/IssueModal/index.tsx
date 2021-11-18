import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

import { IssueContent } from "./IssueContent";
import { IssueContentSkeleton } from "./IssueContent/IssueContentSkeleton";
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
  setLoadingCloseModal: Dispatch<SetStateAction<boolean>>;
  loadingCloseModal: boolean;
  onCloseModal: () => void;
  isOpen: boolean;
  id: string | undefined;
}

function IssueModal({
  isOpen,
  onCloseModal,
  project,
  issue,
  setLoadingCloseModal,
  loadingCloseModal,
  id,
}: IssueModalProps) {
  const router = useRouter();

  function handleClose() {
    setLoadingCloseModal(true);
    onCloseModal();
  }

  return (
    <Modal
      isCentered
      trapFocus={true}
      size="6xl"
      isOpen={!!router.query.issue ? !!router.query.issue : isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent p="20px">
        <ModalHeader p="0">
          <IssueHeader
            project={project}
            id={id}
            onCloseModal={onCloseModal}
            issue={issue}
          />
        </ModalHeader>
        <ModalCloseButton m="17px 10px 0 0" onClick={handleClose}>
          {loadingCloseModal && <Spinner size="sm" color="gray.400" />}
        </ModalCloseButton>
        <ModalBody>
          {!!router.query.issue ? (
            <IssueContent project={project} issue={issue} />
          ) : (
            <IssueContentSkeleton />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { IssueModal };
