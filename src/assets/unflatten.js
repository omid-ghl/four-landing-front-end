const fs = require('fs');

function unflatten(data) {
    const result = {};

    for (const key in data) {
        const keys = key.split('.');
        keys.reduce((acc, part, index) => {
            if (index === keys.length - 1) {
                acc[part] = data[key];
            } else {
                acc[part] = acc[part] || {};
            }
            return acc[part];
        }, result);
    }

    return result;
}

// Read the JSON file
fs.readFile('merged-content.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        const data = JSON.parse(jsonString);
        const unflattenedData = unflatten(data);

        // Save the unflattened JSON to a new file
        fs.writeFile(
            'content.json',
            JSON.stringify(unflattenedData, null, 2),
            (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                } else {
                    console.log('Unflattened JSON saved to content.json');
                }
            },
        );
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
});

// + https://dadroit.com/string-to-json/
// + replaceAll()
