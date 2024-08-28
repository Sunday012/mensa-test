import {
    Button,
    ConfigProviderProps,
    DatePicker,
    Form,
    Input,
    Modal,
    message,
  } from "antd";
  import { createProject } from "../services/api";
  import { useState } from "react";
  
  type SizeType = ConfigProviderProps["componentSize"];
  
  export const CreateProjects = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const onFinish = async (values: any) => {
      try {
        setLoading(true);
        await createProject({ values });
        message.success("Project created successfully!");
        form.resetFields();
        setOpen(false);
      } catch (error) {
        message.error("Failed to create project. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    const showModal = () => {
      setOpen(true);
    };
  
    const handleCancel = () => {
      setOpen(false);
    };
  
    const [size] = useState<SizeType>("large");
  
    return (
      <div>
        <Button type="primary" size={size} onClick={showModal}>
          Create Project
        </Button>
        <Modal title="Create Project" open={open} onCancel={handleCancel} footer={null}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="name"
              label="Project Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="dueDate" label="Due Date">
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Create Project
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };
  