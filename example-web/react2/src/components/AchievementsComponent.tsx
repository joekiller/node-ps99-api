import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";


const AchievementsComponent: React.FC<{
  configData: CollectionConfigData<"Achievements">;
}> = ({ configData }) => {
  const { resolveItem, getRarityColor, loading } = useItemResolution();

  if (loading) return <div>Loading data...</div>;

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
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        alignItems: 'start'
      }}>

        {/* Left Column: Icon & Info */}
        <div className="sticky-info-column" style={{
          flex: '1 1 300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          background: '#f9f9f9',
          padding: '30px',
          borderRadius: '24px',
          border: '2px solid #eee'
        }}>
          <div style={{ width: '100%', maxWidth: '200px' }}>
            <ItemCard
              id={configData.Name}
              amount={1}
              label={configData.Name}
              itemData={{
                icon: configData.Icon,
                rarity: undefined,
                name: configData.Name
              }}
              rarityColor={null}
            />
          </div>
          {/* If there's a description in configData, add it here. Currently Achievements doesn't seem to have a top-level Desc in the type, checking usage. */}
          <h2 style={{ margin: 0, textAlign: 'center', color: '#333' }}>{configData.Name}</h2>
        </div>

        {/* Right Column: Tiers/Goals */}
        <div style={{
          flex: '2 1 300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          minWidth: '300px'
        }}>
          <div style={{ background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ fontSize: '1.4em', margin: 0 }}>Tiers</h3>
            </div>

            {configData.Tiers.map((tier, index) => (
              <div key={index} style={{
                marginBottom: '20px',
                background: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #eee'
              }}>
                {/* Tier Header */}
                <div style={{
                  background: 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)',
                  padding: '12px 20px',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.9em' }}>
                      Tier {index + 1}
                    </span>
                    <span>{tier.Title}</span>
                  </div>
                  <div style={{ fontSize: '0.8em', background: 'rgba(0,0,0,0.2)', padding: '4px 8px', borderRadius: '6px' }}>
                    {tier.Difficulty.Name}
                  </div>
                </div>

                {/* Tier Content */}
                <div style={{ padding: '20px' }}>
                  {/* Description & Goal */}
                  <div style={{ marginBottom: '15px', color: '#555', fontSize: '1.1em', lineHeight: '1.5' }}>
                    {tier.Desc.replace("{amount}", tier.Amount.toLocaleString())}
                  </div>

                  {/* Rewards */}
                  {tier.Rewards && tier.Rewards.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '1em', marginBottom: '10px', color: '#333', textTransform: 'uppercase', letterSpacing: '1px' }}>Rewards</h4>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                          gap: "10px",
                        }}
                      >
                        {tier.Rewards.map((reward, rewardIndex) => {
                          const id = reward.Reward._data.id;
                          const amount = reward.Reward._data._am;
                          const itemData = resolveItem(id);
                          return (
                            <div key={rewardIndex}>
                              <ItemCard
                                id={id}
                                amount={amount}
                                label={id}
                                itemData={itemData}
                                rarityColor={itemData?.rarity ? getRarityColor(itemData.rarity) : null}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsComponent;
