import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  deleteDoc,
  setDoc,
  doc,
  collection,
  updateDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { database } from "../services/firebase";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface CreateIssueProps {
  projectId: string;
  summary: string;
  status: string;
  type: string;
  description?: string;
  assignees?: Array<UserData>;
  priority: string;
  user: UserData;
}

interface UpdateIssueProps {
  id: string;
  summary?: string;
  status?: string;
  type?: string;
  description?: string;
  assignees?: Array<UserData>;
  priority?: string;
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

type Issues = Array<Issue>;

interface IssuesContextProps {
  issues: Issues;
  searchListIssueData: Issues;
  createIssue: ({}: CreateIssueProps) => Promise<void>;
  updateIssue: ({}: UpdateIssueProps) => Promise<void>;
  deleteIssue: (id: string) => Promise<void>;
  setIssues: Dispatch<SetStateAction<Issues>>;
  setSearchListIssueData: Dispatch<SetStateAction<Issues>>;
  getAllIssues: () => Promise<void>;
  updatedIssueListener: (projectId: string) => Promise<void>;
  getIssues: (projectId: string) => Promise<void>;
}

interface IssuesProviderProps {
  children: ReactNode;
}

const IssuesContext = createContext({} as IssuesContextProps);

function IssuesProvider({ children }: IssuesProviderProps): JSX.Element {
  const [issues, setIssues] = useState<Issues>([] as Issues);
  const [searchListIssueData, setSearchListIssueData] = useState<Issues>(
    [] as Issues
  );

  async function createIssue({
    projectId,
    summary,
    status,
    type,
    description,
    assignees,
    priority,
    user,
  }: CreateIssueProps) {
    const id = uuid();
    const createdAt = Date.now();

    try {
      await setDoc(
        doc(database, "issues", id),
        {
          id,
          projectId,
          status: "nao iniciado",
          summary,
          type,
          description,
          leader: user.id,
          assignees,
          createdAt,
          priority,
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function updateIssue({
    id,
    summary,
    status,
    type,
    description,
    assignees,
    priority,
  }: UpdateIssueProps) {
    const updatedAt = Date.now();
    try {
      const issueRef = doc(database, "issues", id);

      if (summary) {
        await updateDoc(issueRef, {
          summary,
          updatedAt,
        });
      }

      if (status) {
        await updateDoc(issueRef, {
          status,
          updatedAt,
        });
      }

      if (type) {
        await updateDoc(issueRef, {
          type,
          updatedAt,
        });
      }

      if (description) {
        await updateDoc(issueRef, {
          description,
          updatedAt,
        });
      }

      if (assignees) {
        await updateDoc(issueRef, {
          assignees,
          updatedAt,
        });
      }

      if (priority) {
        await updateDoc(issueRef, {
          priority,
          updatedAt,
        });
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  async function getAllIssues() {
    const q = query(
      collection(database, "issues"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const issues = querySnapshot.docs.map((doc) => doc.data());

      const issuesDateFormatted = issues.map((issue) => {
        const createdAtDate = issue.createdAt;

        const createdAtDateFormatted = String(
          `${new Date(createdAtDate).getDate()}/${
            new Date(createdAtDate).getMonth() + 1
          }/${new Date(createdAtDate).getFullYear()}`
        );

        if (issue.updatedAt) {
          const updatedAtDate = issue.updatedAt;

          const updatedAtDateFormatted = String(
            `${new Date(updatedAtDate).getDate()}/${
              new Date(updatedAtDate).getMonth() + 1
            }/${new Date(updatedAtDate).getFullYear()}`
          );

          return {
            ...issue,
            createdAt: createdAtDateFormatted,
            updatedAt: updatedAtDateFormatted,
          };
        }

        return { ...issue, createdAt: createdAtDateFormatted };
      }) as Issues;

      setSearchListIssueData(issuesDateFormatted);
      setIssues(issuesDateFormatted);
    });
  }

  async function getIssues(projectId: string) {
    const querySnapshot = await getDocs(collection(database, "issues"));

    const issues = querySnapshot.docs.map((doc) => doc.data());

    const issuesById = issues.filter((issue) => issue.projectId === projectId);

    const issuesDateFormatted = issuesById.map((issue) => {
      const createdAtDate = issue.createdAt;

      const createdAtDateFormatted = String(
        `${new Date(createdAtDate).getDate()}/${
          new Date(createdAtDate).getMonth() + 1
        }/${new Date(createdAtDate).getFullYear()}`
      );

      if (issue.updatedAt) {
        const updatedAtDate = issue.updatedAt;

        const updatedAtDateFormatted = String(
          `${new Date(updatedAtDate).getDate()}/${
            new Date(updatedAtDate).getMonth() + 1
          }/${new Date(updatedAtDate).getFullYear()}`
        );

        return {
          ...issue,
          createdAt: createdAtDateFormatted,
          updatedAt: updatedAtDateFormatted,
        };
      }

      return { ...issue, createdAt: createdAtDateFormatted };
    }) as Issues;

    setSearchListIssueData(issuesDateFormatted);
    setIssues(issuesDateFormatted);
  }

  async function updatedIssueListener(projectId: string) {
    onSnapshot(collection(database, "issues"), (querySnapshot) => {
      const issues = querySnapshot.docs.map((doc) => doc.data());

      const issuesById = issues.filter(
        (issue) => issue.projectId === projectId
      );

      const issuesDateFormatted = issuesById.map((issue) => {
        const createdAtDate = issue.createdAt;

        const createdAtDateFormatted = String(
          `${new Date(createdAtDate).getDate()}/${
            new Date(createdAtDate).getMonth() + 1
          }/${new Date(createdAtDate).getFullYear()}`
        );

        if (issue.updatedAt) {
          const updatedAtDate = issue.updatedAt;

          const updatedAtDateFormatted = String(
            `${new Date(updatedAtDate).getDate()}/${
              new Date(updatedAtDate).getMonth() + 1
            }/${new Date(updatedAtDate).getFullYear()}`
          );

          return {
            ...issue,
            createdAt: createdAtDateFormatted,
            updatedAt: updatedAtDateFormatted,
          };
        }

        return { ...issue, createdAt: createdAtDateFormatted };
      }) as Issues;
      setSearchListIssueData(issuesDateFormatted);
      setIssues(issuesDateFormatted);
    });
  }

  async function deleteIssue(id: string) {
    await deleteDoc(doc(database, "issues", id));
  }

  return (
    <IssuesContext.Provider
      value={{
        issues,
        createIssue,
        deleteIssue,
        setIssues,
        getAllIssues,
        updatedIssueListener,
        updateIssue,
        getIssues,
        searchListIssueData,
        setSearchListIssueData,
      }}
    >
      {children}
    </IssuesContext.Provider>
  );
}

function useIssues(): IssuesContextProps {
  const context = useContext(IssuesContext);
  return context;
}

export { IssuesContext, IssuesProvider, useIssues };
