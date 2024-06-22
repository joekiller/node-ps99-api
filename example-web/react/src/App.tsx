import React, { useState } from 'react';
import ClanDetails from './ClanDetails';
import './App.css';

const App: React.FC = () => {
  const [clanName, setClanName] = useState<string>('');
  const [selectedClan, setSelectedClan] = useState<string | null>(null);

  const handleFetchClanInfo = () => {
    setSelectedClan(clanName);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pet Simulator 99 API</h1>
      </header>
      <div className="clan-search">
        <input
          type="text"
          value={clanName}
          onChange={(e) => setClanName(e.target.value)}
          placeholder="Enter clan name"
        />
        <button onClick={handleFetchClanInfo}>Fetch Clan Info</button>
      </div>
      {selectedClan && <ClanDetails clanName={selectedClan} />}
    </div>
  );
};

export default App;
