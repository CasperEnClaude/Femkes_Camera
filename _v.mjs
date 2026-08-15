import YAML from 'yaml';
import fs from 'node:fs';
const d=YAML.parse(fs.readFileSync('public/admin/config.yml','utf8'));
const p=d.collections.find(c=>c.name==='portfolio');
console.log('config.yml OK — portfolio-bestanden:', p.files.map(f=>f.name).join(', '));
