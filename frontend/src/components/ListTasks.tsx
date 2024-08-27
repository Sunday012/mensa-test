
import { CardPre } from './Card';

interface Task {
    id: number;
    name: string;
    description: string;
    status: string;
  }
  
  interface TaskListProps {
    task: Task[];
  }

export default function ListTasks({task} : TaskListProps) {

  return (
  //   <List
  //   itemLayout="horizontal"
  //   dataSource={task}
  //   renderItem={(task) => (
  //     <List.Item>
  //       <List.Item.Meta
  //         title={<Link to={`/project/${task.id}`}>{task.name}</Link>}
  //         description={task.description}
  //       />
  //       <p>Status: {task.status}</p>
  //       <EditBtn project={task} type='task' />
  //       <DeleteProject id={task.id} type='task'  />
  //     </List.Item>
  //   )}
  // />
  <div className='project-box'>
    {task.map((protask) => (
      <CardPre project={protask} key={protask.id}/>
    ))}
  </div>
  )
}
