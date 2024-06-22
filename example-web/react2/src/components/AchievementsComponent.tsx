import React, { useEffect, useState } from "react";
import { AchievementData, PetSimulator99API } from "ps99-api";
import ImageComponent from "./ImageComponent";

const AchievementsComponent: React.FC = () => {
  const [achievements, setAchievements] = useState<AchievementData[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Achievements");
      if (response.status === "ok") {
        setAchievements(response.data);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <div>
      <h2>Achievements</h2>
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index}>
            <ImageComponent
              src={achievement.configData.Icon}
              alt={achievement.configData.Name}
            />
            <span>{achievement.configData.Name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementsComponent;
