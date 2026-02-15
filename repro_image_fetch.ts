import { PetSimulator99API } from './src/ps99-api';
import axios from 'axios';

const api = new PetSimulator99API();
const eggImageId = "rbxassetid://14146204107"; // Exclusive Egg 16

async function run() {
    console.log(`Fetching image for ${eggImageId}...`);
    try {
        // We know api.getImage calls axios. Let's trace what it returns.
        // But to be even more raw, let's look at what the API *url* actually is and fetch it manually to see headers.

        // Internal logic of getImage:
        const idMatch = eggImageId.match(/\d+/);
        if (!idMatch) {
            console.error("No ID found");
            return;
        }
        const id = idMatch[0];
        const url = `https://biggamesapi.io/image/${id}`;
        console.log(`Resolved URL: ${url}`);

        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            validateStatus: () => true, // Don't throw on error status
        });

        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);
        console.log("Data Type:", typeof response.data);
        console.log("Data Length:", response.data.length || response.data.byteLength);

        if (response.data instanceof Buffer) {
            console.log("Data is Buffer");
            console.log("First 50 bytes:", response.data.subarray(0, 50).toString('hex'));
            console.log("Start of string:", response.data.subarray(0, 100).toString('utf8').replace(/[^\x20-\x7E]/g, '.'));
        } else if (response.data instanceof ArrayBuffer) {
            console.log("Data is ArrayBuffer");
            const view = new Uint8Array(response.data);
            console.log("First 50 bytes:", Buffer.from(view.subarray(0, 50)).toString('hex'));
        } else {
            console.log("Data:", response.data);
        }

    } catch (error) {
        console.error("Error fetching:", error);
    }
}

run();
