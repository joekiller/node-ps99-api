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

  /*
   * We need to use useMemo here to prevent the component from being re-created
   * on every render. This usage of useMemo is safe because the import path
   * depends only on collectionName, and we want to re-create the component
   * only when collectionName changes.
   */
  const Component = React.useMemo(() => {
    if (!collectionName) return null;
    return lazy(() => import(`./${collectionName}Component`));
  }, [collectionName]);

  if (!collectionName || !configName || !Component) {
    return <div>Invalid collection or config name</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenericFetchComponent
        // We use the key prop to force a re-mount of the component when the
        // collectionName or configName changes. This ensures that the internal
        // state of the GenericFetchComponent is reset and the new data is
        // fetched correctly, preventing stale data from being passed to the
        // child component.
        key={`${collectionName}-${configName}`}
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
