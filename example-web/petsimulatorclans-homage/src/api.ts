import { PetSimulator99API } from "ps99-api";

const CACHE_KEY = "ps_clans_cache";
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes cache

const DB_NAME = "ps_clans_pwa";
const DB_VERSION = 1;

function getDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("clan_history")) {
        const store = db.createObjectStore("clan_history", { keyPath: "timestamp" });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
      if (!db.objectStoreNames.contains("clan_detail_history")) {
        const store = db.createObjectStore("clan_detail_history", { autoIncrement: true });
        store.createIndex("clanName", "clanName", { unique: false });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
  });
}

export async function saveClanSnapshot(clans: any[]) {
  try {
    const db = await getDb();
    const tx = db.transaction("clan_history", "readwrite");
    tx.objectStore("clan_history").put({ timestamp: Date.now(), data: clans });
  } catch(e) { console.warn("IDB error", e); }
}

export async function saveClanDetailSnapshot(name: string, detail: any) {
  try {
    const db = await getDb();
    const tx = db.transaction("clan_detail_history", "readwrite");
    tx.objectStore("clan_detail_history").put({ clanName: name, timestamp: Date.now(), data: detail });
  } catch(e) { console.warn("IDB error", e); }
}

export async function getClanDetail24HAgo(name: string): Promise<any | null> {
  try {
    const db = await getDb();
    return new Promise((resolve) => {
      const tx = db.transaction("clan_detail_history", "readonly");
      const index = tx.objectStore("clan_detail_history").index("clanName");
      const request = index.getAll(IDBKeyRange.only(name));
      request.onsuccess = () => {
        const records = request.result;
        if (!records || records.length === 0) return resolve(null);
        const targetTime = Date.now() - 86400000;
        let bestRecord = records[0];
        let smallestDiff = Infinity;
        for (const r of records) {
            const diff = Math.abs(r.timestamp - targetTime);
            if (diff < smallestDiff) {
                smallestDiff = diff;
                bestRecord = r;
            }
        }
        // If the best record is actually less than 1 hour old, we might not have enough history yet to call it '24H'
        // But for demonstration, we will return it.
        resolve(bestRecord.data);
      };
      request.onerror = () => resolve(null);
    });
  } catch(e) { return null; }
}

export async function getClans24HAgo(): Promise<any[]> {
  try {
    const db = await getDb();
    return new Promise((resolve) => {
      const tx = db.transaction("clan_history", "readonly");
      const request = tx.objectStore("clan_history").getAll();
      request.onsuccess = () => {
        const records = request.result;
        if (!records || records.length === 0) return resolve([]);
        const targetTime = Date.now() - 86400000;
        let bestRecord = records[0];
        let smallestDiff = Infinity;
        for (const r of records) {
            const diff = Math.abs(r.timestamp - targetTime);
            if (diff < smallestDiff) {
                smallestDiff = diff;
                bestRecord = r;
            }
        }
        resolve(bestRecord.data);
      };
      request.onerror = () => resolve([]);
    });
  } catch(e) { return []; }
}

export async function pruneOldSnapshots() {
  try {
    const db = await getDb();
    const expiryTime = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days

    const tx1 = db.transaction("clan_history", "readwrite");
    const req1 = tx1.objectStore("clan_history").openCursor();
    req1.onsuccess = (e: any) => {
      const cursor = e.target.result;
      if (cursor) {
        if (cursor.value.timestamp < expiryTime) cursor.delete();
        cursor.continue();
      }
    };

    const tx2 = db.transaction("clan_detail_history", "readwrite");
    const req2 = tx2.objectStore("clan_detail_history").openCursor();
    req2.onsuccess = (e: any) => {
      const cursor = e.target.result;
      if (cursor) {
        if (cursor.value.timestamp < expiryTime) cursor.delete();
        cursor.continue();
      }
    };
  } catch(e) { console.warn("Prune error", e); }
}

export async function getCachedClans(pageSize: number = 30) {
  const cached = localStorage.getItem(`${CACHE_KEY}_top`);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  const api = new PetSimulator99API();
  try {
    const response = await api.getClans({ sort: "Points", pageSize });
    let results: any = [];
    if (response && (response as any).data) {
      if (Array.isArray((response as any).data)) {
        results = (response as any).data;
      } else if ((response as any).data.data) {
        results = (response as any).data.data;
      }
    }
    if (results.length > 0) {
      localStorage.setItem(`${CACHE_KEY}_top`, JSON.stringify({ data: results, timestamp: Date.now() }));
      saveClanSnapshot(results);
      return results;
    }
  } catch (e) {
    console.error("Failed to fetch clans from api", e);
  }
  return [];
}

export async function getCachedPinnedClans() {
    const pinnedNames = ["MMFC", "SOPU", "RFIL", "BOSS"];
    const cached = localStorage.getItem(`${CACHE_KEY}_pinned`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) return data;
    }
    
    const top = await getCachedClans(100);
    const pinned = await Promise.all(pinnedNames.map(async name => {
        let found = top.find((c: any) => c.Name === name);
        if (!found) {
            try {
                const detail = await getCachedClanDetails(name);
                if (detail) found = detail;
            } catch(e) {}
        }
        return found;
    }));
    
    const valid = pinned.filter(Boolean);
    if (valid.length > 0) {
        localStorage.setItem(`${CACHE_KEY}_pinned`, JSON.stringify({ data: valid, timestamp: Date.now() }));
    }
    return valid;
}

export async function getCachedClanDetails(name: string) {
    const cacheKey = `${CACHE_KEY}_clan_${name}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) return data;
    }
    
    const api = new PetSimulator99API();
    try {
        const response = await api.getClan(name);
        let result: any = null;
        if (response && (response as any).data) {
            if ((response as any).data.Name) {
                result = (response as any).data;
            } else if ((response as any).data.data && (response as any).data.data.Name) {
                result = (response as any).data.data;
            }
        }
        if (result) {
            localStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
            saveClanDetailSnapshot(name, result);
            return result;
        }
    } catch(e) {
        console.error(`Failed to fetch clan ${name} from api`, e);
    }
    return null;
}

export async function getCachedEnchants() {
    const cacheKey = `${CACHE_KEY}_enchants`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION * 5) return data;
    }
    
    const api = new PetSimulator99API();
    try {
        const response = await api.getCollection("enchants" as any);
        let result: any = null;
        if (response && (response as any).data) {
            result = Array.isArray((response as any).data) ? (response as any).data : (response as any).data.data;
        }
        if (result && result.length > 0) {
            localStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
            return result;
        }
    } catch(e) { console.error(e); }
    return [];
}
