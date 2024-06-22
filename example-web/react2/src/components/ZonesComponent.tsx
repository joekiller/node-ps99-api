import React, { useEffect, useState } from 'react';
import {PetSimulator99API, ZoneData} from 'ps99-api';

const ZonesComponent: React.FC = () => {
  const [zones, setZones] = useState<ZoneData[]>([]);

  useEffect(() => {
    const fetchZones = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Zones");
      if (response.status === 'ok') {
        setZones(response.data);
      }
    };
    fetchZones();
  }, []);

  return (
    <div>
      <h2>Zones</h2>
      <ul>
        {zones.map((zone, index) => (
          <li key={index}>
            <span>{zone.configData.ZoneName}</span>
            <span>World Number: {zone.configData.WorldNumber}</span>
            <span>Zone Number: {zone.configData.ZoneNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZonesComponent;
