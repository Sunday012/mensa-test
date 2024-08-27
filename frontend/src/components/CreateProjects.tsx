import { Form, Input, DatePicker, Button } from 'antd';
import { createProject } from '../services/api';
export const CreateProjects = () => {
    const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // We'll implement the API call to create a project here later
    createProject({values})
    
    // After successful API call, reset the form
    form.resetFields();
  };
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Project Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="dueDate" label="Due Date">
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Project
        </Button>
      </Form.Item>
    </Form>
  )
}
