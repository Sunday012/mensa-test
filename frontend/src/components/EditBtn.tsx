import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProviderProps,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import { useState } from "react";
import { updateProject, updateTask } from "../services/api";

type SizeType = ConfigProviderProps["componentSize"];
type ProjectProps = {
  type: string;
  project: {
    id: number;
    name: string;
    description: string;
  };
};
export const EditBtn = ({ project, type }: ProjectProps) => {
  const id = project.id;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 5000);
  };

  const onFinish = (data: any) => {
    const values = {
      ...data,
      id,
    };
    console.log("Form values:", values);
    // We'll implement the API call to create a project here later
    if (type == "project") {
      updateProject({ values });
    } else if (type == "task") {
      updateTask({ values });
    }
    handleOk();
    // After successful API call, reset the form
    form.resetFields();
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  //@ts-ignore
  const [size, setSize] = useState<SizeType>("large");
  //@ts-ignore
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const handleEdit = () => {
    showModal();
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<EditOutlined />}
        size={size}
        loading={loadings[0]}
        onClick={() => handleEdit()}
      />
      <Modal
        title={type == "project" ? "Edit Project" : "Edit Task"}
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {type == "project" ? (
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="name"
              label="Project Name"
              rules={[{ required: true }]}
            >
              <Input placeholder={project.name} />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder={project.description} />
            </Form.Item>
            <Form.Item name="dueDate" label="Due Date">
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Project
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="name"
              label="Task Name"
              rules={[{ required: true }]}
            >
              <Input placeholder={project.name} />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder={project.description} />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select
                defaultValue="todo"
                options={[
                  { value: "todo", label: "todo" },
                  { value: "in_progress", label: "in_progress" },
                  { value: "done", label: "done" },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Task
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};
