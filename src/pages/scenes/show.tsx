import React, { useEffect, useState } from "react";
import { Show } from "@refinedev/antd";
import { Typography, Descriptions, Spin, Image } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios"; // Ajusta la importación según tu configuración
import { Scene, Film } from "../../interfaces/models.interfaces";

const { Title } = Typography;

export const SceneShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sceneData, setSceneData] = useState<Scene | null>(null);
  const [filmData, setFilmData] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSceneAndFilmData = async () => {
      setLoading(true);
      try {
        // Obtener datos de la escena
        const sceneResponse = await axios.get<Scene>(`/api/scenes/${id}`);
        setSceneData(sceneResponse.data);

        // Obtener datos de la película asociada
        const filmResponse = await axios.get<Film>(
          `/api/films/${sceneResponse.data.filmId}`
        );
        setFilmData(filmResponse.data);
      } catch (error) {
        console.error("Error fetching scene or film data:", error);
        // Manejar el error según sea necesario
      } finally {
        setLoading(false);
      }
    };

    fetchSceneAndFilmData();
  }, [id]);

  if (loading || !sceneData || !filmData) {
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
      {/* {sceneData. && (
        <div style={{ marginTop: 20 }}>
          <Image src={sceneData.imageUrl} alt={sceneData.title} width={200} />
        </div>
      )} */}
    </Show>
  );
};
