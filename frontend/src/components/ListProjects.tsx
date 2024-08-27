
import { List} from 'antd';
import { Link } from 'react-router-dom';

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
    <List
    itemLayout="horizontal"
    dataSource={projects}
    renderItem={(project) => (
      <List.Item>
        <List.Item.Meta
          title={<Link to={`/project/${project.id}`}>{project.name}</Link>}
          description={project.description}
        />
      </List.Item>
    )}
  />
  )
}
