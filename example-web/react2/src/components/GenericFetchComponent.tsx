import React, { useEffect, useState, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { PetSimulator99API, ApiResponseBody, CollectionName } from "ps99-api";

interface GenericFetchComponentProps<T> {
  collectionName: CollectionName;
  render: (data: T) => ReactNode;
  configData?: T;
}

export const GenericFetchComponent = <T,>({
  collectionName,
  render,
  configData,
}: GenericFetchComponentProps<T>) => {
  const { configName } = useParams<{ configName: string }>();
  const [data, setData] = useState<T | null>(configData || null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (configData) return;

    const fetchData = async () => {
      if (!configName) return;
      const api = new PetSimulator99API();
      const response: ApiResponseBody<any[]> =
        await api.getCollection(collectionName);
      if (response.status === "ok") {
        const item = response.data.find(
          (item) => item.configName === configName,
        );
        if (item) {
          setData(item.configData);
        } else {
          setError("Configuration not found");
        }
      } else {
        setError(response.error.message);
      }
    };
    fetchData();
  }, [collectionName, configName, configData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>{render(data)}</div>;
};
