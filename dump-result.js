/**
 * convert a snapshot result to friendly json and then update interface via
 * https://transform.tools/json-to-typescript
 */

const { PetSimulator99API } = require("./dist/ps99-api");
const api = new PetSimulator99API();
api.getCollections().then(async (response) => {
  if (response.status === "ok") {
    const collections = response.data;
    for await (const [c, collection] of collections.map((c) =>
      api.getCollection(c).then((_c) => [c, _c]),
    )) {
      const fs = require("fs");
      fs.writeFileSync(
        `dist/out-${c}.json`,
        JSON.stringify(collection, null, 2),
      );
    }
  }
});
