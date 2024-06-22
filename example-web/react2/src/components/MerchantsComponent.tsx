import React, { useEffect, useState } from 'react';
import {MerchantData, PetSimulator99API} from 'ps99-api';

const MerchantsComponent: React.FC = () => {
  const [merchants, setMerchants] = useState<MerchantData[]>([]);

  useEffect(() => {
    const fetchMerchants = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Merchants");
      if (response.status === 'ok') {
        setMerchants(response.data);
      }
    };
    fetchMerchants();
  }, []);

  return (
    <div>
      <h2>Merchants</h2>
      <ul>
        {merchants.map((merchant, index) => (
          <li key={index}>
            <span>{merchant.configData.DisplayName}</span>
            <span>Price Multiplier: {merchant.configData.PriceMult}</span>
            <span>Refresh Rate: {merchant.configData.RefreshRate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MerchantsComponent;
