import React, { useEffect, useState } from "react";
import { PetSimulator99API, RandomEventData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const RandomEventsComponent: React.FC = () => {
  const [randomEvents, setRandomEvents] = useState<RandomEventData[]>([]);

  useEffect(() => {
    const fetchRandomEvents = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("RandomEvents");
      if (response.status === "ok") {
        setRandomEvents(response.data);
      }
    };
    fetchRandomEvents();
  }, []);

  return (
    <div>
      <h2>Random Events</h2>
      <ul>
        {randomEvents.map((event, index) => (
          <li key={index}>
            <ImageComponent
              src={event.configData.Icon}
              alt={event.configData.Name}
            />
            <span>{event.configData.Name}</span>
            <span>Duration: {event.configData.Duration}</span>
            <span>Chance: {event.configData.Chance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomEventsComponent;
