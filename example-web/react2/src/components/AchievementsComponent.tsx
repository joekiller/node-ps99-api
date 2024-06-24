import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const AchievementsComponent: React.FC<{
  configData?: CollectionConfigData<"Achievements">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Achievements">>
      collectionName="Achievements"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.Name}</h2>
          <ImageComponent src={data.Icon} alt={data.Name} />
          <ul>
            {data.Tiers.map((tier, index) => (
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
      )}
    />
  );
};

export default AchievementsComponent;
