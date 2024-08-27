
import { Link } from 'react-router-dom';
import { CardPre } from './Card';

interface Project {
    id: number;
    name: string;
    description: string;
  }
  
  interface ProjectListProps {
    projects: Project[];
  }

export default function ListProjects({projects} : ProjectListProps) {

  return (
  //   <List
  //   itemLayout="horizontal"
  //   dataSource={projects}
  //   renderItem={(project) => (
  //     <List.Item>
  //       <List.Item.Meta
  //         title={<Link to={`/project/${project.id}`}>{project.name}</Link>}
  //         description={project.description}
  //       />
  //       <EditBtn project={project} type='project' />
  //       <DeleteProject id={project.id} type='project' />
  //     </List.Item>
  //   )}
  // />
  <div>
    {projects.map((project) => (
      <Link to={`/project/${project.id}`} key={project.id}>
      <CardPre project={project}/>
      </Link>
    ))}
  </div>
  )
}
