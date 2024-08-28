import {
    Button,
    ConfigProviderProps,
    DatePicker,
    Form,
    Input,
    Modal,
    message,
    List,
    Skeleton,
  } from "antd";
  import { filterProjects } from "../services/api";
  import { useState } from "react";
  import Cookies from "js-cookie";
import { Link } from "react-router-dom";
  
  type SizeType = ConfigProviderProps["componentSize"];
  
  export const FilterProjects = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
    //@ts-ignore
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const onFinish = async (values: any) => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
  
        if (token) {
          const response = await filterProjects({ values });
          setIsAuthenticated(true);
          setFilteredProjects(response);
          if (response.length === 0) {
            message.info("No projects matched your criteria.");
          }
        } else {
          setIsAuthenticated(false);
          message.error("You must be logged in to filter projects.");
        }
      } catch (error) {
        message.error("Failed to filter projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    const showModal = () => {
      setOpen(true);
    };
  
    const handleCancel = () => {
      setOpen(false);
      form.resetFields();
      setFilteredProjects([]);
    };
  
    const [size] = useState<SizeType>("large");
  
    return (
      <div>
        <Button type="primary" size={size} onClick={showModal}>
          Filter Project
        </Button>
        <Modal
          title="Filter Project"
          open={open}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="name" label="Project Name">
              <Input />
            </Form.Item>
            <Form.Item name="dueDate" label="Due Date">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="numTasks" label="Number of Tasks">
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Filter Project
              </Button>
            </Form.Item>
          </Form>
  
          {loading ? (
            <Skeleton active />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={filteredProjects}
              renderItem={(project) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Link to={`/project/${project.id}`}>{project.name}</Link>}
                    description={`Due Date: ${project.due_date} - Tasks: ${project.task_count}`}
                  />
                </List.Item>
              )}
            />
          )}
        </Modal>
      </div>
    );
  };
  