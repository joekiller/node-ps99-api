import { expect, test } from "@jest/globals";
import { PetSimulator99API } from "../ps99-api";


/**
 * It's hard to snapshot these because certain values will always be changing but useful for dump-result checks
 */
describe.skip("Pet Simulator Public Live API Test - Changing Items", () => {
  const api = new PetSimulator99API();

  test('Active Clan Battle', async () => {
    const results = await api.getActiveClanBattle();
    expect(results).toMatchSnapshot();
  });

  test('Get Clan', async () => {
    const results = await api.getClan('MMFC');
    expect(results).toMatchSnapshot();
  });

  test('Get Clans', async () => {
    const results = await api.getClans({pageSize: 1});
    expect(results).toMatchSnapshot();
  });

  test('Get Exists', async () => {
    const results = await api.getExists();
    expect(results).toMatchSnapshot();
  });

  test('Get RAP', async () => {
    const results = await api.getRAP();
    expect(results).toMatchSnapshot();
  });

});
