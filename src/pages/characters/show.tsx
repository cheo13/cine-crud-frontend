import React from "react";
import { Show, useOne } from "@refinedev/antd";
import { Typography, Descriptions, Spin, Image } from "antd";
import { useParams } from "react-router-dom";
import { Scene, Film } from "../../interfaces/models.interfaces";

const { Title } = Typography;

export const SceneShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: sceneData, loading: showLoading } = useOne<Scene>({
    resource: "scene",
    id,
  });

  const { data: filmData } = useOne<Film>({
    resource: "films",
    id: sceneData?.filmId.toString() || "",
  });

  if (showLoading || !sceneData || !filmData) {
    return <Spin size="large" />;
  }

  return (
    <Show>
      <Title level={2}>{sceneData.title}</Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Description">
          {sceneData.description}
        </Descriptions.Item>
        <Descriptions.Item label="Budget">
          ${sceneData.budget}
        </Descriptions.Item>
        <Descriptions.Item label="Minutes">
          {sceneData.minutes} minutes
        </Descriptions.Item>
        <Descriptions.Item label="Film">{filmData.title}</Descriptions.Item>
      </Descriptions>
      {sceneData.imageUrl && (
        <div style={{ marginTop: 20 }}>
          <Image src={sceneData.imageUrl} alt={sceneData.title} width={200} />
        </div>
      )}
    </Show>
  );
};
