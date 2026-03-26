const { PetSimulator99API } = require('../src/ps99-api.ts');
const fs = require('fs');

const api = new PetSimulator99API();

async function run() {
    try {
        console.log("Fetching Zones, Eggs, and Pets...");
        const [zonesRes, eggsRes, petsRes] = await Promise.all([
            api.getCollection("Zones"),
            api.getCollection("Eggs"),
            api.getCollection("Pets")
        ]);

        if (zonesRes.status !== "ok" || eggsRes.status !== "ok" || petsRes.status !== "ok") {
            console.error("Failed to fetch one or more collections", {
                zones: zonesRes.status,
                eggs: eggsRes.status,
                pets: petsRes.status
            });
            return;
        }

        const zones = zonesRes.data;
        const eggs = eggsRes.data;
        const pets = petsRes.data;

        // Create a map of pets by name for quick lookup
        const petsMap = new Map();
        for (const pet of pets) {
            petsMap.set(pet.configName, pet.configData);
        }

        // Scan World 4 Zones (WorldNumber === 4 or ZoneName matching World 4)
        const world4Zones = zones.filter((z: any) => z.configData.WorldNumber === 4);
        console.log(`Checking ${world4Zones.length} zones in World 4...`);

        let foundRareEggZone = -1;

        for (const zone of world4Zones) {
            const maxEggId = zone.configData.MaximumAvailableEgg;
            if (!maxEggId) continue;

            const egg = eggs.find((e: any) => {
                if (e.configData.EggNumber === maxEggId) return true;
                if (e.configName.startsWith(`${maxEggId} |`)) return true;
                return false;
            });

            if (!egg) continue;

            const drops = egg.configData.pets || [];
            let hasRarePet = false;
            let hasHuge = false;

            for (const drop of drops) {
                const petName = drop[0];
                const petData = petsMap.get(petName);
                if (!petData) continue;

                const isHuge = petData.huge || petName.includes("Huge") || petData.category === "Huge";
                const rarityName = petData.rarity?._id || petData.rarity?.DisplayName;

                if (!isHuge && rarityName === "Rare") {
                    hasRarePet = true;
                }
                if (isHuge) {
                    hasHuge = true;
                }
            }

            if (hasRarePet) {
                console.log(`Found Rare Egg in Zone ${zone.configData.ZoneNumber} (${zone.configData.ZoneName}), Egg ID: ${maxEggId} (${egg.configName})`);
                foundRareEggZone = zone.configData.ZoneNumber;
                // We'll print the first one found, or maybe all of them
            }
        }

        console.log(`Highest Rare Egg Zone discovered: ${foundRareEggZone}`);


    } catch (e) {
        console.error(e);
    }
}
run();
