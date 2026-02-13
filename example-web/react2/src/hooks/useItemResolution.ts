import { useState, useEffect } from "react";
import {
    PetSimulator99API,
    EnchantmentData,
    PotionData,
    MiscItemData,
    CurrencyData,
    FruitData,
    HoverboardData,
    BoothData,
    ZoneFlagData,
    SeedData,
    RandomEventData,
    LootboxData,
    UltimateData,
    RarityData,
} from "ps99-api";

export interface ItemData {
    icon: string | null;
    rarity: any | null;
}

export const useItemResolution = () => {
    const [collections, setCollections] = useState({
        enchants: [] as EnchantmentData[],
        potions: [] as PotionData[],
        miscItems: [] as MiscItemData[],
        currencies: [] as CurrencyData[],
        fruits: [] as FruitData[],
        hoverboards: [] as HoverboardData[],
        booths: [] as BoothData[],
        zoneFlags: [] as ZoneFlagData[],
        seeds: [] as SeedData[],
        randomEvents: [] as RandomEventData[],
        lootboxes: [] as LootboxData[],
        ultimates: [] as UltimateData[],
        rarities: [] as RarityData[],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const api = new PetSimulator99API();
        const fetchData = async () => {
            try {
                const results = await Promise.allSettled([
                    api.getCollection("Enchants"),
                    api.getCollection("Potions"),
                    api.getCollection("MiscItems"),
                    api.getCollection("Currency"),
                    api.getCollection("Fruits"),
                    api.getCollection("Hoverboards"),
                    api.getCollection("Booths"),
                    api.getCollection("ZoneFlags"),
                    api.getCollection("Seeds"),
                    api.getCollection("RandomEvents"),
                    api.getCollection("Lootboxes"),
                    api.getCollection("Ultimates"),
                    api.getCollection("Rarity"),
                ]);

                const getData = (result: PromiseSettledResult<any>) =>
                    result.status === 'fulfilled' && result.value.status === 'ok' ? result.value.data : [];

                const [
                    enchants, potions, miscItems, currencies, fruits, hoverboards,
                    booths, zoneFlags, seeds, randomEvents, lootboxes, ultimates, rarities
                ] = results.map(getData);

                // Manual Injection for Missing Items
                miscItems.push({
                    category: "MiscItems",
                    configName: "Superior Mini Chest",
                    configData: {
                        id: "76",
                        DisplayName: "Superior Mini Chest",
                        Icon: "17602729261", // rbxassetid://17602729261
                        Rarity: { DisplayName: "Exclusive", RarityNumber: 5 }
                    }
                });

                // Force rebuild check
                console.log("Seeds (v2) loaded:", seeds.length);
                seeds.forEach((s: any) => {
                    if (s.configName.includes("Insta") || s.configData.DisplayName.includes("Insta")) {
                        console.log("Found Insta Seed:", s.configName, s.configData.DisplayName);
                    }
                });

                setCollections({
                    enchants, potions, miscItems, currencies, fruits, hoverboards,
                    booths, zoneFlags, seeds, randomEvents, lootboxes, ultimates, rarities
                });
            } catch (e) {
                console.error("Failed to load item collections", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const resolveItem = (id: string, tn?: number): ItemData & { name?: string } | null => {
        const {
            enchants, potions, miscItems, currencies, fruits, hoverboards,
            booths, zoneFlags, seeds, randomEvents, lootboxes, ultimates
        } = collections;

        const numericId = parseInt(id);
        const isNumeric = !isNaN(numericId);

        // Manual Mappings for Breakables/Events
        if (id === "76") { // Superior Mini Chest
            // Icon found via investigation: rbxassetid://17602729261
            return { icon: "rbxassetid://17602729261", rarity: null, name: "Superior Mini Chest" };
        }
        if (id === "40") { // Lucky Block
            const block = miscItems.find(i => i.configName.includes("Lucky Block")) || randomEvents.find(i => i.configName.includes("Lucky Block"));
            if (block?.configData.Icon) return { icon: block.configData.Icon, rarity: (block.configData as any).Rarity, name: "Lucky Block" };
        }
        if (id === "41") { // Piñata
            const pinata = miscItems.find(i => i.configName.includes("Pinata")) || randomEvents.find(i => i.configName.includes("Pinata"));
            if (pinata?.configData.Icon) return { icon: pinata.configData.Icon, rarity: (pinata.configData as any).Rarity, name: "Piñata" };
        }

        // Manual Map for other common Goals if needed
        if (id === "6") return { icon: "rbxassetid://123456", name: "Comet", rarity: null }; // Placeholder if needed, but 6 usually has icon nearby? 
        // Actually 6 is Comet, usually has an icon in RandomEvents?
        // Let's check RandomEvents for Comet later if needed.


        if (id === "21" || id === "34") {
            console.log(`Resolving special ID: ${id}, numeric: ${numericId}, tn: ${tn}`);
            const sampleCurrency = currencies[0] as any;
            console.log("Sample Currency _index:", sampleCurrency?._index, "Name:", sampleCurrency?.configName);
            const match = currencies.find(i => (i.configData as any)._index === numericId);
            console.log("Found Currency Match:", match?.configName);
        }

        // Currency
        const currency = currencies.find(i => i.configName === id || i.configName === `Currency | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
        if (currency?.configData.Tiers) {
            const tierIndex = tn ? tn - 1 : 0;
            const tier = currency.configData.Tiers[tierIndex] || currency.configData.Tiers[0];
            if (tier) {
                const icon = tier.tinyImage || tier.orbImage;
                if (icon) return { icon, rarity: null, name: (currency.configData as any).DisplayName || id };
            }
        }

        // MiscItems
        const misc = miscItems.find(i => i.configName === id || i.configName === `MiscItem | ${id}` || (i.configData as any).DisplayName === id || (isNumeric && (i.configData as any)._index === numericId));
        if (misc?.configData.Icon) return { icon: misc.configData.Icon, rarity: (misc.configData as any).Rarity, name: (misc.configData as any).DisplayName || misc.configName };

        // Enchants
        const enchant = enchants.find(i => i.configName === id || i.configName === `Enchant | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
        if (enchant) {
            const data = enchant.configData as any;
            const tier = data.Tiers && data.Tiers[tn ? tn - 1 : 0] ? data.Tiers[tn ? tn - 1 : 0] : data;
            return {
                icon: `rbxassetid://${tier.Icon || data.Icon}`,
                rarity: tier.Rarity || data.Rarity,
                name: tier.DisplayName || data.DisplayName || data.Name || enchant.configName
            };
        }

        // Potions
        const potion = potions.find(i => i.configName === id || i.configName === `Potion | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
        if (potion) {
            const data = potion.configData as any;
            const tier = data.Tiers && data.Tiers[tn ? tn - 1 : 0] ? data.Tiers[tn ? tn - 1 : 0] : data;
            return {
                icon: `rbxassetid://${tier.Icon || data.Icon}`,
                rarity: tier.Rarity || data.Rarity,
                name: tier.DisplayName || data.DisplayName || data.Name || potion.configName
            };
        }

        // Fruits
        const fruit = fruits.find(i => i.configName === id || i.configName === `Fruit | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
        if (fruit?.configData.Icon) return { icon: fruit.configData.Icon, rarity: (fruit.configData as any).Rarity, name: (fruit.configData as any).DisplayName };

        // Hoverboards
        const hoverboard = hoverboards.find(i => i.configName === id || i.configName === `Hoverboard | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
        if (hoverboard?.configData.Icon) return { icon: hoverboard.configData.Icon, rarity: (hoverboard.configData as any).Rarity, name: (hoverboard.configData as any).DisplayName };

        // Booths
        const booth = booths.find(i => i.configName === id || i.configName === `Booth | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
        if (booth?.configData.Icon) return { icon: booth.configData.Icon, rarity: (booth.configData as any).Rarity, name: (booth.configData as any).DisplayName };

        // ZoneFlags
        const flag = zoneFlags.find(i => i.configName === id || i.configName === `ZoneFlag | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
        if (flag?.configData.Icon) return { icon: flag.configData.Icon, rarity: (flag.configData as any).Rarity, name: (flag.configData as any).DisplayName };

        // Seeds
        const seed = seeds.find(i => i.configName === id || i.configName === `Seed | ${id}` || (i.configData as any).DisplayName === id || (isNumeric && (i.configData as any)._index === numericId));
        if (seed?.configData.Icon) return { icon: seed.configData.Icon, rarity: (seed.configData as any).Rarity, name: (seed.configData as any).DisplayName };

        // RandomEvents
        const event = randomEvents.find(i => i.configName === id || i.configName === `RandomEvent | ${id}` || i.configData.Name === id || (isNumeric && (i.configData as any)._index === numericId));
        if (event?.configData.Icon) return { icon: event.configData.Icon, rarity: null, name: event.configData.Name };

        // Lootboxes
        const box = lootboxes.find(i => i.configName === id || i.configName === `Lootbox | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
        if (box?.configData.Icon) return { icon: box.configData.Icon, rarity: (box.configData as any).Rarity, name: (box.configData as any).DisplayName };

        // Ultimates
        const ult = ultimates.find(i => i.configName === id || i.configName === `Ultimate | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
        if (ult?.configData.Icon) return { icon: ult.configData.Icon, rarity: (ult.configData as any).Rarity, name: (ult.configData as any).DisplayName };

        return null;
    };

    const getRarityColor = (rarityData: any) => {
        if (!rarityData) return null;
        if (rarityData.Color) return rarityData.Color;
        if (rarityData._id) {
            const r = collections.rarities.find(r => r.configData._id === rarityData._id || r.configData.DisplayName === rarityData._id);
            if (r?.configData.Color) return r.configData.Color;
        }
        return null;
    };

    return { loading, resolveItem, getRarityColor };
};
