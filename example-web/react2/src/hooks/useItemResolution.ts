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
        pets: [] as any[], // PetData
        eggs: [] as any[], // EggData
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
                    api.getCollection("Pets"),
                    api.getCollection("Eggs"),
                ]);

                const getData = (result: PromiseSettledResult<any>) =>
                    result.status === 'fulfilled' && result.value.status === 'ok' ? result.value.data : [];

                const [
                    enchants, potions, miscItems, currencies, fruits, hoverboards,
                    booths, zoneFlags, seeds, randomEvents, lootboxes, ultimates, rarities,
                    pets, eggs
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

                // Manual Patch for Superior Chest Mimic Enchant
                const scmEnchant = enchants.find((e: any) => e.configName === "Superior Chest Mimic" || e.configData.DisplayName === "Superior Chest Mimic");
                if (scmEnchant) {
                    if (!scmEnchant.configData.Tiers[0].Icon) {
                        scmEnchant.configData.Tiers[0].Icon = "rbxassetid://17602729261"; // Reusing the chest icon
                    }
                }

                // Force rebuild check
                console.log("Seeds (v2) loaded:", seeds.length);
                seeds.forEach((s: any) => {
                    if (s.configName.includes("Insta") || s.configData.DisplayName.includes("Insta")) {
                        console.log("Found Insta Seed:", s.configName, s.configData.DisplayName);
                    }
                });

                setCollections({
                    enchants, potions, miscItems, currencies, fruits, hoverboards,
                    booths, zoneFlags, seeds, randomEvents, lootboxes, ultimates, rarities,
                    pets, eggs
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
        try {
            const {
                enchants, potions, miscItems, currencies, fruits, hoverboards,
                booths, zoneFlags, seeds, randomEvents, lootboxes, ultimates,
                pets, eggs
            } = collections;

            const numericId = parseInt(id);
            const isNumeric = !isNaN(numericId);

            // Manual Mappings for Breakables/Events
            if (id === "76") { // Superior Mini Chest
                // Icon found via investigation: rbxassetid://17602729261
                return { icon: "rbxassetid://17602729261", rarity: null, name: "Superior Mini Chest" };
            }
            if (id === "78" || id === "Hot Cocoa Egg") { // Hot Cocoa Egg
                // Local Asset
                return { icon: "/node-ps99-api/assets/hot_cocoa_egg.png", rarity: null, name: "Hot Cocoa Egg" };
            }
            if (id === "40") { // Lucky Block
                const block = miscItems.find(i => i.configName.includes("Lucky Block")) || randomEvents.find(i => i.configName.includes("Lucky Block"));
                const icon = (block?.configData as any).icon || block?.configData.Icon;
                if (icon) return { icon: icon, rarity: (block?.configData as any).rarity || (block?.configData as any).Rarity, name: "Lucky Block" };
            }
            if (id === "41") { // Piñata
                const pinata = miscItems.find(i => i.configName.includes("Pinata")) || randomEvents.find(i => i.configName.includes("Pinata"));
                const icon = (pinata?.configData as any).icon || pinata?.configData.Icon;
                if (icon) return { icon: icon, rarity: (pinata?.configData as any).rarity || (pinata?.configData as any).Rarity, name: "Piñata" };
            }

            if (id === "Clan Gift") {
                const box = lootboxes.find(i => i.configName === "Clan Gift");
                if (box?.configData.Icon) return { icon: box.configData.Icon, rarity: (box.configData as any).Rarity, name: "Clan Gift" };
            }

            // Pets
            // Check exact match, or "Huge [name]", or numeric ID
            const pet = pets.find(i => i.configName === id || i.configData.name === id || (isNumeric && (i.configData as any)._index === numericId));
            if (pet) {
                const data = pet.configData as any;
                let icon = data.thumbnail;
                if (tn === 1 && data.goldenThumbnail) icon = data.goldenThumbnail;
                // if (tn === 2) ... Rainbow usually just uses regular or golden with shader, but for icon usage we might just use thumbnail

                // If we have specific golden/rainbow thumbnails in data, use them.
                // The PetsComponent used data.goldenThumbnail for pt=1.

                return {
                    icon: icon.startsWith("rbxassetid://") ? icon : `rbxassetid://${icon}`,
                    rarity: data.rarity || { DisplayName: "Basic", RarityNumber: 1 }, // Default if missing
                    name: data.name
                };
            }

            // Eggs
            const egg = eggs.find(i => i.configName === id || (i.configData as any).DisplayName === id || (isNumeric && (i.configData as any)._index === numericId));
            if (egg) {
                const data = egg.configData as any;
                const icon = data.icon || data.Icon;
                return {
                    icon: icon?.startsWith("rbxassetid://") ? icon : `rbxassetid://${icon}`,
                    rarity: data.rarity || data.Rarity,
                    name: data.DisplayName || data.name || egg.configName
                };
            }


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
            if (misc) {
                const data = misc.configData as any;
                const icon = data.icon || data.Icon;
                if (icon) return { icon, rarity: data.rarity || data.Rarity, name: data.DisplayName || data.name || misc.configName };
            }

            // Enchants
            const enchant = enchants.find(i => i.configName === id || i.configName === `Enchant | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
            if (enchant) {
                const data = enchant.configData as any;
                const tier = data.Tiers && data.Tiers[tn ? tn - 1 : 0] ? data.Tiers[tn ? tn - 1 : 0] : data;
                const icon = tier.icon || tier.Icon || data.icon || data.Icon;
                return {
                    icon: icon?.startsWith("rbxassetid://") ? icon : `rbxassetid://${icon}`,
                    rarity: tier.rarity || tier.Rarity || data.rarity || data.Rarity,
                    name: tier.DisplayName || data.DisplayName || data.Name || enchant.configName
                };
            }

            // Potions
            const potion = potions.find(i => i.configName === id || i.configName === `Potion | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
            if (potion) {
                const data = potion.configData as any;
                const tier = data.Tiers && data.Tiers[tn ? tn - 1 : 0] ? data.Tiers[tn ? tn - 1 : 0] : data;
                const icon = tier.icon || tier.Icon || data.icon || data.Icon;
                return {
                    icon: icon?.startsWith("rbxassetid://") ? icon : `rbxassetid://${icon}`,
                    rarity: tier.rarity || tier.Rarity || data.rarity || data.Rarity,
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
            if (box) {
                const data = box.configData as any;
                const icon = data.icon || data.Icon;
                if (icon) return { icon, rarity: data.rarity || data.Rarity, name: data.DisplayName || data.name };
            }

            // Ultimates
            const ult = ultimates.find(i => i.configName === id || i.configName === `Ultimate | ${id}` || (isNumeric && (i.configData as any)._index === numericId));
            if (ult?.configData.Icon) return { icon: ult.configData.Icon, rarity: (ult.configData as any).Rarity, name: (ult.configData as any).DisplayName };

            return null;
        } catch (e) {
            console.error("resolveItem crashed:", e);
            return null;
        }
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

    const resolveIcon = (itemData: any): string | null => {
        try {
            if (!itemData) return null;

            if (itemData.name === "Hot Cocoa Egg" || itemData.DisplayName === "Hot Cocoa Egg") {
                return "/node-ps99-api/assets/hot_cocoa_egg.png";
            }

            // Check for nested Tiers/Icons common in Enchants, Potions, Currency, Boxes
            if (itemData.Tiers && Array.isArray(itemData.Tiers) && itemData.Tiers.length > 0) {
                const firstTier = itemData.Tiers[0];
                if (firstTier.Icon) return firstTier.Icon;
                if (firstTier.icon) return firstTier.icon;
                if (firstTier.orbImage) return firstTier.orbImage;
                if (firstTier.tinyImage) return firstTier.tinyImage;
                if (firstTier.imageOutline) return firstTier.imageOutline;
            }

            if (itemData.Icons && Array.isArray(itemData.Icons) && itemData.Icons.length > 0) {
                const firstIcon = itemData.Icons[0];
                if (firstIcon.Icon) return firstIcon.Icon;
                if (firstIcon.icon) return firstIcon.icon;
            }

            // Handle Buffs (AssociatedItemID)
            if (itemData.AssociatedItemID) {
                const associatedId = itemData.AssociatedItemID;
                // Check MiscItems first (most common for buffs like Toy Ball, Squeaky Toy)
                const misc = collections.miscItems.find(i => i.configName === associatedId);
                if (misc) {
                    const miscIcon = resolveIcon(misc.configData); // Recursive resolve
                    if (miscIcon) return miscIcon;
                }
                // Could check other collections if needed
            }

            return (
                itemData.icon ||
                itemData.Icon ||
                itemData.thumbnail ||
                itemData.image ||
                itemData.texture ||
                itemData.orbImage ||
                itemData.titanicIcon ||
                itemData.petIcon ||
                itemData.eggIcon ||
                itemData.enchantIcon ||
                itemData.potionIcon ||
                itemData.fruitIcon ||
                itemData.toyIcon ||
                itemData.charmIcon ||
                itemData.boothIcon ||
                itemData.flagIcon ||
                itemData.keyIcon ||
                itemData.seedIcon ||
                itemData.bookIcon ||
                itemData.giftIcon ||
                itemData.currencyIcon ||
                itemData.miscIcon ||
                null
            );
        } catch (e) {
            console.error("resolveIcon crashed:", e);
            return null;
        }
    };

    return { loading, resolveItem, getRarityColor, resolveIcon };
};
