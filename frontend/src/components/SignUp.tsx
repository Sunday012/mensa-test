import { Form, Input, Button } from 'antd';
import { SignUser } from '../services/auth';
export const SignUp= () => {
    const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    SignUser({values})
    form.resetFields();
  };
  
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="username" label="UserName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
      <Input type='email' />
      </Form.Item>
      <Form.Item name="password" label="Password">
      <Input type='password' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  )
}
