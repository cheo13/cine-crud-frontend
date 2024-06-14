import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";
import { Film } from "../../interfaces/models.interfaces";
import { useEffect, useState } from "react";
import { axiosInstance, useAxiosAuth } from "../../services/axiosConfig";
import { notification } from "antd";

interface FilmsData extends Film {}

export const FilmsList: React.FC = () => {
  const [filmsData, setFilmsData] = useState<FilmsData[]>([]);
  const [loading, setLoading] = useState(true);
  useAxiosAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/film");
        setFilmsData(response.data);
      } catch (error) {
        console.error("Error fetching films data:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch films data.",
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

  if (!filmsData || filmsData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <List>
      <Table dataSource={filmsData} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="title" title={"Title"} />
        <Table.Column dataIndex="director" title={"Director"} />
        <Table.Column dataIndex="duration" title={"Duration"} />
        <Table.Column dataIndex="releaseDate" title={"Release Date"} />
        <Table.Column dataIndex="languages" title={"Languages"} />
        <Table.Column dataIndex="genre" title={"Genre"} />
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
