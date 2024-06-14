import React, { useEffect, useState } from "react";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";
import { axiosInstance, useAxiosAuth } from "../../services/axiosConfig";
import { Scene } from "../../interfaces/models.interfaces"; // Ajusta la ruta de importación
import { notification } from "antd/lib";

export const SceneList: React.FC = () => {
  const [sceneData, setSceneData] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(true);
  useAxiosAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/scene");
        setSceneData(response.data);
      } catch (error) {
        console.error("Error fetching scene data:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch scene data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sceneData || sceneData.length === 0) {
    return <div>No data available</div>;
  }
  return (
    <List>
      <Table dataSource={sceneData} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="title" title={"Title"} />
        <Table.Column dataIndex="description" title={"Description"} />
        <Table.Column dataIndex="budget" title={"Budget"} />
        <Table.Column dataIndex="minutes" title={"Minutes"} />
        <Table.Column dataIndex="filmId" title={"Film ID"} />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
