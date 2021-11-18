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
  updateDoc,
  doc,
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
  OrderByDirection,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { database } from "../services/firebase";
import { User } from "firebase/auth";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface CreateProjectProps {
  title: string;
  type: string;
  description?: string;
  user: User;
}

interface UpdateProjectProps {
  title?: string;
  type?: string;
  description?: string;
  assignees?: UserData[];
  id: string;
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

type Projects = Array<Project>;

interface GetAllProjectsProps {
  filterParam?: string;
  orderByParam?: OrderByDirection;
  userId: string;
}

interface UpdatedProjectsListenerProps {
  userId: string;
}

interface ProjectsContextProps {
  projects: Projects;
  project: Project;
  searchListData: Projects;
  setProjects: Dispatch<SetStateAction<Projects>>;
  setSearchListData: Dispatch<SetStateAction<Projects>>;
  createProject: ({}: CreateProjectProps) => Promise<void>;
  updateProject: ({}: UpdateProjectProps) => Promise<void>;
  getAllProjects: ({}: GetAllProjectsProps) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updatedProjectsListener: ({}: UpdatedProjectsListenerProps) => Promise<void>;
  getProject: (projectId: string) => Promise<void>;
}

interface ProjectsProviderProps {
  children: ReactNode;
}

const ProjectsContext = createContext({} as ProjectsContextProps);

function ProjectsProvider({ children }: ProjectsProviderProps): JSX.Element {
  const [projects, setProjects] = useState<Projects>([] as Projects);
  const [project, setProject] = useState<Project>({} as Project);
  const [searchListData, setSearchListData] = useState<Projects>(
    [] as Projects
  );

  async function createProject({
    title,
    type,
    user,
    description = "",
  }: CreateProjectProps) {
    const id = uuid();
    const createdAt = Date.now();

    try {
      await setDoc(
        doc(database, "projects", id),
        {
          id,
          userId: user.uid,
          title,
          type,
          leader: {
            id: user.uid,
            name: user.displayName,
            avatar: user.photoURL,
            email: user.email,
          },
          description,
          assignees: [],
          createdAt,
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function updateProject({
    assignees,
    type,
    title,
    description,
    id,
  }: UpdateProjectProps) {
    try {
      const projectRef = doc(database, "projects", id);

      if (assignees) {
        await updateDoc(projectRef, {
          assignees,
        });
      }

      if (title) {
        await updateDoc(projectRef, {
          title,
        });
      }

      if (type) {
        await updateDoc(projectRef, {
          type,
        });
      }

      if (description) {
        await updateDoc(projectRef, {
          description,
        });
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  async function getAllProjects({
    filterParam,
    orderByParam,
    userId,
  }: GetAllProjectsProps) {
    const q = query(
      collection(database, "projects"),
      orderBy(filterParam || "createdAt", orderByParam || "desc")
    );

    const querySnapshot = await getDocs(q);

    const projects = querySnapshot.docs.map((doc) => doc.data());

    const projectAssignees = projects.map((project) =>
      project.assignees.filter((assignee: UserData) => assignee.id === userId)
    );

    const assigneeIndex = projectAssignees.findIndex(
      (assignee) => assignee.length > 0
    );

    const userProjects = projects.filter(
      (project, index) => project.userId === userId || index === assigneeIndex
    );

    const projectsDateFormatted = userProjects.map((project) => {
      const date = project.createdAt;

      const dateFormatted = String(
        `${new Date(date).getDate()}/${
          new Date(date).getMonth() + 1
        }/${new Date(date).getFullYear()}`
      );

      return { ...project, createdAt: dateFormatted };
    }) as Projects;
    setSearchListData(() => projectsDateFormatted);
    setProjects(() => projectsDateFormatted);
  }

  async function getProject(projectId: string) {
    const docRef = doc(database, "projects", projectId);

    onSnapshot(docRef, (doc) => {
      const project = doc.data() as Project;
      setProject(project);
    });
  }

  async function updatedProjectsListener({
    userId,
  }: UpdatedProjectsListenerProps) {
    const q = query(
      collection(database, "projects"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const projects = querySnapshot.docs.map((doc) => doc.data());

      const projectAssignees = projects.map((project) =>
        project.assignees.filter((assignee: UserData) => assignee.id === userId)
      );

      const assigneeIndex = projectAssignees.findIndex(
        (assignee) => assignee.length > 0
      );

      const userProjects = projects.filter(
        (project, index) => project.userId === userId || index === assigneeIndex
      );

      const projectsDateFormatted = userProjects.map((project) => {
        const date = project.createdAt;

        const dateFormatted = String(
          `${new Date(date).getDate()}/${
            new Date(date).getMonth() + 1
          }/${new Date(date).getFullYear()}`
        );

        return { ...project, createdAt: dateFormatted };
      }) as Projects;
      setSearchListData(() => projectsDateFormatted);

      setProjects(() => projectsDateFormatted);
    });
  }

  async function deleteProject(id: string) {
    await deleteDoc(doc(database, "projects", id));
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        createProject,
        getAllProjects,
        deleteProject,
        updatedProjectsListener,
        updateProject,
        searchListData,
        setSearchListData,
        project,
        getProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

function useProjects(): ProjectsContextProps {
  const context = useContext(ProjectsContext);
  return context;
}

export { ProjectsContext, ProjectsProvider, useProjects };
