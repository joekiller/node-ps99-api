import React, { useEffect, useState } from 'react';
import { EnchantmentData, PetSimulator99API } from 'ps99-api';
import ImageComponent from "./ImageComponent";

const EnchantsComponent: React.FC = () => {
  const [enchants, setEnchants] = useState<EnchantmentData[]>([]);

  useEffect(() => {
    const fetchEnchants = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Enchants");
      if (response.status === 'ok') {
        setEnchants(response.data);
      }
    };
    fetchEnchants();
  }, []);

  return (
    <div>
      <h2>Enchants</h2>
      <ul>
        {enchants.map((enchant, index) => (
          <li key={index}>
            {enchant.configData.PageIcon && <ImageComponent src={enchant.configData.PageIcon} alt={`Enchant ${index + 1}`} />}
            <span>Base Tier: {enchant.configData.BaseTier}</span>
            <span>Max Tier: {enchant.configData.MaxTier}</span>
            {enchant.configData.Tiers.map((tier, tierIndex) => (
              <div key={tierIndex}>
                <ImageComponent src={tier.Icon} alt={tier.DisplayName} />
                <span>Tier {tierIndex + 1}:</span>
                <span>{tier.DisplayName}</span>
                <span>Power: {tier.Power}</span>
                <span>Rarity: {tier.Rarity.DisplayName}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnchantsComponent;
