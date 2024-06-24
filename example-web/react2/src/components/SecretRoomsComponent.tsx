import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";

const SecretRoomComponent: React.FC<{
  configData?: CollectionConfigData<"SecretRooms">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"SecretRooms">>
      collectionName="SecretRooms"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Secret Room: {data.DisplayName}</h2>
          <p>Instance ID: {data.InstanceId}</p>
          <p>Required Zone: {data.RequiredZone}</p>
        </div>
      )}
    />
  );
};

export default SecretRoomComponent;
