import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";

const MasteryComponent: React.FC<{
  configData: CollectionConfigData<"Mastery">;
}> = ({ configData }) => {
  const groupedPerks = React.useMemo(() => {
    if (!configData.Perks) return [];
    const groups = new Map<number, any[]>();

    Object.entries(configData.Perks).forEach(([type, levels]) => {
      if (Array.isArray(levels)) {
        levels.forEach((levelDetail: any) => {
          const level = levelDetail.Level;
          if (!groups.has(level)) {
            groups.set(level, []);
          }
          groups.get(level)?.push({ ...levelDetail, type });
        });
      }
    });

    // Sort levels
    const sortedLevels = Array.from(groups.keys()).sort((a, b) => a - b);
    return sortedLevels.map(level => ({
      level,
      perks: groups.get(level) || []
    }));
  }, [configData.Perks]);

  const renderGroupedPerks = () => {
    return groupedPerks.map((group) => (
      <div key={group.level} style={{
        marginBottom: '20px',
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        border: '1px solid #eee'
      }}>
        {/* Level Header */}
        <div style={{
          background: 'linear-gradient(90deg, #4CAF50 0%, #45a049 100%)',
          padding: '12px 20px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.2em',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.9em' }}>
            Lvl {group.level}
          </span>
          <span>Unlocks</span>
        </div>

        {/* Perks List */}
        <div style={{ padding: '0' }}>
          {group.perks.map((perk: any, index: number) => (
            <div key={index} style={{
              padding: '15px 20px',
              borderBottom: index < group.perks.length - 1 ? '1px solid #f0f0f0' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: '700', color: '#333', fontSize: '1.05em' }}>{perk.Title}</div>
                <div style={{
                  fontSize: '0.75em',
                  color: '#888',
                  background: '#f5f5f5',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>
                  {perk.type}
                </div>
              </div>
              <div style={{ color: '#555', lineHeight: '1.4' }}>{perk.Text}</div>
              {perk.Power && (
                <div style={{
                  color: '#1976d2',
                  fontWeight: '600',
                  fontSize: '0.9em',
                  marginTop: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  ⚡ Power: {perk.Power}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        height: '100%',
        alignItems: 'start'
      }}>

        {/* Left Column: Icon */}
        <div style={{
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
        <div style={{
          flex: '2 1 300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          minWidth: '300px'
        }}>

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
              </div>
              {renderGroupedPerks()}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};



export default MasteryComponent;
