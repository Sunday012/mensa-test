import { Form, Input, Button } from 'antd';
import { LoginUser } from '../services/auth';
export const Login = () => {
    const [form] = Form.useForm();

  const onFinish = (values: any) => {

    console.log('Form values:', values);
    // We'll implement the API call to create a project here later
    LoginUser({values})
    // After successful API call, reset the form
    form.resetFields();
  };
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
      <Input type='email' />
      </Form.Item>
      <Form.Item name="password" label="Password">
      <Input type='password' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log In
        </Button>
      </Form.Item>
    </Form>
  )
}
