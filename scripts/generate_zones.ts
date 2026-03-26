import { PetSimulator99API } from '../src/ps99-api';
import * as fs from 'fs';

const api = new PetSimulator99API();

async function run() {
    try {
        const response2 = await api.getCollection("Zones");
        if (response2.status === "ok") {
            const zones = response2.data as any[];

            // Map zones
            const parsed = zones.map(z => {
                const match = z.configName.match(/^(\d+)\s*\|\s*(.*)$/);
                if (match) {
                    return { num: parseInt(match[1]), name: match[2], world: z.configData?.WorldNumber };
                }
                return null;
            }).filter(z => z !== null) as { num: number, name: string, world: number }[];

            parsed.sort((a, b) => a.num - b.num);

            let ahkContent = `global ZONE := Map()\nZONE.Default := "?"\n`;
            let currentWorld = 0;

            for (const z of parsed) {
                if (z.world !== currentWorld) {
                    currentWorld = z.world;
                    ahkContent += `\n; World ${currentWorld}\n; ----------------------------------------------------------------------------------------\n`;
                }
                ahkContent += `ZONE[${z.num}] := "${z.name}"\n`;
            }

            fs.writeFileSync("Zones.ahk", ahkContent);
            console.log("Wrote fully updated Zones mappings to Zones.ahk");
            console.log("Last zone is:", parsed[parsed.length - 1]);
        }

    } catch (error) {
        console.error("Error fetching:", error);
    }
}

run();
