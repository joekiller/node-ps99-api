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
    let isMounted = true;

    const fetchData = async () => {
      try {
        const api = new PetSimulator99API();
        const response: ApiResponseBody<any[]> =
          await api.getCollection(collectionName);
        if (isMounted) {
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
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [collectionName, configName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>{render(data)}</div>;
};
