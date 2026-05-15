const fs = require('fs');
const path = require('path');

const dataPath = 'src/lib/data.ts';
const offersPath = 'src/lib/offers.ts';
const restaurantsPath = 'src/lib/restaurants.ts';
const imagesPath = 'src/lib/placeholder-images.json';

function extractImageIds(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /imageId:\s*['"]([^'"]+)['"]/g;
    const ids = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        ids.push(match[1]);
    }
    return ids;
}

const usedIds = [
    ...extractImageIds(dataPath),
    ...extractImageIds(offersPath),
    ...extractImageIds(restaurantsPath)
];

const uniqueUsedIds = [...new Set(usedIds)];

const imagesJson = JSON.parse(fs.readFileSync(imagesPath, 'utf8'));
const availableIds = imagesJson.placeholderImages.map(img => img.id);

const missingIds = uniqueUsedIds.filter(id => !availableIds.includes(id));

console.log('Unique Used IDs:', uniqueUsedIds.length);
console.log('Available IDs:', availableIds.length);

if (missingIds.length > 0) {
    console.log('Missing IDs:', missingIds);
} else {
    console.log('All image IDs are present in placeholder-images.json');
}
