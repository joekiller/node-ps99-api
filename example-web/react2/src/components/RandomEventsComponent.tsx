import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";

const RandomEventsComponent: React.FC<{
  configData: CollectionConfigData<"RandomEvents">;
}> = ({ configData }) => {
  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{ maxWidth: '300px', margin: '0 auto 15px auto' }}>
        <ItemCard
          id={configData.Name}
          amount={1}
          label={configData.Name}
          itemData={{
            icon: configData.Icon,
            rarity: undefined,
            name: configData.Name
          }}
          rarityColor={configData.Color}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px', textAlign: 'left' }}>
        <p><strong>Color:</strong> <span style={{ color: configData.Color }}>{configData.Color}</span></p>
        <p><strong>Duration:</strong> {configData.Duration}s</p>
        <p><strong>Chance:</strong> {configData.Chance}</p>
        {configData.BreakingRequirement && <p><strong>Break Req:</strong> {configData.BreakingRequirement}</p>}
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '10px' }}>Area Whitelist</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
          {Object.entries(configData.AreaWhitelist).map(
            ([area, allowed], index) => (
              allowed && (
                <span key={index} className="badge">
                  {area.replace(/_/g, " ")}
                </span>
              )
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomEventsComponent;
