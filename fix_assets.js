const fs = require('fs');
const path = require('path');

const files = [
  'frontend/src/components/Reviews.tsx',
  'frontend/src/components/MoreStaysNearby.tsx',
  'frontend/src/components/navbar/Search.tsx',
  'frontend/src/components/HostSection.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace src="http://localhost:3000/assets/..."
  // with src={`${API_BASE_URL}/assets/...`}
  content = content.replace(/src="http:\/\/localhost:3000([^"]+)"/g, 'src={`${API_BASE_URL}$1`}');

  // Replace image: "http://localhost:3000/assets/..."
  // with image: `${API_BASE_URL}/assets/...`
  content = content.replace(/image:\s*"http:\/\/localhost:3000([^"]+)"/g, 'image: `${API_BASE_URL}$1`');

  // Ensure API_BASE_URL is imported
  if (content.includes('API_BASE_URL') && !content.includes('config/api')) {
    // find a place to insert the import
    // just put it after the last import
    const importRegex = /^import.*?;?\n/gm;
    let match;
    let lastImportIndex = 0;
    while ((match = importRegex.exec(content)) !== null) {
      lastImportIndex = match.index + match[0].length;
    }
    
    // figure out the relative path to config/api
    const depth = file.split('/').length - 3; // frontend/src/components/...
    const prefix = depth === 1 ? '../' : '../../'; // simple heuristic for this specific case
    // wait, components/ is depth 1, navbar/ is depth 2
    
    let relPath = '../config/api';
    if (file.includes('navbar')) {
        relPath = '../../config/api';
    }

    const importStatement = `import { API_BASE_URL } from "${relPath}";\n`;
    content = content.slice(0, lastImportIndex) + importStatement + content.slice(lastImportIndex);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
