import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { DeleteProject } from './DeleteBtn';
import { EditBtn } from './EditBtn';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  description: string;
  status?: string;
}

interface ProjectListProps {
  project: Project;
}

export const CardPre = ({ project }: ProjectListProps) => (
  <Link to={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src={project.status ? "/task.jpg" : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
        />
      }
      actions={[
        <div onClick={(e) => e.preventDefault()}>
          <EditBtn project={project} type="project" />
        </div>,
        <div onClick={(e) => e.preventDefault()}>
          <Status status={project.status} />
        </div>,
        <div onClick={(e) => e.preventDefault()}>
          <DeleteProject id={project.id} type="project" />
        </div>,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
        title={project.name}
        description={project.description}
      />
    </Card>
  </Link>
);

const Status = ({ status }: { status: string | undefined }) => {
  return (
    <div>
      <p>{status}</p>
    </div>
  );
};
