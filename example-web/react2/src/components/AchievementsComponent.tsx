import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const AchievementsComponent: React.FC<{
  configData: CollectionConfigData<"Achievements">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.Name}</h2>
      <ImageComponent src={configData.Icon} alt={configData.Name} />
      <ul>
        {configData.Tiers.map((tier, index) => (
          <li key={index}>
            <h3>{tier.Title}</h3>
            <p>{tier.Desc.replace("{amount}", tier.Amount.toString())}</p>
            <p>Difficulty: {tier.Difficulty.Name}</p>
            <p>Amount: {tier.Amount}</p>
            <ul>
              {tier.Rewards.map((reward, rewardIndex) => (
                <li key={rewardIndex}>
                  Reward ID: {reward.Reward._data.id} Amount:{" "}
                  {reward.Reward._data._am}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementsComponent;
