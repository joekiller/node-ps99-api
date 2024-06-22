import React, { useEffect, useState } from 'react';
import {PetSimulator99API, SecretRoomData} from 'ps99-api';

const SecretRoomsComponent: React.FC = () => {
  const [secretRooms, setSecretRooms] = useState<SecretRoomData[]>([]);

  useEffect(() => {
    const fetchSecretRooms = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("SecretRooms");
      if (response.status === 'ok') {
        setSecretRooms(response.data);
      }
    };
    fetchSecretRooms();
  }, []);

  return (
    <div>
      <h2>Secret Rooms</h2>
      <ul>
        {secretRooms.map((room, index) => (
          <li key={index}>
            <span>{room.configData.DisplayName}</span>
            <span>Required Zone: {room.configData.RequiredZone}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecretRoomsComponent;
