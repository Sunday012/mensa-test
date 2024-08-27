
import { Typography } from 'antd';
import '../App.scss'
import ListProjects from '../components/ListProjects';
import { CreateProjects } from '../components/CreateProjects';
import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';
const {Text} = Typography;

type ProjectProps = {
        id: number,
        name: string,
        description: string,
        due_date?: string,
        user_id?: string,
}
function HomePage() {
    const [projects, setProjects] = useState<ProjectProps[]>([])
    useEffect(() => {
        const fetchAllProjects = async () => {
            const result = await fetchProjects();
            setProjects(result);
            console.log(result);
        }

        fetchAllProjects()
    },[])

  return (
    <>
    <div className=''>
      <CreateProjects />
      <Text>Project</Text>
      <ListProjects projects={projects} />
    </div>
    </>
  )
}

export default HomePage

