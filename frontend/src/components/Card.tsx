import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { DeleteProject } from './DeleteBtn';
import { EditBtn } from './EditBtn';

interface Project {
    id: number;
    name: string;
    description: string;
  }
  
  interface ProjectListProps {
    project: Project;
  }

export const CardPre = ({project} : ProjectListProps) => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <EditBtn project={project} type='project' />,
      <DeleteProject id={project.id} type='project' />
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title={project.name}
      description={project.description}
    />
  </Card>
);

