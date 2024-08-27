
import { Typography } from 'antd';
import '../App.scss'
import ListProjects from '../components/ListProjects';
import { CreateProjects } from '../components/CreateProjects';
const {Text} = Typography;
function HomePage() {
  const mockProjects = [
    { id: 1, name: 'Project 1', description: 'This is project 1' },
    { id: 2, name: 'Project 2', description: 'This is project 2' },
  ];
  return (
    <>
    <div className='app-container'>
      <Text>Project</Text>
      <ListProjects projects={mockProjects} />
      <CreateProjects />
      <p>Hello</p>
    </div>
    </>
  )
}

export default HomePage

