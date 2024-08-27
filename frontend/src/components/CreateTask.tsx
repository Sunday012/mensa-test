import { Form, Input, Button } from 'antd';
import {  createTask } from '../services/api';
import { useParams } from 'react-router-dom';
export const CreateTask= () => {
    const [form] = Form.useForm();
    const {id} = useParams<{id : string}>()

  const onFinish = (values: any) => {
    const data = {
        ...values,
        id,        
      };
    console.log('Form values:', data);
    // We'll implement the API call to create a project here later
    createTask({data})
    // After successful API call, reset the form
    form.resetFields();
  };
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Task Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Task
        </Button>
      </Form.Item>
    </Form>
  )
}
