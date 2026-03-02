import React, { useEffect, useState, ReactNode } from "react";
import { PetSimulator99API, ApiResponseBody, CollectionName } from "ps99-api";

interface GenericFetchComponentProps<T> {
  collectionName: CollectionName;
  configName: string;
  render: (data: T, item?: any) => ReactNode;
}

export const GenericFetchComponent = <T,>({
  collectionName,
  configName,
  render,
}: GenericFetchComponentProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [fullItem, setFullItem] = useState<any | null>(null);
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
            const rawConfigName = decodeURIComponent(configName);
            const isEventRoute = window.location.hash.includes("Event");

            const item = response.data.find((item) => {
              const matchesId = item.configName === rawConfigName ||
                (item.configName.includes(" | ") && item.configName.split(" | ")[0] === rawConfigName) ||
                (collectionName === "Worlds" && item.configName === `World ${rawConfigName}`) ||
                (collectionName === "Zones" && item.configName === `${rawConfigName}`);

              if (!matchesId) return false;

              // If it's a zone with an overlapping ID, we need to distinguish based on Category
              if (collectionName === "Zones") {
                const itemCat = item.category || "";

                // If the URL route had "Event" in it somehow, or we want to default to the standard world vs event match
                // We'll prioritize standard non-event zones unless the item explicitly says Event in the name
                // Actually the cleanest way to fix URL routing overlap is by seeing if item has 'Event' in name/cat
                const isItemEvent = item.configName.includes("Event") || itemCat.includes("Event");

                if (isEventRoute) {
                  return isItemEvent;
                } else {
                  // Only match non-event zones if route didn't specify Event
                  return !isItemEvent;
                }
              }

              return true;
            });

            if (item) {
              setData(item.configData);
              setFullItem(item);
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

  return (
    <div style={{
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {render(data, fullItem)}
    </div>
  );
};
