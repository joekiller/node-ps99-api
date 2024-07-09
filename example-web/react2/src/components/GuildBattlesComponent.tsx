import React from "react";
import { CollectionConfigData, GuildBattlePlacementReward, GuildBattleRewardItem } from "ps99-api";
import DynamicCollectionConfigData from "./DynamicCollectionConfigData";
import PetsComponent from "./PetsComponent";

const rewardTypes = ["Clan Gift", "Booth", "Hoverboard", "Pet"];

const GuildBattlesComponent: React.FC<{
  configData: CollectionConfigData<"GuildBattles">;
}> = ({ configData }) => {
  const renderRewardComponent = (reward: GuildBattlePlacementReward | GuildBattleRewardItem, index: number) => {
    const rewardType = rewardTypes[index % rewardTypes.length];

    let id: string;
    let pt: number | undefined;

    if ("Item" in reward) { // GuildBattlePlacementReward
      id = reward.Item._data.id;
      pt = reward.Item._data.pt;
    } else { // GuildBattleRewardItem
      id = reward._data.id;
    }

    if (id.startsWith("Huge")) {
      return (
        <DynamicCollectionConfigData
          collectionName="Pets"
          configName={id}
          render={(configData: CollectionConfigData<"Pets">) => <PetsComponent configData={configData} displayType="specific" pt={pt} />}
        />
      );
    } else if (id.startsWith("Exclusive Egg")) {
      return <DynamicCollectionConfigData collectionName="Eggs" configName={id} />;
    }

    switch (rewardType) {
      case "Clan Gift":
        return <DynamicCollectionConfigData collectionName="Lootboxes" configName="Clan Gift" />;
      case "Booth":
        return <DynamicCollectionConfigData collectionName="Booths" configName={`Booth | ${id}`} />;
      case "Hoverboard":
        return <DynamicCollectionConfigData collectionName="Hoverboards" configName={`Hoverboard | ${id}`} />;
      default:
        return <p><strong>Item ID:</strong> {id}</p>;
    }
  };

  return (
    <div style={{ padding: "1em", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "2em" }}>
      <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5em" }}>{configData.Title}</h2>
      <p><strong>Start Time:</strong> {new Date(configData.StartTime * 1000).toLocaleString()}</p>
      <p><strong>Finish Time:</strong> {new Date(configData.FinishTime * 1000).toLocaleString()}</p>
      {configData.HasGoals && <p><strong>Has Goals:</strong> Yes</p>}

      <h3>Placement Rewards:</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
        {configData.PlacementRewards?.map((reward, index) => (
          <div key={index} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1em',
            flex: '1 1 calc(33% - 1em)',
            boxSizing: 'border-box',
          }}>
            {renderRewardComponent(reward, index)}
            <p><strong>Best:</strong> {reward.Best}</p>
            <p><strong>Worst:</strong> {reward.Worst}</p>
          </div>
        ))}
      </div>

      <h3>Rewards:</h3>
      {["Gold", "Silver", "Bronze", "Good"].map(tier => (
        configData.Rewards[tier]?.length > 0 && (
          <div key={tier}>
            <h4>{tier}</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
              {configData.Rewards[tier].map((reward, index) => (
                <div key={index} style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '1em',
                  flex: '1 1 calc(33% - 1em)',
                  boxSizing: 'border-box',
                }}>
                  {renderRewardComponent(reward, index)}
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default GuildBattlesComponent;
