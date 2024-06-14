import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber } from "antd";
import { axiosInstance, useAxiosAuth } from "../../services/axiosConfig";
import { Scene } from "../../interfaces/models.interfaces";
import { FormInstance, notification } from "antd";

export const SceneCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<Scene>({});
  useAxiosAuth();

  const handleFinish = async (values: Scene) => {
    try {
      await axiosInstance.post("/scene", values);
      notification.success({
        message: "Scene Created",
        description: "The scene has been created successfully.",
      });
    } catch (error: any) {
      console.error("Error creating scene:", error);
      notification.error({
        message: "Error",
        description: `There was an error creating the scene: ${error.message}`,
      });
    }
  };

  return (
    <Create
      saveButtonProps={{
        ...saveButtonProps,
        onClick: () => formProps.form?.submit(),
      }}
    >
      <Form<Scene>
        {...formProps}
        form={formProps.form as FormInstance<Scene>}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item<Scene>
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
              message: "Please input the title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<Scene>
          label={"Description"}
          name={["description"]}
          rules={[
            {
              required: true,
              message: "Please input the description!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item<Scene>
          label={"Budget"}
          name={["budget"]}
          rules={[
            {
              required: true,
              message: "Please input the budget!",
            },
            {
              type: "number",
              min: 0,
              message: "Budget must be a non-negative number!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item<Scene>
          label={"Minutes"}
          name={["minutes"]}
          rules={[
            {
              required: true,
              message: "Please input the minutes!",
            },
            {
              type: "number",
              min: 0,
              message: "Minutes must be a non-negative number!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item<Scene>
          label={"Film ID"}
          name={["filmId"]}
          rules={[
            {
              required: true,
              message: "Please input the film ID!",
            },
            {
              type: "number",
              min: 1,
              message: "Film ID must be a positive number!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Create>
  );
};
