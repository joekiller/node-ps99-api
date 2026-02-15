import React from "react";
import { CollectionConfigData } from "ps99-api";

import { useItemResolution } from "../hooks/useItemResolution";
import ItemCard from "./ItemCard";

const RanksComponent: React.FC<{
  configData: CollectionConfigData<"Ranks">;
}> = ({ configData }) => {
  const { loading, resolveItem, getRarityColor } = useItemResolution();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.5rem",
        color: "#888"
      }}>
        Loading reference data...
      </div>
    );
  }

  /* renderItemCard logic moved to ItemCard.tsx */

  return (
    <div style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>
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

        {/* Left Column: Rank Info */}
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
          {/* Header/Icon placeholder if we had one, for now just the metrics */}
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <h2 style={{ margin: 0, color: '#333', fontSize: '2em' }}>Rank Info</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <InfoItem label="Max Enchants" value={configData.MaxEnchantsEquipped} />
            <InfoItem label="Max Goals" value={configData.MaximumActiveGoals} />
            <InfoItem label="Egg Slots" value={configData.UnlockableEggSlots} />
            <InfoItem label="Pet Slots" value={configData.UnlockablePetSlots} />
            {configData.RequiredRebirth && <InfoItem label="Rebirth Req" value={configData.RequiredRebirth} />}
            {configData.RequiredZone && <InfoItem label="Zone Req" value={configData.RequiredZone} />}
          </div>
        </div>

        {/* Right Column: Rewards & Goals */}
        <div style={{
          flex: "2 1 300px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          minWidth: "300px"
        }}>

          {/* Rewards Section */}
          {configData.Rewards && configData.Rewards.length > 0 && (
            <div style={{ background: "#fff" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.6em', margin: 0, color: '#333' }}>Rewards</h3>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: "15px"
              }}>
                {configData.Rewards.map((reward: any, i: number) => {
                  const data = reward.Item?._data || reward.Item || reward._data || reward;
                  const id = data.id || data._id || "Reward";
                  const amount = data._am || data.Amount || 1;
                  const tn = data.tn || data.Tier;
                  const itemData = resolveItem(id, tn);
                  return (
                    <ItemCard
                      key={`${id}-${tn}-${i}`}
                      id={id}
                      amount={amount}
                      label={id}
                      tn={tn}
                      itemData={itemData}
                      rarityColor={itemData?.rarity ? getRarityColor(itemData.rarity) : null}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Goals Section */}
          {configData.Goals && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.6em', margin: 0, color: '#333' }}>Goals</h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                {Array.isArray(configData.Goals) ? configData.Goals.map((goalSet: any[], setIndex: number) => (
                  <div key={setIndex} style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    border: '1px solid #eee'
                  }}>
                    <h4 style={{
                      fontSize: "1.1rem",
                      color: "#f57c00",
                      fontWeight: "800",
                      margin: "0 0 15px 0",
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    }}>
                      Goal Set {setIndex + 1}
                    </h4>

                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                      gap: "20px"
                    }}>
                      {goalSet.map((goal: any, index: number) => {
                        const id = String(goal.CurrencyID || goal.Type);
                        const tn = goal.EnchantTier || goal.PotionTier || goal.Tier;
                        const itemData = resolveItem(id, tn);
                        return (
                          <ItemCard
                            key={`${id}-${tn}-${index}`}
                            id={id}
                            amount={goal.Amount}
                            label={id}
                            tn={tn}
                            weight={goal.Weight}
                            typeId={goal.Type}
                            itemData={itemData}
                            rarityColor={itemData?.rarity ? getRarityColor(itemData.rarity) : null}
                          />
                        );
                      })}
                    </div>
                  </div>
                )) : (
                  <div>No goals structure found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoItem = ({ label, value }: { label: string, value: any }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <span style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "700" }}>{label}</span>
    <span style={{ fontSize: "18px", color: "#333", fontWeight: "800" }}>{typeof value === 'number' ? value.toLocaleString() : value}</span>
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h2 style={{
    fontSize: "2.2rem",
    color: "#444",
    marginBottom: "30px",
    textAlign: "center",
    position: "relative",
    display: "inline-block",
    left: "50%",
    transform: "translateX(-50%)"
  }}>
    {title}
    <div style={{
      width: "60px",
      height: "4px",
      background: "#ffcc00",
      borderRadius: "2px",
      margin: "10px auto 0"
    }} />
  </h2>
);

export default RanksComponent;
