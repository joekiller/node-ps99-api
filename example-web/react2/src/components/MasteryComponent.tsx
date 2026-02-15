import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import { useExpandableList } from "../hooks/useExpandableList";

const MasteryComponent: React.FC<{
  configData: CollectionConfigData<"Mastery">;
}> = ({ configData }) => {
  const perksEntries = React.useMemo(() => configData.Perks ? Object.entries(configData.Perks) : [], [configData.Perks]);
  const { expandedIndices, toggle, expandAll, collapseAll, isExpanded } = useExpandableList(perksEntries.length);

  const renderPerks = () => {
    return perksEntries.map(
      ([perkType, perkDetails]: [string, any], index: number) => (
        <div key={perkType} style={{ marginBottom: '15px', textAlign: 'left', background: '#f9f9f9', padding: '10px', borderRadius: '8px' }}>
          <h4
            onClick={() => toggle(index)}
            style={{ margin: '0 0 10px 0', color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {isExpanded(index) ? '▼' : '▶'} {perkType}
          </h4>
          {isExpanded(index) && (
            <div>
              {perkDetails.map((detail: any, idx: number) => (
                <div key={idx} style={{ marginBottom: '8px', paddingLeft: '10px', borderLeft: '2px solid #ddd' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Lvl {detail.Level}: {detail.Title}</div>
                  <div style={{ fontSize: '0.9em', color: '#666' }}>{detail.Text}</div>
                  {detail.Power && <div style={{ fontSize: '0.8em', color: '#1976d2' }}>Power: {detail.Power}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 1fr) 2fr',
        gap: '40px',
        height: '100%',
        alignItems: 'start'
      }}>

        {/* Left Column: Icon */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          background: '#f9f9f9',
          padding: '30px',
          borderRadius: '24px',
          border: '2px solid #eee'
        }}>
          <div style={{ width: '100%', maxWidth: '300px' }}>
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
          <p style={{ fontStyle: 'italic', textAlign: 'center', color: '#666' }}>{configData.Desc}</p>
        </div>

        {/* Right Column: Perks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {configData.ToggleablePerks && (
            <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.1em', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Toggleable Perks</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Object.entries(configData.ToggleablePerks).map(([perk, value]) => (
                  <span key={perk} className="badge" style={{ background: value ? '#e8f5e9' : '#ffebee', color: value ? '#2e7d32' : '#c62828', padding: '8px 12px', fontSize: '0.9rem' }}>
                    {perk}: {value ? "Enabled" : "Disabled"}
                  </span>
                ))}
              </div>
            </div>
          )}

          {configData.Perks && (
            <div style={{ background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '1.4em', margin: 0 }}>Mastery Perks</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={expandAll} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}>Expand All</button>
                  <button onClick={collapseAll} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}>Collapse All</button>
                </div>
              </div>
              {renderPerks()}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default MasteryComponent;
