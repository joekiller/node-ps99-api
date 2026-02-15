import React from "react";
import { CollectionConfigData } from "ps99-api";

const SecretRoomComponent: React.FC<{
  configData: CollectionConfigData<"SecretRooms">;
}> = ({ configData }) => {
  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'left', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <p><strong>Instance ID:</strong> {configData.InstanceId}</p>
        <p><strong>Required Zone:</strong> {configData.RequiredZone}</p>
      </div>
    </div>
  );
};

export default SecretRoomComponent;
