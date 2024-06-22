import { expect, test } from "@jest/globals";
import { PetSimulator99API } from "../ps99-api";

describe("Pet Simulator Public Live API Test", () => {
  const api = new PetSimulator99API();

  test("Collections Have Not Changed", async () => {
    const results = await api.getCollections();
    expect(results).toMatchSnapshot();
  });

  test("Achievements shape", async () => {
    const results = await api.getCollection("Achievements");
    expect(results).toMatchSnapshot();
  });

  test("Boosts shape", async () => {
    const results = await api.getCollection("Boosts");
    expect(results).toMatchSnapshot();
  });

  test("Booths shape", async () => {
    const results = await api.getCollection("Booths");
    expect(results).toMatchSnapshot();
  });

  test("Boxes shape", async () => {
    const results = await api.getCollection("Boxes");
    expect(results).toMatchSnapshot();
  });

  test("Buffs shape", async () => {
    const results = await api.getCollection("Buffs");
    expect(results).toMatchSnapshot();
  });

  test("Charms shape", async () => {
    const results = await api.getCollection("Charms");
    expect(results).toMatchSnapshot();
  });

  test("Currency shape", async () => {
    const results = await api.getCollection("Currency");
    expect(results).toMatchSnapshot();
  });

  test("Eggs shape", async () => {
    const results = await api.getCollection("Eggs");
    expect(results).toMatchSnapshot();
  });

  test("Enchants shape", async () => {
    const results = await api.getCollection("Enchants");
    expect(results).toMatchSnapshot();
  });

  test("FishingRods shape", async () => {
    const results = await api.getCollection("FishingRods");
    expect(results).toMatchSnapshot();
  });

  test("Fruits shape", async () => {
    const results = await api.getCollection("Fruits");
    expect(results).toMatchSnapshot();
  });

  test("GuildBattles shape", async () => {
    const results = await api.getCollection("GuildBattles");
    expect(results).toMatchSnapshot();
  });

  test("Hoverboards shape", async () => {
    const results = await api.getCollection("Hoverboards");
    expect(results).toMatchSnapshot();
  });

  test("Lootboxes shape", async () => {
    const results = await api.getCollection("Lootboxes");
    expect(results).toMatchSnapshot();
  });

  test("Mastery shape", async () => {
    const results = await api.getCollection("Mastery");
    expect(results).toMatchSnapshot();
  });

  test("MiscItems shape", async () => {
    const results = await api.getCollection("MiscItems");
    expect(results).toMatchSnapshot();
  });

  test("Pets shape", async () => {
    const results = await api.getCollection("Pets");
    expect(results).toMatchSnapshot();
  });

  test("Potions shape", async () => {
    const results = await api.getCollection("Potions");
    expect(results).toMatchSnapshot();
  });

  test("RandomEvents shape", async () => {
    const results = await api.getCollection("RandomEvents");
    expect(results).toMatchSnapshot();
  });

  test("Ranks shape", async () => {
    const results = await api.getCollection("Ranks");
    expect(results).toMatchSnapshot();
  });

  test("Rarity shape", async () => {
    const results = await api.getCollection("Rarity");
    expect(results).toMatchSnapshot();
  });

  test("Rebirths shape", async () => {
    const results = await api.getCollection("Rebirths");
    expect(results).toMatchSnapshot();
  });

  test("SecretRooms shape", async () => {
    const results = await api.getCollection("SecretRooms");
    expect(results).toMatchSnapshot();
  });

  test("Seeds shape", async () => {
    const results = await api.getCollection("Seeds");
    expect(results).toMatchSnapshot();
  });

  test("Shovels shape", async () => {
    const results = await api.getCollection("Shovels");
    expect(results).toMatchSnapshot();
  });

  test("Sprinklers shape", async () => {
    const results = await api.getCollection("Sprinklers");
    expect(results).toMatchSnapshot();
  });

  test("Ultimates shape", async () => {
    const results = await api.getCollection("Ultimates");
    expect(results).toMatchSnapshot();
  });

  test("Upgrades shape", async () => {
    const results = await api.getCollection("Upgrades");
    expect(results).toMatchSnapshot();
  });

  test("WateringCans shape", async () => {
    const results = await api.getCollection("WateringCans");
    expect(results).toMatchSnapshot();
  });

  test("Worlds shape", async () => {
    const results = await api.getCollection("Worlds");
    expect(results).toMatchSnapshot();
  });

  test("ZoneFlags shape", async () => {
    const results = await api.getCollection("ZoneFlags");
    expect(results).toMatchSnapshot();
  });

  test("Zones shape", async () => {
    const results = await api.getCollection("Zones");
    expect(results).toMatchSnapshot();
  });

  test("Merchants shape", async () => {
    const results = await api.getCollection("Merchants");
    expect(results).toMatchSnapshot();
  });
});
