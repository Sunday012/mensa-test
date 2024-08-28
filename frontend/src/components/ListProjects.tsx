import { Link } from "react-router-dom";
import { CardPre } from "./Card";
import "../App.scss";

interface Project {
  id: number;
  name: string;
  description: string;
}

interface ProjectListProps {
  projects: Project[];
}

export default function ListProjects({ projects }: ProjectListProps) {
  return (
    <div className="project-box">
      {projects.map((project) => (
        <Link to={`/project/${project.id}`} key={project.id}>
          <CardPre project={project} />
        </Link>
      ))}
    </div>
  );
}
