import { PetSimulator99API } from './src/ps99-api';

const api = new PetSimulator99API();

async function run() {
    console.log("Fetching Eggs collection...");
    try {
        const response = await api.getCollection("Eggs");
        if (response.status === "ok") {
            const items = response.data;
            console.log(`Got ${items.length} items.`);
            // Log the first 5 items fully to see structure
            items.slice(0, 5).forEach((item, index) => {
                console.log(`\nItem ${index}:`);
                console.log(JSON.stringify(item, null, 2));
            });

            // Allow looking for a specific item if needed
            const egg16 = items.find(i => i.configName.includes("Exclusive Egg 16"));
            if (egg16) {
                console.log("\nExclusive Egg 16:");
                console.log(JSON.stringify(egg16, null, 2));
            }
        } else {
            console.error("Error status:", response);
        }

    } catch (error) {
        console.error("Error fetching:", error);
    }
}

run();
