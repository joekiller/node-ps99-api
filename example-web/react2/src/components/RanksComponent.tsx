import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";

const RanksComponent: React.FC<{
  configData?: CollectionConfigData<"Ranks">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Ranks">>
      collectionName="Ranks"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Rank: {data.Title}</h2>
          <p>Rank Number: {data.RankNumber}</p>
          <p>Max Enchants Equipped: {data.MaxEnchantsEquipped}</p>
          <p>Maximum Active Goals: {data.MaximumActiveGoals}</p>
          <p>Unlockable Egg Slots: {data.UnlockableEggSlots}</p>
          <p>Unlockable Pet Slots: {data.UnlockablePetSlots}</p>
          {data.RequiredRebirth && (
            <p>Required Rebirth: {data.RequiredRebirth}</p>
          )}
          {data.RequiredZone && <p>Required Zone: {data.RequiredZone}</p>}

          <div>
            <h3>Goals:</h3>
            {data.Goals.map((goalSet, index) => (
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
                      {goal.EnchantTier && (
                        <p>Enchant Tier: {goal.EnchantTier}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3>Rewards:</h3>
            <ul>
              {data.Rewards.map((reward, rewardIndex) => (
                <li key={rewardIndex}>
                  <p>Stars Required: {reward.StarsRequired}</p>
                  <p>Reward Item ID: {reward.Item._data.id}</p>
                  {reward.Item._data._am && (
                    <p>Amount: {reward.Item._data._am}</p>
                  )}
                  {reward.Item._data.tn && <p>TN: {reward.Item._data.tn}</p>}
                </li>
              ))}
            </ul>
          </div>

          {data.RankUpRewards && (
            <div>
              <h3>Rank Up Rewards:</h3>
              <ul>
                {data.RankUpRewards.map((reward, rewardIndex) => (
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
      )}
    />
  );
};

export default RanksComponent;
