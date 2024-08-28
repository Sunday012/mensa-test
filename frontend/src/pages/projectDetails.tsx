import { Typography, Skeleton, message } from "antd";
import { CreateTask } from "../components/CreateTask";
import ListTasks from "../components/ListTasks";
import { useEffect, useState } from "react";
import { fetchTask } from "../services/api";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const { Text } = Typography;

type TaskProp = {
  id: number;
  name: string;
  description: string;
  status: string;
  project_id: string;
};

export default function ProjectDetails() {
  const [tasks, setTasks] = useState<TaskProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { id } = useParams<{ id: string }>();
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchAllTasks = async () => {
      if (token) {
        try {
          const result = await fetchTask(id);
          if (result) {
            setIsAuthenticated(true);
            setTasks(result);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Failed to fetch tasks or token is invalid:", error);
          setIsAuthenticated(false);
          message.error("Failed to load tasks. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    fetchAllTasks();
  }, [id, token]);

  return (
    <div>
                  <Text strong>Project Details</Text>
                  <CreateTask />
      {isAuthenticated ? (
        <>

          {loading ? (
            <Skeleton active />
          ) : (
            <>
              {tasks.length > 0 ? (
                <ListTasks task={tasks} />
              ) : (
                <p>No tasks available for this project.</p>
              )}
            </>
          )}
        </>
      ) : (
        <p>Please log in to view project details.</p>
      )}
    </div>
  );
}
