import fs from 'fs';
import path from 'path';

const inputPath = path.join(__dirname, '../../../content/slides.ru.md');
const outputPath = path.join(__dirname, '../locales/ru-content.json');

const content = fs.readFileSync(inputPath, 'utf-8');

// Simple parser for slides.ru.md - extracts basic structure
const slides = content.split('---').slice(1).map(slide => {
  const lines = slide.trim().split('\n');
  const data: any = {};
  
  lines.forEach(line => {
    if (line.startsWith('title:')) data.title = line.replace('title:', '').trim();
    if (line.startsWith('subtitle:')) data.subtitle = line.replace('subtitle:', '').trim();
    if (line.startsWith('caption:')) data.caption = line.replace('caption:', '').trim();
  });
  
  return data;
});

const output = {
  slides,
  generated: new Date().toISOString()
};

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
console.log(`Generated ${outputPath}`);
