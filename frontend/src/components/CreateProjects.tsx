import { Button, ConfigProviderProps, DatePicker, Form, Input, Modal } from 'antd'
import { createProject } from '../services/api';
import { useState } from 'react';

type SizeType = ConfigProviderProps['componentSize'];

export const CreateProjects = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 5000);
      };

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // We'll implement the API call to create a project here later
    createProject({values})
    handleOk()
    // After successful API call, reset the form
    form.resetFields();
  };

  const showModal = () => {
    setOpen(true);
  };


  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

      //@ts-ignore
      const [size, setSize] = useState<SizeType>('large');
      //@ts-ignore
      const [loadings, setLoadings] = useState<boolean[]>([]);
      const handleEdit = () => {
          showModal()
      }
  return (
    <div>
     <Button type="primary" size={size} loading={loadings[0]} onClick={() => handleEdit()}>Create Project</Button>
      <Modal
        title="Create Project"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        >
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
        </Modal>
        
    </div>
   
  )
}
