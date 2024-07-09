import React, { useEffect, useState, ReactNode } from "react";
import { PetSimulator99API, ApiResponseBody, CollectionName } from "ps99-api";

interface GenericFetchComponentProps<T> {
  collectionName: CollectionName;
  configName: string;
  render: (data: T) => ReactNode;
}

export const GenericFetchComponent = <T,>({
  collectionName,
  configName,
  render,
}: GenericFetchComponentProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
  }, [collectionName, configName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>{render(data)}</div>;
};
