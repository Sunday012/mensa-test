import { useParams } from "react-router-dom"
import { Typography } from "antd"

const {Text} = Typography
export default function ProjectDetails() {
    const {id} = useParams<{id : string}>()
  return (
    <div>
    <Text>Project Details</Text>
    <p>Project ID: {id}</p>
    {/* We'll add more details and task list here later */}
  </div>
  )
}
