
import '../App.scss'
import ListProjects from '../components/ListProjects';
import { CreateProjects } from '../components/CreateProjects';
import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';
import Cookies from 'js-cookie';
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
    const token = Cookies.get('token')
    useEffect(() => {
        const fetchAllProjects = async () => {
            const result = await fetchProjects();
            setProjects(result);
            console.log(result);
        }

        if(token){
            fetchAllProjects()
        }
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

