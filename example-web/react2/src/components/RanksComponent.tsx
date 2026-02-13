import React, { useEffect, useState } from "react";
import {
  CollectionConfigData,
  CollectionData,
  PetSimulator99API,
  PetData,
  EnchantmentData,
  PotionData,
  MiscItemData,
  CurrencyData,
} from "ps99-api";
import ImageComponent from "./ImageComponent";

const RanksComponent: React.FC<{
  configData: CollectionConfigData<"Ranks">;
}> = ({ configData }) => {
  const [enchants, setEnchants] = useState<EnchantmentData[]>([]);
  const [potions, setPotions] = useState<PotionData[]>([]);
  const [miscItems, setMiscItems] = useState<MiscItemData[]>([]);
  const [currencies, setCurrencies] = useState<CurrencyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const api = new PetSimulator99API();
      const [
        enchantsResponse,
        potionsResponse,
        miscItemsResponse,
        currencyResponse,
      ] = await Promise.all([
        api.getCollection("Enchants"),
        api.getCollection("Potions"),
        api.getCollection("MiscItems"),
        api.getCollection("Currency"),
      ]);

      if (enchantsResponse.status === "ok") {
        setEnchants(enchantsResponse.data);
      }
      if (potionsResponse.status === "ok") {
        setPotions(potionsResponse.data);
      }
      if (miscItemsResponse.status === "ok") {
        setMiscItems(miscItemsResponse.data);
      }
      if (currencyResponse.status === "ok") {
        setCurrencies(currencyResponse.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const resolveItemImage = (id: string, tn?: number) => {
    // Check Currency
    const currency = currencies.find(
      (item) => item.configName === id || item.configName === `Currency | ${id}`,
    );
    if (currency && currency.configData.Tiers && currency.configData.Tiers.length > 0) {
      return currency.configData.Tiers[0].tinyImage;
    }

    // Check MiscItems
    const miscItem = miscItems.find(
      (item) => item.configData.DisplayName === id,
    );
    if (miscItem && miscItem.configData.Icon) {
      return miscItem.configData.Icon;
    }

    // Check Enchants
    // Enchants usually match by name with "Enchant | " prefix.
    const enchant = enchants.find(
      (item) => item.configName === id || item.configName === `Enchant | ${id}`,
    );
    if (enchant && tn) {
      // tn is 1-based tier, Tiers array is 0-based
      const tier = enchant.configData.Tiers[tn - 1];
      if (tier && tier.Icon) {
        return tier.Icon;
      }
    }

    // Check Potions
    const potion = potions.find(
      (item) => item.configName === id || item.configName === `Potion | ${id}`,
    );
    if (potion && tn) {
      // tn is 1-based tier, Tiers array is 0-based
      const tier = potion.configData.Tiers[tn - 1];
      if (tier && tier.Icon) {
        return tier.Icon;
      }
    }

    return null;
  };

  const getRewardImage = (rewardItem: {
    _data: { id: string; tn?: number };
  }) => {
    return resolveItemImage(rewardItem._data.id, rewardItem._data.tn);
  };

  if (loading) {
    return <div>Loading reference data...</div>;
  }

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
            <ul style={{ listStyle: "none", padding: 0 }}>
              {goalSet.map((goal, goalIndex) => {
                let goalImage = null;
                if (goal.CurrencyID) {
                  goalImage = resolveItemImage(goal.CurrencyID);
                }

                return (
                  <li
                    key={goalIndex}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.5em",
                      border: "1px solid #ddd",
                      padding: "0.5em",
                      borderRadius: "4px",
                    }}
                  >
                    <div style={{ marginRight: "1em" }}>
                      {goalImage ? (
                        <div style={{ width: "50px", height: "50px" }}>
                          <ImageComponent src={goalImage} alt={goal.CurrencyID || "Goal"} />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#eee",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.8em",
                          }}
                        >
                          No Img
                        </div>
                      )}
                    </div>
                    <div>
                      <p style={{ margin: 0 }}>Type: {goal.Type}</p>
                      <p style={{ margin: 0 }}>Amount: {goal.Amount}</p>
                      <p style={{ margin: 0 }}>Weight: {goal.Weight}</p>
                      {goal.CurrencyID && <p style={{ margin: 0 }}>Currency ID: {goal.CurrencyID}</p>}
                      {goal.BreakableType && (
                        <p style={{ margin: 0 }}>Breakable Type: {goal.BreakableType}</p>
                      )}
                      {goal.PotionTier && <p style={{ margin: 0 }}>Potion Tier: {goal.PotionTier}</p>}
                      {goal.EnchantTier && <p style={{ margin: 0 }}>Enchant Tier: {goal.EnchantTier}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div>
        <h3>Rewards:</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {configData.Rewards.map((reward, rewardIndex) => {
            const imageUrl = getRewardImage(reward.Item);
            return (
              <li
                key={rewardIndex}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5em",
                  border: "1px solid #ddd",
                  padding: "0.5em",
                  borderRadius: "4px",
                }}
              >
                <div style={{ marginRight: "1em" }}>
                  {imageUrl ? (
                    <div style={{ width: "50px", height: "50px" }}>
                      <ImageComponent src={imageUrl} alt={reward.Item._data.id} />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.8em",
                      }}
                    >
                      No Img
                    </div>
                  )}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {reward.Item._data.id} {reward.Item._data.tn ? `(Tier ${reward.Item._data.tn})` : ""}
                  </p>
                  <p style={{ margin: 0 }}>Stars Required: {reward.StarsRequired}</p>
                  {reward.Item._data._am && <p style={{ margin: 0 }}>Amount: {reward.Item._data._am}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {configData.RankUpRewards && (
        <div>
          <h3>Rank Up Rewards:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {configData.RankUpRewards.map((reward, rewardIndex) => {
              const imageUrl = getRewardImage({ _data: reward._data }); // Adapter for consistent interface
              return (
                <li key={rewardIndex} style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5em",
                  border: "1px solid #ddd",
                  padding: "0.5em",
                  borderRadius: "4px",
                }}>
                  <div style={{ marginRight: "1em" }}>
                    {imageUrl ? (
                      <div style={{ width: "50px", height: "50px" }}>
                        <ImageComponent src={imageUrl} alt={reward._data.id} />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#eee",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.8em",
                        }}
                      >
                        No Img
                      </div>
                    )}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>Reward Item ID: {reward._data.id}</p>
                    {reward._data._am && <p style={{ margin: 0 }}>Amount: {reward._data._am}</p>}
                    {reward._data.tn && <p style={{ margin: 0 }}>TN: {reward._data.tn}</p>}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RanksComponent;
