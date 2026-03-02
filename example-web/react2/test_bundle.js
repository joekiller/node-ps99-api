const fs = require('fs');
const bundle = fs.readFileSync('./dist/bundle.js', 'utf8');

const regex = /function[^{]+\(e,t\)\{.*?return.*?}/;
// let's try to extract the getRouteId function logic to see what it does
// Actually let's just grep for something very specific again
