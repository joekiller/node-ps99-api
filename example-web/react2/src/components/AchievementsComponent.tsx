import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";
import { useExpandableList } from "../hooks/useExpandableList";

const AchievementsComponent: React.FC<{
  configData: CollectionConfigData<"Achievements">;
}> = ({ configData }) => {
  const { resolveItem, getRarityColor, loading } = useItemResolution();
  const { expandedIndices, toggle, expandAll, collapseAll, isExpanded } = useExpandableList(configData.Tiers.length);

  if (loading) return <div>Loading data...</div>;

  return (
    <div style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={expandAll} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>Expand All</button>
        <button onClick={collapseAll} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>Collapse All</button>
      </div>
      <div style={{ maxWidth: "150px", margin: "0 auto 20px" }}>
        <ImageComponent src={configData.Icon} alt={configData.Name} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {configData.Tiers.map((tier, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #eee",
              padding: "15px",
              borderRadius: "12px",
              textAlign: 'left'
            }}
          >
            <div
              onClick={() => toggle(index)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', paddingBottom: isExpanded(index) ? '10px' : '0' }}
            >
              <h3 style={{ margin: 0, fontSize: '1.2em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isExpanded(index) ? '▼' : '▶'} {tier.Title}
              </h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <span className="badge">Difficulty: {tier.Difficulty.Name}</span>
                <span className="badge">Amount: {tier.Amount.toLocaleString()} {(tier.Desc.match(/{amount}\s*([a-zA-Z]+)/)?.[1] || '')}</span>
              </div>
            </div>

            {isExpanded(index) && (
              <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>

                <p style={{ marginBottom: '15px', color: '#555' }}>{tier.Desc.replace("{amount}", tier.Amount.toLocaleString())}</p>

                <h4 style={{ fontSize: '1em', marginBottom: '10px' }}>Rewards</h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
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
        ))}
      </div>
    </div>
  );
};

export default AchievementsComponent;
