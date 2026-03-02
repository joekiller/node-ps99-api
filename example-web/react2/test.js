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
console.log('Buffs Output:', getRouteId('Buffs', { configName: 'Buff | Ultra Pet Token Boost' }));
console.log('Eggs Output:', getRouteId('Eggs', { configName: '8 | Present Egg', category: 'Event' }));
