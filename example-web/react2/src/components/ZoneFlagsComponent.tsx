import React, { useEffect, useState } from 'react';
import {PetSimulator99API, ZoneFlagData} from 'ps99-api';
import ImageComponent from "./ImageComponent";

const ZoneFlagsComponent: React.FC = () => {
  const [zoneFlags, setZoneFlags] = useState<ZoneFlagData[]>([]);

  useEffect(() => {
    const fetchZoneFlags = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("ZoneFlags");
      if (response.status === 'ok') {
        setZoneFlags(response.data);
      }
    };
    fetchZoneFlags();
  }, []);

  return (
    <div>
      <h2>Zone Flags</h2>
      <ul>
        {zoneFlags.map((flag, index) => (
          <li key={index}>
            <ImageComponent src={flag.configData.Icon} alt={flag.configData.Name} />
            <span>{flag.configData.Name}</span>
            <span>Duration: {flag.configData.Duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZoneFlagsComponent;
