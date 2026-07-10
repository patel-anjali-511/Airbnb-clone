const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'backend/src/routes/api.ts');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('getBaseUrl')) {
  const getBaseUrlFn = `
const getBaseUrl = (req: Request) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  return \`\${protocol}://\${req.get('host')}\`;
};
`;

  content = content.replace('const router = Router();', 'const router = Router();\n' + getBaseUrlFn);
  content = content.replace(/readJsonFile\(([^)]+)\)/g, 'readJsonFile($1, getBaseUrl(req))');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('api.ts updated');
} else {
  console.log('api.ts already updated');
}
