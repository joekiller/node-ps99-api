/**
 * convert a snapshot result to friendly json and then update interface via
 * https://transform.tools/json-to-typescript
 */
let dumpResult = [];

const fs = require("fs");
fs.writeFileSync("out.json", JSON.stringify(dumpResult, null, 2));
