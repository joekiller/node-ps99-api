import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { CollectionName } from "ps99-api";

const DynamicCollectionConfigData: React.FC = () => {
  const { collectionName, configName } = useParams<{ collectionName: CollectionName; configName: string }>();

  if (!collectionName || !configName) {
    return <div>Invalid collection or config name</div>;
  }

  const Component = lazy(() => import(`./${collectionName}Component`));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component configName={configName} />
    </Suspense>
  );
};

export default DynamicCollectionConfigData;
