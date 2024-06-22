import React, { useEffect, useState } from 'react';
import {PetData, PetSimulator99API} from 'ps99-api';
import ImageComponent from "./ImageComponent";

const PetsComponent: React.FC = () => {
  const [pets, setPets] = useState<PetData[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Pets");
      if (response.status === 'ok') {
        setPets(response.data);
      }
    };
    fetchPets();
  }, []);

  return (
    <div>
      <h2>Pets</h2>
      <ul>
        {pets.map((pet, index) => (
          <li key={index}>
            <ImageComponent src={pet.configData.thumbnail} alt={pet.configData.name} />
            <span>{pet.configData.name}</span>
            {pet.configData.goldenThumbnail && <ImageComponent src={pet.configData.goldenThumbnail} alt={`Golden ${pet.configData.name}`} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetsComponent;
