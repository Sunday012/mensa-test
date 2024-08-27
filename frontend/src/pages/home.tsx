
import '../App.scss'
import ListProjects from '../components/ListProjects';
import { CreateProjects } from '../components/CreateProjects';
import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';

type ProjectProps = {
        id: number,
        name: string,
        description: string,
        due_date?: string,
        user_id?: string,
}
function HomePage() {
    const [projects, setProjects] = useState<ProjectProps[]>([])
    // const token = useSelector((state: RootState) => state.auth.token);
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
      <ListProjects projects={projects} />
    </div>
    </>
  )
}

export default HomePage

