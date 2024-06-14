import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, notification } from "antd";
import { axiosInstance, useAxiosAuth } from "../../services/axiosConfig";
import { Film } from "../../interfaces/models.interfaces";
import { useParams } from "react-router-dom";
import { FormInstance } from "antd/lib/form";

export const FilmEdit: React.FC = () => {
  useAxiosAuth();
  const { id } = useParams<{ id: string }>();
  const { formProps, saveButtonProps, queryResult, formLoading } =
    useForm<Film>({
      resource: "film",
      action: "edit",
      id,
    });

  const filmData = queryResult?.data?.data; // Asegurar que filmData sea de tipo Film

  const handleFinish = async (values: Film) => {
    try {
      await axiosInstance.patch(`/film/${id}`, values);
      notification.success({
        message: "Film Updated",
        description: "The film has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating film:", error);
      notification.error({
        message: "Error",
        description: `There was an error updating the film: ${error.message}`,
      });
    }
  };

  return (
    <Edit
      saveButtonProps={{
        ...saveButtonProps,
        onClick: () => formProps.form?.submit(),
      }}
      isLoading={formLoading}
    >
      <Form<Film>
        {...formProps}
        form={formProps.form as FormInstance<Film>}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={filmData} // Establecer los valores iniciales del formulario con filmData
      >
        <Form.Item
          label="Title"
          name="title"
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
          label="Director"
          name="director"
          rules={[
            {
              required: true,
              message: "Please input the director of the film",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          label="Duration (minutes)"
          name="duration"
          rules={[
            {
              required: true,
              message: "Please input the duration of the film in minutes",
            },
            {
              // type: "number",
              // min: 1401,
              // message: "Duration must be a positive number",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item> */}

        {/* <Form.Item
          label={"Release Date"}
          name="releaseDate"
          rules={[
            {
              required: true,
              message: "Please select the release date of the film",
            },
          ]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item
          label="Languages"
          name="languages"
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
          label="Genre"
          name="genre"
          rules={[
            {
              required: true,
              message: "Please input the genre of the film",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item label={"Image URL"} name="imageUrl">
          <Input />
        </Form.Item> */}
      </Form>
    </Edit>
  );
};
