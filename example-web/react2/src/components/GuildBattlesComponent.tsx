import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";

const GuildBattlesComponent: React.FC<{
  configData?: CollectionConfigData<"GuildBattles">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"GuildBattles">>
      collectionName="GuildBattles"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.Title}</h2>
          <p>Start Time: {new Date(data.StartTime * 1000).toLocaleString()}</p>
          <p>
            Finish Time: {new Date(data.FinishTime * 1000).toLocaleString()}
          </p>
          {data.HasGoals && <p>Has Goals: Yes</p>}
          <h3>Placement Rewards:</h3>
          <ul>
            {data.PlacementRewards?.map((reward, index) => (
              <li key={index}>
                <p>Item ID: {reward.Item._data.id}</p>
                {reward.Item._data.pt && <p>Points: {reward.Item._data.pt}</p>}
                <p>Best: {reward.Best}</p>
                <p>Worst: {reward.Worst}</p>
              </li>
            ))}
          </ul>
          <h3>Rewards:</h3>
          <div>
            <h4>Gold:</h4>
            <ul>
              {data.Rewards.Gold.map((reward, index) => (
                <li key={index}>
                  <p>Item ID: {reward._data.id}</p>
                </li>
              ))}
            </ul>
            <h4>Silver:</h4>
            <ul>
              {data.Rewards.Silver.map((reward, index) => (
                <li key={index}>
                  <p>Item ID: {reward._data.id}</p>
                </li>
              ))}
            </ul>
            <h4>Bronze:</h4>
            <ul>
              {data.Rewards.Bronze.map((reward, index) => (
                <li key={index}>
                  <p>Item ID: {reward._data.id}</p>
                </li>
              ))}
            </ul>
            {data.Rewards.Good && (
              <div>
                <h4>Good:</h4>
                <ul>
                  {data.Rewards.Good.map((reward, index) => (
                    <li key={index}>
                      <p>Item ID: {reward._data.id}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default GuildBattlesComponent;
