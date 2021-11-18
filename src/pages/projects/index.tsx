import { useEffect, useState } from "react";

import { useProjects } from "../../contexts/ProjectsContext";
import { useAuth } from "../../contexts/AuthContext";

import { ProjectsTable } from "../../components/Projects/ProjectsTable";
import { ProjectsHeader } from "../../components/Projects/Header";
import { SkeletonTable } from "../../components/Projects/ProjectsTable/skeletonTable";
import { CreateProject } from "../../components/Projects/CreateProject";
import { TableBody } from "../../components/Projects/ProjectsTable/TableBody";

function Projects(): JSX.Element {
  const { updatedProjectsListener, projects } = useProjects();
  const [hasProject, setHasProject] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    updatedProjectsListener({ userId: user.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  setTimeout(() => {
    setHasProject(true);
  }, 3000);

  return (
    <>
      <ProjectsHeader />
      {projects.length > 0 ? (
        <ProjectsTable>
          <TableBody />
        </ProjectsTable>
      ) : !hasProject ? (
        <SkeletonTable />
      ) : (
        <ProjectsTable>
          <CreateProject />
        </ProjectsTable>
      )}
    </>
  );
}

export default Projects;
