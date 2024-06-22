import React, { useEffect, useState } from 'react';
import {CurrencyData, PetSimulator99API} from 'ps99-api';
import ImageComponent from "./ImageComponent";

const CurrencyComponent: React.FC = () => {
  const [currencies, setCurrencies] = useState<CurrencyData[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Currency");
      if (response.status === 'ok') {
        setCurrencies(response.data);
      }
    };
    fetchCurrencies();
  }, []);

  return (
    <div>
      <h2>Currency</h2>
      <ul>
        {currencies.map((currency, index) => (
          <li key={index}>
            <ImageComponent src={currency.configData.BagTiers[index].image} alt={currency.configData.DisplayName} />
            <span>{currency.configData.DisplayName}</span>
            <span>{currency.configData.Desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyComponent;
