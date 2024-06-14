import React from "react";
import { Edit, useForm, useOne } from "@refinedev/antd";
import { Form, Input, Select, notification } from "antd";
import { axiosInstance, useAxiosAuth } from "../../services/axiosConfig";
import { useParams } from "react-router-dom";
import { Scene, Film } from "../../interfaces/models.interfaces";

const { Option } = Select;

export const SceneEdit: React.FC = () => {
  useAxiosAuth();

  const { id } = useParams<{ id: string }>();
  const { formProps, saveButtonProps, queryResult, formLoading } =
    useForm<Scene>({
      resource: "scenes",
      action: "edit",
      id,
    });

  const { data: filmsData } = useOne<Film>({
    resource: "films",
    id: queryResult?.data?.data?.filmId.toString() || "",
  });

  const handleFinish = async (values: Scene) => {
    try {
      await axiosInstance.patch(`/scene/${values.id}`, values);
      notification.success({
        message: "Scene Updated",
        description: "The scene has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating scene:", error);
      notification.error({
        message: "Error",
        description: `There was an error updating the scene: ${error.message}`,
      });
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input the title of the scene",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the description of the scene",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Budget"
          name="budget"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              message: "Please input a valid budget",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Minutes"
          name="minutes"
          rules={[
            {
              required: true,
              type: "number",
              min: 1,
              message: "Please input the duration of the scene in minutes",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Film"
          name="filmId"
          rules={[
            {
              required: true,
              message: "Please select the film",
            },
          ]}
        >
          <Select placeholder="Select a film">
            {filmsData?.data?.map((film) => (
              <Option key={film.id} value={film.id}>
                {film.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Edit>
  );
};
