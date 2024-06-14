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
import { Character, Scene } from "../../interfaces/models.interfaces"; // Ajusta la ruta de importación
import { notification } from "antd/lib";

export const CharactersList: React.FC = () => {
  const [characterData, setCharacterData] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState(true);

  useAxiosAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/characters");
        setCharacterData(response.data);
      } catch (error) {
        console.error("Error fetching characters data:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch characters data.",
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

  if (!characterData || characterData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <List>
      <Table dataSource={characterData} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="role" title="Role" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          dataIndex="typeChart"
          title="Type Chart"
          render={(typeChart: Character["typeChart"]) => (
            <span>{typeChart}</span>
          )}
        />
        <Table.Column dataIndex="cost" title="Cost" />
        <Table.Column dataIndex="sceneId" title="Scene ID" />
        <Table.Column
          title="Actions"
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
