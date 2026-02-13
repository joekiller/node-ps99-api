import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";
import { useItemResolution } from "../hooks/useItemResolution";

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

  const renderItemCard = (id: string, amount: string | number, label: string, tn?: number, weight?: number, typeId?: number) => {
    const itemData = resolveItem(id, tn);
    const rarityColor = itemData?.rarity ? getRarityColor(itemData.rarity) : '#e0e0e0';

    // Use resolved name if available, otherwise fallback to provided label
    const displayLabel = itemData?.name || label;

    return (
      <div
        key={`${id}-${tn}-${typeId}-${Math.random()}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          border: `2px solid ${rarityColor}`,
          borderRadius: "16px",
          padding: "16px",
          backgroundColor: "#ffffff",
          boxShadow: `0 4px 15px ${rarityColor}40`, // 40 = 25% opacity
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          cursor: "pointer",
          width: "100%",
          minHeight: "220px",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = `0 8px 25px ${rarityColor}60`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = `0 4px 15px ${rarityColor}40`;
        }}
      >
        {/* Rarity Glow Background */}
        <div style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "150%",
          height: "150px",
          background: `radial-gradient(circle, ${rarityColor}33 0%, transparent 70%)`,
          zIndex: 0,
          pointerEvents: "none"
        }} />

        <div style={{
          position: "relative",
          width: "80px",
          height: "80px",
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1
        }}>
          {itemData && itemData.icon ? (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ImageComponent src={itemData.icon} alt={displayLabel} />
            </div>
          ) : (
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "#999",
              border: "2px dashed #ccc"
            }}>No Img</div>
          )}
        </div>

        <div style={{ textAlign: "center", zIndex: 1, width: '100%' }}>
          <div style={{
            fontWeight: "800",
            fontSize: "20px",
            color: "#333",
            marginBottom: "4px"
          }}>
            {typeof amount === 'number' ? `x${amount}` : amount}
          </div>

          <div style={{
            fontWeight: "700",
            fontSize: "14px",
            color: rarityColor,
            marginBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            lineHeight: "1.2"
          }}>
            {displayLabel}
            {tn && !displayLabel.includes(String(tn)) ? ` (Tier ${tn})` : ""}
          </div>

          {(weight !== undefined || typeId !== undefined) && (
            <div style={{
              fontSize: "11px",
              color: "#888",
              marginTop: "8px",
              borderTop: "1px solid #eee",
              paddingTop: "8px",
              display: "flex",
              justifyContent: "center",
              gap: "8px"
            }}>
              {weight !== undefined && <span>W: {weight}</span>}
              {typeId !== undefined && <span>ID: {typeId}</span>}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "40px", fontFamily: "'Nunito', 'Segoe UI', sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ color: "#333", textAlign: "center", marginBottom: "10px", fontSize: "3rem", fontWeight: "800" }}>{configData.Title}</h1>
      <p style={{ textAlign: "center", color: "#666", fontSize: "1.2rem", marginBottom: "40px" }}>Rank {configData.RankNumber}</p>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

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
                return renderItemCard(id, amount, id, tn);
              })}
            </div>
          </div>
        )}

        {/* Goals Section */}
        {configData.Goals && (
          <div>
            <SectionTitle title="Goals" />
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {Array.isArray(configData.Goals) ? configData.Goals.map((goalSet: any[], setIndex: number) => (
                <div key={setIndex} style={{
                  background: "#fff",
                  borderRadius: "24px",
                  padding: "30px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "24px",
                    gap: "12px"
                  }}>
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
                    }}>Goal Set {setIndex + 1}</h3>
                  </div>

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
                      // Label can be tricky, resolveItem will give us data, but for fallback prompt we use ID
                      return renderItemCard(
                        id,
                        goal.Amount,
                        id,
                        tn,
                        goal.Weight,
                        goal.Type
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
  );
};

// Helper Components
const InfoItem = ({ label, value }: { label: string, value: any }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <span style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "700" }}>{label}</span>
    <span style={{ fontSize: "18px", color: "#333", fontWeight: "800" }}>{value}</span>
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
