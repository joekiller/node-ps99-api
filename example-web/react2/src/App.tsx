import React, { useEffect, useState } from 'react';
import { PetSimulator99API } from 'ps99-api';

import AchievementsComponent from './components/AchievementsComponent';
import BoostsComponent from './components/BoostsComponent';
import BoothsComponent from './components/BoothsComponent';
import BoxesComponent from './components/BoxesComponent';
import BuffsComponent from './components/BuffsComponent';
import CharmsComponent from './components/CharmsComponent';
import CurrencyComponent from './components/CurrencyComponent';
import EggsComponent from './components/EggsComponent';
import EnchantsComponent from './components/EnchantsComponent';
import FishingRodsComponent from './components/FishingRodsComponent';
import FruitsComponent from './components/FruitsComponent';
import GuildBattlesComponent from './components/GuildBattlesComponent';
import HoverboardsComponent from './components/HoverboardsComponent';
import LootboxesComponent from './components/LootboxesComponent';
import MasteryComponent from './components/MasteryComponent';
import MerchantsComponent from './components/MerchantsComponent';
import MiscItemsComponent from './components/MiscItemsComponent';
import PetsComponent from './components/PetsComponent';
import PotionsComponent from './components/PotionsComponent';
import RandomEventsComponent from './components/RandomEventsComponent';
import RanksComponent from './components/RanksComponent';
import RarityComponent from './components/RarityComponent';
import RebirthsComponent from './components/RebirthsComponent';
import SecretRoomsComponent from './components/SecretRoomsComponent';
import SeedsComponent from './components/SeedsComponent';
import ShovelsComponent from './components/ShovelsComponent';
import SprinklersComponent from './components/SprinklersComponent';
import UltimatesComponent from './components/UltimatesComponent';
import UpgradesComponent from './components/UpgradesComponent';
import WateringCansComponent from './components/WateringCansComponent';
import WorldsComponent from './components/WorldsComponent';
import ZoneFlagsComponent from './components/ZoneFlagsComponent';
import ZonesComponent from './components/ZonesComponent';

const App: React.FC = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollections();
      console.log('Fetched collections:', response); // Add this line
      if (response.status === 'ok') {
        setCollections(response.data);
      } else {
        console.error('Failed to fetch collections', response); // Add this line
      }
    };
    fetchCollections();
  }, []);

  const renderComponent = () => {
    switch (selectedCollection) {
      case "Achievements":
        return <AchievementsComponent />;
      case "Boosts":
        return <BoostsComponent />;
      case "Booths":
        return <BoothsComponent />;
      case "Boxes":
        return <BoxesComponent />;
      case "Buffs":
        return <BuffsComponent />;
      case "Charms":
        return <CharmsComponent />;
      case "Currency":
        return <CurrencyComponent />;
      case "Eggs":
        return <EggsComponent />;
      case "Enchants":
        return <EnchantsComponent />;
      case "FishingRods":
        return <FishingRodsComponent />;
      case "Fruits":
        return <FruitsComponent />;
      case "GuildBattles":
        return <GuildBattlesComponent />;
      case "Hoverboards":
        return <HoverboardsComponent />;
      case "Lootboxes":
        return <LootboxesComponent />;
      case "Mastery":
        return <MasteryComponent />;
      case "Merchants":
        return <MerchantsComponent />;
      case "MiscItems":
        return <MiscItemsComponent />;
      case "Pets":
        return <PetsComponent />;
      case "Potions":
        return <PotionsComponent />;
      case "RandomEvents":
        return <RandomEventsComponent />;
      case "Ranks":
        return <RanksComponent />;
      case "Rarity":
        return <RarityComponent />;
      case "Rebirths":
        return <RebirthsComponent />;
      case "SecretRooms":
        return <SecretRoomsComponent />;
      case "Seeds":
        return <SeedsComponent />;
      case "Shovels":
        return <ShovelsComponent />;
      case "Sprinklers":
        return <SprinklersComponent />;
      case "Ultimates":
        return <UltimatesComponent />;
      case "Upgrades":
        return <UpgradesComponent />;
      case "WateringCans":
        return <WateringCansComponent />;
      case "Worlds":
        return <WorldsComponent />;
      case "ZoneFlags":
        return <ZoneFlagsComponent />;
      case "Zones":
        return <ZonesComponent />;
      default:
        return <div>Please select a collection</div>;
    }
  };

  return (
    <div>
      <h1>Pet Simulator 99 Collections</h1>
      <nav>
        <ul>
          {collections.map((collection, index) => (
            <li key={index} onClick={() => setSelectedCollection(collection)}>
              {collection}
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {renderComponent()}
      </div>
    </div>
  );
};

export default App;
