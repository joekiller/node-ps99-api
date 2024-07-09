import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const PotionsComponent: React.FC<{
  configData: CollectionConfigData<"Potions">;
}> = ({ configData }) => {
  return (
    <div style={{ padding: "1em", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5em" }}>
        Potion: {configData.Tiers[0].DisplayName}
      </h2>
      <div style={{ display: 'flex', gap: '1em' }}>
        <div style={{ minWidth: '250px' }}>
          <ImageComponent
            src={configData.Tiers[0].Icon}
            alt={configData.Tiers[0].DisplayName}
          />
        </div>
        <div>
          <p><strong>Description:</strong> {configData.Tiers[0].Desc}</p>
          <p><strong>Primary Color:</strong> {configData.PrimaryColor}</p>
          <p><strong>Secondary Color:</strong> {configData.SecondaryColor}</p>
          <p><strong>Base Tier:</strong> {configData.BaseTier}</p>
          <p><strong>Max Tier:</strong> {configData.MaxTier}</p>
        </div>
      </div>
      <div style={{ marginTop: '1em' }}>
        <h3>Tiers:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
          {configData.Tiers.map((tier, index) => (
            <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1em', flex: '1 1 calc(33% - 1em)', boxSizing: 'border-box' }}>
              <p><strong>Tier {index + 1}:</strong></p>
              <p><strong>Display Name:</strong> {tier.DisplayName}</p>
              <p><strong>Description:</strong> {tier.Desc}</p>
              <div style={{ minWidth: '250px' }}>
                <ImageComponent src={tier.Icon} alt={tier.DisplayName} />
              </div>
              <p><strong>Power:</strong> {tier.Power}</p>
              <p><strong>Time:</strong> {tier.Time}</p>
              <p><strong>Rarity:</strong> {tier.Rarity.DisplayName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PotionsComponent;
