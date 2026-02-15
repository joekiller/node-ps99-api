import React from "react";
import { CollectionConfigData, GuildBattlePlacementReward, GuildBattleRewardItem } from "ps99-api";
import DynamicCollectionConfigData from "./DynamicCollectionConfigData";
import { useItemResolution } from "../hooks/useItemResolution";
import ItemCard from "./ItemCard";
import ImageComponent from "./ImageComponent";
// @ts-ignore
import placeholderIcon from "../assets/guild_placeholder.png";

const rewardTypes = ["Clan Gift", "Booth", "Hoverboard", "Pet"];

const GuildBattlesComponent: React.FC<{
  configData: CollectionConfigData<"GuildBattles">;
}> = ({ configData }) => {
  const { resolveItem, getRarityColor, loading } = useItemResolution();

  if (loading) return <div>Loading data...</div>;

  const renderRewardItem = (reward: GuildBattlePlacementReward | GuildBattleRewardItem, index: number) => {
    let id: string;
    let amount = 1; // Default amount
    let pt: number | undefined;

    if ("Item" in reward) { // GuildBattlePlacementReward
      id = reward.Item._data.id;
      pt = reward.Item._data.pt;
      amount = (reward.Item._data as any)._am || 1;
    } else { // GuildBattleRewardItem
      id = reward._data.id;
      amount = (reward._data as any)._am || 1;
    }

    // Try to resolve the item using the hook
    const itemData = resolveItem(id, pt);
    const rarityColor = itemData?.rarity ? getRarityColor(itemData.rarity) : null;

    return (
      <ItemCard
        key={index}
        id={id}
        amount={amount}
        label={id}
        tn={pt}
        itemData={itemData}
        rarityColor={rarityColor}
      />
    );
  };

  return (
    <div style={{ padding: "1em", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "2em" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1em", borderBottom: "2px solid #ccc", paddingBottom: "0.5em" }}>
        <div style={{ width: "64px", height: "64px" }}>
          <ImageComponent src={(configData as any).Icon || placeholderIcon} alt={configData.Title} />
        </div>
        <h2 style={{ margin: 0 }}>{configData.Title}</h2>
      </div>
      <p><strong>Start Time:</strong> {new Date(configData.StartTime * 1000).toLocaleString()}</p>
      <p><strong>Finish Time:</strong> {new Date(configData.FinishTime * 1000).toLocaleString()}</p>
      {configData.HasGoals && <p><strong>Has Goals:</strong> Yes</p>}

      <h3>Placement Rewards:</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
        {configData.PlacementRewards?.map((reward, index) => (
          <div key={index} style={{
            flex: '1 1 300px', // Allow flex but with base width
            maxWidth: '350px',
            margin: '0 auto'
          }}>
            {renderRewardItem(reward, index)}
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9em', color: '#666' }}>
              <p style={{ margin: '2px 0' }}><strong>Best:</strong> {reward.Best}</p>
              <p style={{ margin: '2px 0' }}><strong>Worst:</strong> {reward.Worst}</p>
            </div>
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
                  {renderRewardItem(reward, index)}
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
