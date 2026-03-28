// src/mockSeed.ts
import { getCachedClans, getCachedClanDetails } from "./api";

const DB_NAME = "ps_clans_pwa";
const DB_VERSION = 1;

function getDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function seedMockData() {
  if (localStorage.getItem("mock_seeded_v2")) return;

  try {
      const db = await getDb();
      
      const clans = await getCachedClans(100);
      if (!clans || clans.length === 0) return;
      
      const ancientClans = JSON.parse(JSON.stringify(clans));
      if (ancientClans[0].Members > 0) ancientClans[0].Members -= 1; 
      else ancientClans[0].Members += 1; // Fallback to simulate someone leaving

      const targetTime = Date.now() - 86400000;
      
      const tx1 = db.transaction("clan_history", "readwrite");
      tx1.objectStore("clan_history").put({ timestamp: targetTime, data: ancientClans });

      const topClanName = ancientClans[0].Name;
      const detail = await getCachedClanDetails(topClanName);
      
      if (detail && detail.Members && detail.Members.length > 0) {
          const ancientDetail = JSON.parse(JSON.stringify(detail));
          ancientDetail.Members.pop(); // Remove last member to simulate a join today
          
          if (ancientDetail.Battles) {
              const battleKey = Object.keys(ancientDetail.Battles).find(b => !ancientDetail.Battles[b].ProcessedAwards) || Object.keys(ancientDetail.Battles)[0];
              if (battleKey && ancientDetail.Battles[battleKey].PointContributions) {
                  const pcs = ancientDetail.Battles[battleKey].PointContributions;
                  if (pcs.length > 0) {
                      pcs[0].Points = Math.max(0, pcs[0].Points - 50000);
                  }
              }
          }

          const tx2 = db.transaction("clan_detail_history", "readwrite");
          tx2.objectStore("clan_detail_history").put({ clanName: topClanName, timestamp: targetTime, data: ancientDetail });
      }
      
      localStorage.setItem("mock_seeded_v2", "true");
      console.log("Mock data seeded successfully! Please reload the page to see 24HR changes.");
  } catch(e) {
      console.error("Failed to seed mock data", e);
  }
}
