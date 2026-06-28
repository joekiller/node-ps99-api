const { describe, expect, test } = require('@jest/globals');

function getRouteId(collectionName, item) {
    const configName = item.configName;
    if (configName.includes(' | ')) {
        const parts = configName.split(' | ');
        if (collectionName !== 'Eggs' && collectionName !== 'Zones') {
            return parts[1];
        }
        if (collectionName === 'Zones') {
            return parts[0];
        }
        const cat = item.category || '';
        if (cat === 'Release' || cat.startsWith('World ') || cat.startsWith('Update ')) {
            return parts[0];
        }
        return parts[1];
    }
    if (collectionName === 'Worlds' && configName.startsWith('World ')) {
        return configName.replace('World ', '');
    }
    return configName;
}

describe('getRouteId routing logic', () => {
    test('non-Eggs/Zones collections use the right side of the split', () => {
        expect(getRouteId('Buffs', { configName: 'Buff | Ultra Pet Token Boost' })).toBe('Ultra Pet Token Boost');
        expect(getRouteId('Pets', { configName: 'Pets | Golden Dog' })).toBe('Golden Dog');
    });

    test('Zones use the left side of the split', () => {
        expect(getRouteId('Zones', { configName: 'Zone1 | Some Zone Name' })).toBe('Zone1');
    });

    test('Event Eggs use the right side of the split', () => {
        expect(getRouteId('Eggs', { configName: '8 | Present Egg', category: 'Event' })).toBe('Present Egg');
    });

    test('Release Eggs use the left side of the split', () => {
        expect(getRouteId('Eggs', { configName: '1 | Starter Egg', category: 'Release' })).toBe('1');
    });

    test('World Eggs use the left side of the split', () => {
        expect(getRouteId('Eggs', { configName: '3 | World Egg', category: 'World 3' })).toBe('3');
    });

    test('Update Eggs use the left side of the split', () => {
        expect(getRouteId('Eggs', { configName: '5 | Update Egg', category: 'Update 5' })).toBe('5');
    });

    test('Worlds strips "World " prefix from configName', () => {
        expect(getRouteId('Worlds', { configName: 'World 7' })).toBe('7');
    });

    test('items without a split delimiter return configName as-is', () => {
        expect(getRouteId('Pets', { configName: 'SimplePet' })).toBe('SimplePet');
        expect(getRouteId('Eggs', { configName: 'BasicEgg' })).toBe('BasicEgg');
    });
});
