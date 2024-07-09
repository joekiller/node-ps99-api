import React from "react";
import { CollectionConfigData } from "ps99-api";

const SecretRoomComponent: React.FC<{
  configData: CollectionConfigData<"SecretRooms">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Secret Room: {configData.DisplayName}</h2>
      <p>Instance ID: {configData.InstanceId}</p>
      <p>Required Zone: {configData.RequiredZone}</p>
    </div>
  );
};

export default SecretRoomComponent;
