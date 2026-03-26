import { PetSimulator99API } from '../src/ps99-api';

const api = new PetSimulator99API();

async function run() {
    try {
        const eggs = await api.getCollection("Eggs");
        if (eggs.status === "ok") {
            console.log("Eggs count:", eggs.data.length);
            const zones = await api.getCollection("Zones");
            if (zones.status === "ok") {
                const z209 = zones.data.find((z: any) => z.ZoneNumber === 209);
                const z219 = zones.data.find((z: any) => z.ZoneNumber === 219);
                console.log("Zone 209:", z209 ? JSON.stringify(z209, null, 2) : "Not found");
                console.log("Zone 219:", z219 ? JSON.stringify(z219, null, 2) : "Not found");
            }
        }
    } catch (error) {
        console.error(error);
    }
}
run();
