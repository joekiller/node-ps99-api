import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { CollectionName, CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";

interface DynamicCollectionConfigDataProps {
  collectionName?: CollectionName;
  configName?: string;
  render?: (configData: CollectionConfigData<any>) => React.ReactNode; // Add render prop
}

const DynamicCollectionConfigData: React.FC<
  DynamicCollectionConfigDataProps
> = (props) => {
  const params = useParams<{
    collectionName: CollectionName;
    configName: string;
  }>();

  const collectionName = props.collectionName || params.collectionName;
  const configName = props.configName || params.configName;

  if (!collectionName || !configName) {
    return <div>Invalid collection or config name</div>;
  }

  const Component = lazy(() => import(`./${collectionName}Component`));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenericFetchComponent
        collectionName={collectionName}
        configName={configName}
        render={
          props.render ||
          ((configData) => <Component configData={configData} />)
        } // Use render prop if provided
      />
    </Suspense>
  );
};

export default DynamicCollectionConfigData;
