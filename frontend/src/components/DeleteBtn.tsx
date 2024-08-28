import { DeleteOutlined } from "@ant-design/icons";
import { deleteProject, deleteTask } from "../services/api";
import { Button, ConfigProviderProps } from "antd";
import { useState } from "react";
type SizeType = ConfigProviderProps["componentSize"];

type DeleteProps = {
  id: number;
  type: string;
};
export const DeleteProject = ({ id, type }: DeleteProps) => {
  //@ts-ignore
  const [size, setSize] = useState<SizeType>("large");
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const handleDelete = () => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    if (type == "project") {
      deleteProject(id);
    } else if (type == "task") {
      deleteTask(id);
    }
  };
  return (
    <div>
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        size={size}
        loading={loadings[0]}
        onClick={() => handleDelete()}
      />
    </div>
  );
};
