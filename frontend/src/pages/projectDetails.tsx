import { Typography } from "antd"
import { CreateTask } from "../components/CreateTask"
import { useEffect, useState } from "react"
import { fetchTask } from "../services/api"
import ListTasks from "../components/ListTasks"
import { useParams } from "react-router-dom"

const {Text} = Typography
type TaskProp = {
        id: number,
        name: string,
        description: string,
        status: string,
        project_id: string
}
export default function ProjectDetails() {
    const [task, setTask] = useState<TaskProp[]>([])
    const {id} = useParams<{id : string}>()
 useEffect(() => {
    const fetchAllTask = async () => {
        const result = await fetchTask(id);
        setTask(result);
        console.log(result);
    }

    fetchAllTask()
 },[])
  return (
    <div>
    <Text>Project Details</Text>
    <ListTasks task={task} />
    <CreateTask />
  </div>
  )
}
