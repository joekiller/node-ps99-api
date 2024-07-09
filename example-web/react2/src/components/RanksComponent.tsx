import React from "react";
import { CollectionConfigData } from "ps99-api";

const RanksComponent: React.FC<{
  configData: CollectionConfigData<"Ranks">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Rank: {configData.Title}</h2>
      <p>Rank Number: {configData.RankNumber}</p>
      <p>Max Enchants Equipped: {configData.MaxEnchantsEquipped}</p>
      <p>Maximum Active Goals: {configData.MaximumActiveGoals}</p>
      <p>Unlockable Egg Slots: {configData.UnlockableEggSlots}</p>
      <p>Unlockable Pet Slots: {configData.UnlockablePetSlots}</p>
      {configData.RequiredRebirth && (
        <p>Required Rebirth: {configData.RequiredRebirth}</p>
      )}
      {configData.RequiredZone && (
        <p>Required Zone: {configData.RequiredZone}</p>
      )}

      <div>
        <h3>Goals:</h3>
        {configData.Goals.map((goalSet, index) => (
          <div key={index}>
            <h4>Goal Set {index + 1}</h4>
            <ul>
              {goalSet.map((goal, goalIndex) => (
                <li key={goalIndex}>
                  <p>Type: {goal.Type}</p>
                  <p>Amount: {goal.Amount}</p>
                  <p>Weight: {goal.Weight}</p>
                  {goal.CurrencyID && <p>Currency ID: {goal.CurrencyID}</p>}
                  {goal.BreakableType && (
                    <p>Breakable Type: {goal.BreakableType}</p>
                  )}
                  {goal.PotionTier && <p>Potion Tier: {goal.PotionTier}</p>}
                  {goal.EnchantTier && <p>Enchant Tier: {goal.EnchantTier}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div>
        <h3>Rewards:</h3>
        <ul>
          {configData.Rewards.map((reward, rewardIndex) => (
            <li key={rewardIndex}>
              <p>Stars Required: {reward.StarsRequired}</p>
              <p>Reward Item ID: {reward.Item._data.id}</p>
              {reward.Item._data._am && <p>Amount: {reward.Item._data._am}</p>}
              {reward.Item._data.tn && <p>TN: {reward.Item._data.tn}</p>}
            </li>
          ))}
        </ul>
      </div>

      {configData.RankUpRewards && (
        <div>
          <h3>Rank Up Rewards:</h3>
          <ul>
            {configData.RankUpRewards.map((reward, rewardIndex) => (
              <li key={rewardIndex}>
                <p>Reward Item ID: {reward._data.id}</p>
                {reward._data._am && <p>Amount: {reward._data._am}</p>}
                {reward._data.tn && <p>TN: {reward._data.tn}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RanksComponent;
