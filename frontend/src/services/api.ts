import axios from "axios";
import Cookies from 'js-cookie';
import { useParams } from "react-router-dom";

const apiUrl = "https://mensa-test-backend.vercel.app"

type TypedueDate = {
    $d: string
}
export interface ProjectDetails {
    id: number;
    name: string;
    description: string;
    dueDate: TypedueDate;
  }
export interface TaskDetails {
    id?: number;
    name: string;
    description: string;
    status: 'todo' | 'in_progress' | 'done';
  }

  export interface Project {
    values: ProjectDetails;
  }

  export interface Task {
    values: TaskDetails;
  }

export const fetchProjects = async () => {
    try {
        const token = Cookies.get('token');
        console.log(token);
        const response = await axios.get(`${apiUrl}/projects`, {
            headers: {
                authorization: token
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error({"Error fetching projects" : error});
    }
}
export const fetchTasks = async () => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${apiUrl}/tasks`,{
            headers: {
                authorization: token
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error({"Error fetching tasks" : error});
    }
}

export const fetchProject = async () => {
    const {id} = useParams<{id : string}>();
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${apiUrl}/projects?${id}`,{
            headers: {
                authorization: token
            }
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error({"Error fetching projects" : error});
    }
}
export const fetchTask = async (id : string | undefined) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${apiUrl}/tasks/${id}`,{
            headers: {
                authorization: token
            }
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error({"Error fetching projects" : error});
    }
}

export const createProject = async ({values} : Project) => {
    console.log(values.dueDate.$d)
    const dueDate = new Date(values.dueDate.$d).toISOString().slice(0, 10);
    try {
        const token = Cookies.get('token');
        const response = await axios.post(`${apiUrl}/projects`, {
            name: values.name,
            description: values.description,
            due_date: dueDate,
        },{
            headers: {
                authorization: token
            }
        });
        return response.data;
    } catch (error) {
        console.error({"Error fetching projects" : error});
    } finally {
     window.location.href = `/project/${values.id}`
    }
}

export const createTask = async ({data} : any) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.post(`${apiUrl}/tasks`, {
            name: data.name,
            description: data.description,
            status: 'todo',
            project_id: data.id,
        },{
            headers: {
                authorization: token
            }
        });
        return response.data;
    } catch (error) {
        console.error({"Error creating Task" : error});
    } finally {
        window.location.reload();
    }
}

export const updateProject = async ({values} : Project) => {
    console.log(values.id)
    const dueDate = new Date(values.dueDate.$d).toISOString().slice(0, 10);
    try {
        const token = Cookies.get('token');
        const response = await axios.put(`${apiUrl}/projects/${values.id}`, {
            name: values.name,
            description: values.description,
            due_date: dueDate,
        },{
            headers: {
                authorization: token
            }
        });
        return response.data;

    } catch (error) {
        console.error({"Error fetching projects" : error});
    } finally {
      window.location.reload();
    }

}
export const updateTask = async ({values} : Task) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.put(`${apiUrl}/tasks/${values.id}`, {
            name: values.name,
            description: values.description,
            status: values.status,
        },{
            headers: {
                authorization: token
            }
        });
        return response.data;
    } catch (error) {
        console.error({"Error updating task" : error});
    } finally {
     window.location.reload();
    }
}


export const deleteProject = async (id : number) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.delete(`${apiUrl}/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
        });
        return response.data;
    } catch (error) {
        console.error({"Error fetching projects" : error});
    } finally {
     window.location.reload();
    }
}
export const deleteTask = async (id : number) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.delete(`${apiUrl}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: token

            },
        });
        return response.data;
    } catch (error) {
        console.error({"Error fetching projects" : error});
    } finally {
       window.location.reload();
    }
}

export const filterProjects = async (filters: any) => {
    try {
      const token = Cookies.get('token');
      console.log("Token:", token); 
      if (!token) {
        throw new Error('No token found');
      }
  
      let queryParams = [];
  
      if (filters.values.name) {
        queryParams.push(`name=${filters.values.name}`);
      }
      if (filters.values.dueDate) {
        queryParams.push(`dueDate=${filters.values.dueDate}`);
      }
      if (filters.values.numTasks !== undefined) {
        queryParams.push(`numTasks=${filters.values.numTasks}`);
      }
  
      const queryString = queryParams.join('&');
      const requestUrl = `${apiUrl}/project/filter?${queryString}`;
  
      console.log(requestUrl);
  
      const response = await axios.get(requestUrl, {
        headers: {
          authorization: token
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error filtering projects:", error);
    }
  }
  