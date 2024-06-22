import React, { useEffect, useState } from 'react';
import { MiscItemData, PetSimulator99API } from 'ps99-api';
import ImageComponent from './ImageComponent';
import ErrorComponent from './ErrorComponent';

const MiscItemsComponent: React.FC = () => {
  const [miscItems, setMiscItems] = useState<MiscItemData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMiscItems = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("MiscItems");
      if (response.status === 'ok') {
        setMiscItems(response.data);
      } else {
        setError(response.error.message);
      }
    };
    fetchMiscItems();
  }, []);

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <div>
      <h2>Miscellaneous Items</h2>
      <ul>
        {miscItems.map((item, index) => (
          <li key={index}>
            <ImageComponent src={item.configData.Icon} alt={item.configData.DisplayName} />
            <span>{item.configData.DisplayName}</span>
            <span>Category: {item.configData.Category}</span>
            <span>Description: {item.configData.Desc}</span>
            <span>Rarity: {item.configData.Rarity.DisplayName}</span>
            {item.configData.Tradable && <span>Tradable</span>}
            {item.configData.AltIcon && <ImageComponent src={item.configData.AltIcon} alt={`${item.configData.DisplayName} Alternate Icon`} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiscItemsComponent;
