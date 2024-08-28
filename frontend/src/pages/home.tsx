import "../App.scss";
import ListProjects from "../components/ListProjects";
import { CreateProjects } from "../components/CreateProjects";
import { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";
import Cookies from "js-cookie";
import { Skeleton } from "antd";

type ProjectProps = {
  id: number;
  name: string;
  description: string;
  due_date?: string;
  user_id?: string;
};

function HomePage() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token");

  useEffect(() => {
    const checkAuthAndFetchProjects = async () => {
      if (token) {
        try {
          const response = await fetchProjects();
          if (response) {
            setIsAuthenticated(true);
            setProjects(response);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Authentication failed or token is invalid:", error);
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuthAndFetchProjects();
  }, [token]);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <CreateProjects />
          {loading ? <Skeleton active /> : <ListProjects projects={projects} />}
        </>
      ) : (
        <p>Please log in to view your projects.</p>
      )}
    </div>
  );
}

export default HomePage;
