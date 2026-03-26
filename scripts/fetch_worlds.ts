import { PetSimulator99API } from '../src/ps99-api';

const api = new PetSimulator99API();

async function run() {
    try {
        const response1 = await api.getCollection("Worlds");
        if (response1.status === "ok") {
            console.log("Worlds count:", response1.data.length);
            console.log("Worlds:", response1.data.map((w: any) => ({ name: w.configName, num: w.WorldNumber })));
        }

        const response2 = await api.getCollection("Zones");
        if (response2.status === "ok") {
            const zones = response2.data as any[];
            console.log("Zones count:", zones.length);

            // Sort by something if we can, or just find highest
            let maxZone = 0;
            zones.forEach(z => {
                if (z.ZoneNumber > maxZone) maxZone = z.ZoneNumber;
            });
            console.log("Highest ZoneNumber:", maxZone);

            console.log("Sample of a Zone:", JSON.stringify(zones[0], null, 2));
        }

    } catch (error) {
        console.error("Error fetching:", error);
    }
}

run();
