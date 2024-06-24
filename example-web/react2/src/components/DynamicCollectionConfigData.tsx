import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  PetSimulator99API,
  CollectionName,
  CollectionConfigData, Collection,
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
  const [configDataList, setConfigDataList] = useState<Collection<
    typeof collectionName
  >[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection(collectionName);
      if (response.status === "ok") {
        setConfigDataList(response.data);
      } else {
        setError(response.error.message);
      }
    };
    fetchData();
  }, [collectionName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!configDataList) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {configDataList.map((configData, index) => {
        const Component = lazy(() => import(`./${collectionName}Component`));
        return (
          <Suspense fallback={<div key={index}>Loading...</div>} key={index}>
            <Component
              configData={
                configData.configData as CollectionConfigData<
                  typeof collectionName
                >
              }
            />
          </Suspense>
        );
      })}
    </div>
  );
};

export default DynamicCollectionConfigData;
