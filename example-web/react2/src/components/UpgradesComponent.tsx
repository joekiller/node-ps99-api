import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const UpgradeComponent: React.FC<{
  configData: CollectionConfigData<"Upgrades">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Upgrade</h2>
      {configData.Icon && (
        <ImageComponent src={configData.Icon} alt="Upgrade Icon" />
      )}
      <h3>Tier Powers</h3>
      <ul>
        {configData.TierPowers.map((power, index) => (
          <li key={index}>
            Tier {index + 1}: {power}
          </li>
        ))}
      </ul>
      <h3>Tier Costs</h3>
      <ul>
        {configData.TierCosts.map((cost, index) => (
          <li key={index}>
            Tier {index + 1}: {cost}
          </li>
        ))}
      </ul>
      <h3>Tier Currencies</h3>
      {configData.TierCurrencies.map((currency, index) => (
        <div key={index}>
          <h4>{currency.DisplayName}</h4>
          <p>Rarity Number: {currency.Rarity.RarityNumber}</p>
          <p>Description: {currency.Desc}</p>
          {currency.Tradable && <p>Tradable</p>}
          <p>Max Amount: {currency.MaxAmount}</p>
          <h5>Bag Tiers</h5>
          <ul>
            {currency.BagTiers.map((bagTier, bagIndex) => (
              <li key={bagIndex}>
                <p>Value: {bagTier.value}</p>
                <ImageComponent
                  src={bagTier.image}
                  alt={`Bag Tier ${bagTier.value}`}
                />
              </li>
            ))}
          </ul>
          <h5>Tiers</h5>
          <ul>
            {currency.Tiers.map((tier, tierIndex) => (
              <li key={tierIndex}>
                <p>Tier Name: {tier.tierName}</p>
                <p>Order: {tier.Order}</p>
                <p>Value: {tier.value}</p>
                {tier.isBottom && <p>Is Bottom</p>}
                <ImageComponent src={tier.orbImage} alt="Orb" />
                <ImageComponent src={tier.imageOutline} alt="Outline" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UpgradeComponent;
