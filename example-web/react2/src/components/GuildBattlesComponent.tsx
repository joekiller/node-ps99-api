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
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <style>{`
        .sticky-info-column {
          position: sticky;
          top: 20px;
        }
        @media (max-width: 800px) {
          .sticky-info-column {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        alignItems: "start"
      }}>
        {/* Left Column: Battle Info */}
        <div className="sticky-info-column" style={{
          flex: "1 1 250px",
          background: "#fff",
          padding: "30px",
          borderRadius: "24px",
          border: "2px solid #eee",
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ textAlign: 'center', borderBottom: '2px solid #f0f0f0', paddingBottom: '20px', marginBottom: '10px' }}>
            <div style={{ width: "80px", height: "80px", margin: '0 auto 15px auto' }}>
              <ImageComponent src={(configData as any).Icon || placeholderIcon} alt={configData.Title} />
            </div>
            <h2 style={{ margin: 0, color: '#333', fontSize: '1.6em' }}>{configData.Title}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <InfoRow label="Start Time" value={new Date(configData.StartTime * 1000).toLocaleString()} />
            <InfoRow label="Finish Time" value={new Date(configData.FinishTime * 1000).toLocaleString()} />
            <InfoRow label="Has Goals" value={configData.HasGoals ? "Yes" : "No"} />
          </div>
        </div>

        {/* Right Column: Rewards */}
        <div style={{
          flex: "2 1 300px",
          background: "transparent",
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>

          {/* Placement Rewards */}
          {configData.PlacementRewards && configData.PlacementRewards.length > 0 && (
            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid #eee', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.5em', marginTop: 0, marginBottom: '20px', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>Placement Rewards</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {configData.PlacementRewards?.map((reward, index) => (
                  <div key={index} style={{
                    flex: '1 1 200px',
                    maxWidth: '300px',
                    background: '#f9f9f9',
                    borderRadius: '16px',
                    padding: '15px',
                    border: '1px solid #eee'
                  }}>
                    {renderRewardItem(reward, index)}
                    <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9em', color: '#666', background: '#fff', padding: '10px', borderRadius: '8px' }}>
                      <p style={{ margin: '2px 0', color: '#2e7d32', fontWeight: 'bold' }}>Best: {reward.Best}</p>
                      <p style={{ margin: '2px 0', color: '#c62828' }}>Worst: {reward.Worst}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Standard Rewards */}
          <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid #eee', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.5em', marginTop: 0, marginBottom: '20px', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>Tier Rewards</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {["Gold", "Silver", "Bronze", "Good"].map(tier => (
                configData.Rewards[tier]?.length > 0 && (
                  <div key={tier}>
                    <h4 style={{
                      margin: '0 0 15px 0',
                      color: tier === 'Gold' ? '#ffb300' : tier === 'Silver' ? '#757575' : tier === 'Bronze' ? '#8d6e63' : '#333',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontSize: '1em'
                    }}>{tier}</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                      {configData.Rewards[tier].map((reward, index) => (
                        <div key={index} style={{
                          border: '1px solid #eee',
                          borderRadius: '12px',
                          padding: '10px',
                          flex: '0 1 auto',
                          minWidth: '80px',
                          maxWidth: '120px',
                          background: '#fff',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}>
                          {renderRewardItem(reward, index)}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string, value: any }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #eee', paddingBottom: '8px' }}>
    <span style={{ fontWeight: '600', color: '#777' }}>{label}</span>
    <span style={{ fontWeight: 'bold', color: '#333' }}>{value}</span>
  </div>
);

export default GuildBattlesComponent;
