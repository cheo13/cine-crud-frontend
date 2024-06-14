import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, InputNumber, notification } from "antd";
import { Film } from "../../interfaces/models.interfaces"; // Asegúrate de importar correctamente la interfaz Film
import { axiosInstance, useAxiosAuth } from "../../services/axiosConfig";
import { FormInstance } from "antd/lib";

export const FilmCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<Film>({});
  useAxiosAuth();

  const handleFinish = async (values: Film) => {
    try {
      await axiosInstance.post("/film", values);
      notification.success({
        message: "Film Created",
        description: "The film has been created successfully.",
      });
    } catch (error: any) {
      console.error("Error creating film:", error);
      notification.error({
        message: "Error",
        description: `There was an error creating the film: ${error.message}`,
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
      {" "}
      <Form<Film>
        {...formProps}
        form={formProps.form as FormInstance<Film>}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item<Film>
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
              message: "Please input the title of the film",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Director"}
          name={["director"]}
          rules={[
            {
              required: true,
              message: "Please input the director of the film",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Duration (minutes)"}
          name={["duration"]}
          rules={[
            {
              required: true,
              message: "Please input the duration of the film in minutes",
            },
            {
              type: "number",
              min: 1,
              message: "Duration must be a positive number",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label={"Release Date"}
          name={["releaseDate"]}
          rules={[
            {
              required: true,
              message: "Please select the release date of the film",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label={"Languages"}
          name={["languages"]}
          rules={[
            {
              required: true,
              message: "Please input the languages of the film",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Genre"}
          name={["genre"]}
          rules={[
            {
              required: true,
              message: "Please input the genre of the film",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={"Image URL"} name={["imageUrl"]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
