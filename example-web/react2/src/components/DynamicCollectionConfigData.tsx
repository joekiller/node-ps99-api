import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import {
  PetSimulator99API,
  CollectionName,
  Collection,
  CollectionConfigData,
} from "ps99-api";

const DynamicCollectionConfigData: React.FC = () => {
  const { collectionName, configName } = useParams<{
    collectionName: CollectionName;
    configName: string;
  }>();

  if (!collectionName) {
    return <div>Invalid collection name</div>;
  }

  if (configName === "all") {
    return <RenderAllConfigs collectionName={collectionName} />;
  }

  const Component = lazy(() => import(`./${collectionName}Component`));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

const RenderAllConfigs: React.FC<{ collectionName: CollectionName }> = ({
  collectionName,
}) => {
  const [configDataList, setConfigDataList] = useState<
    Array<Collection<CollectionName>>
  >([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async (page: number) => {
    try {
      const api = new PetSimulator99API();
      const response = await api.getCollection(collectionName);
      if (response.status === "ok") {
        const start = page * 20;
        const end = start + 20;
        setConfigDataList((prev) => [
          ...prev,
          ...response.data.slice(start, end),
        ]);
      } else {
        setError(response.error.message);
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {configDataList.map((configData, index) => {
        const Component = lazy(() => import(`./${collectionName}Component`));
        if (index === configDataList.length - 1) {
          return (
            <div ref={lastElementRef} key={index}>
              <Suspense fallback={<div>Loading...</div>}>
                <Component
                  configData={
                    configData.configData as CollectionConfigData<
                      typeof collectionName
                    >
                  }
                />
              </Suspense>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <Suspense fallback={<div>Loading...</div>}>
                <Component
                  configData={
                    configData.configData as CollectionConfigData<
                      typeof collectionName
                    >
                  }
                />
              </Suspense>
            </div>
          );
        }
      })}
      <div ref={loadMoreRef}></div>
    </div>
  );
};

export default DynamicCollectionConfigData;
