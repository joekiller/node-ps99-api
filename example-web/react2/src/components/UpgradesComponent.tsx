import React, { useEffect, useState } from "react";
import { PetSimulator99API, UpgradeData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const UpgradesComponent: React.FC = () => {
  const [upgrades, setUpgrades] = useState<UpgradeData[]>([]);

  useEffect(() => {
    const fetchUpgrades = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Upgrades");
      if (response.status === "ok") {
        setUpgrades(response.data);
      }
    };
    fetchUpgrades();
  }, []);

  return (
    <div>
      <h2>Upgrades</h2>
      <ul>
        {upgrades.map((upgrade, index) => (
          <li key={index}>
            <ImageComponent
              src={upgrade.configData.Icon}
              alt={`Upgrade ${index + 1}`}
            />
            <span>Reward: {upgrade.configData.RewardText}</span>
            <div>Tier Costs: {upgrade.configData.TierCosts.join(", ")}</div>
            {upgrade.configData.TierCurrencies.map(
              (currency, currencyIndex) => (
                <div key={currencyIndex}>
                  <span>Tier Currency {currencyIndex + 1}:</span>
                  <span>{currency.DisplayName}</span>
                  <span>Max Amount: {currency.MaxAmount}</span>
                  <span>Tradable: {currency.Tradable ? "Yes" : "No"}</span>
                </div>
              ),
            )}
            <div>Tier Powers: {upgrade.configData.TierPowers.join(", ")}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpgradesComponent;
