# ps99-api

[![npm version](https://badge.fury.io/js/ps99-api.svg)](https://badge.fury.io/js/ps99-api)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fjoekiller.github.io%2Fnode-ps99-api)

Pet Simulator Public API wrapper written in Typescript.

## Installation

`npm install ps99-api` or `yarn add ps99-api`

## Usage

```typescript
import { PetSimulator99API } from "ps99-api";

const ps99api = new PetSimulator99API();
await ps99api.getClan("CAT");
```

## Notes

1. `{{URL}}/api/exists` seems to only return pets for now.

## Links

- [ps99-public-api-docs](https://github.com/BIG-Games-LLC/ps99-public-api-docs)
- [Pet Simulator Public API](https://docs.biggamesapi.io/)
