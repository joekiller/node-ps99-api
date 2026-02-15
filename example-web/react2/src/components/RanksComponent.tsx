import React from "react";
import { CollectionConfigData } from "ps99-api";

import { useItemResolution } from "../hooks/useItemResolution";
import ItemCard from "./ItemCard";
import { useExpandableList } from "../hooks/useExpandableList";

const RanksComponent: React.FC<{
  configData: CollectionConfigData<"Ranks">;
}> = ({ configData }) => {
  const { loading, resolveItem, getRarityColor } = useItemResolution();
  const goalsLength = React.useMemo(() => Array.isArray(configData.Goals) ? configData.Goals.length : 0, [configData.Goals]);
  const { expandedIndices, toggle, expandAll, collapseAll, isExpanded } = useExpandableList(goalsLength);

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
      <div style={{ width: "100%" }}>

        {/* Info Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "60px",
          background: "#ffffff",
          padding: "24px",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}>
          <InfoItem label="Max Enchants" value={configData.MaxEnchantsEquipped} />
          <InfoItem label="Max Goals" value={configData.MaximumActiveGoals} />
          <InfoItem label="Egg Slots" value={configData.UnlockableEggSlots} />
          <InfoItem label="Pet Slots" value={configData.UnlockablePetSlots} />
          {configData.RequiredRebirth && <InfoItem label="Rebirth Req" value={configData.RequiredRebirth} />}
          {configData.RequiredZone && <InfoItem label="Zone Req" value={configData.RequiredZone} />}
        </div>

        {/* Rewards Section */}
        {configData.Rewards && configData.Rewards.length > 0 && (
          <div style={{ marginBottom: "60px" }}>
            <SectionTitle title="Rewards" />
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "24px"
            }}>
              {configData.Rewards.map((reward: any, i: number) => {
                // Handle inconsistent reward structure if necessary
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
            <SectionTitle title="Goals" />

            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={expandAll} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>Expand All</button>
              <button onClick={collapseAll} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>Collapse All</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {Array.isArray(configData.Goals) ? configData.Goals.map((goalSet: any[], setIndex: number) => (
                <div key={setIndex} style={{
                  background: "#fff",
                  borderRadius: "24px",
                  padding: "30px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
                }}>
                  <div
                    onClick={() => toggle(setIndex)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      marginBottom: isExpanded(setIndex) ? "24px" : "0"
                    }}
                  >
                    <div style={{
                      background: "#ffcc00",
                      width: "8px",
                      height: "32px",
                      borderRadius: "4px"
                    }} />
                    <h3 style={{
                      fontSize: "1.5rem",
                      color: "#444",
                      fontWeight: "700",
                      margin: 0
                    }}>
                      {isExpanded(setIndex) ? '▼' : '▶'} Goal Set {setIndex + 1}
                    </h3>
                  </div>

                  {isExpanded(setIndex) && (
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                      gap: "20px"
                    }}>
                      {goalSet.map((goal: any, index: number) => {
                        // Determine ID and Label
                        // Goals usually have Type (numeric) which we need to resolve
                        // Sometimes they might have CurrencyID
                        const id = String(goal.CurrencyID || goal.Type);
                        const tn = goal.EnchantTier || goal.PotionTier || goal.Tier;
                        const itemData = resolveItem(id, tn);
                        // Label can be tricky, resolveItem will give us data, but for fallback prompt we use ID
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
                  )}
                </div>
              )) : (
                <div>No goals structure found</div>
              )}
            </div>
          </div>
        )}
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
