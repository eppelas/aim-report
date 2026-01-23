import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Languages to process
const languages = ['ru', 'by', 'ro'];

// Parse evidence data from English slides.md
function parseEnglishEvidence() {
  const englishPath = path.join(__dirname, '../content/slides.md');
  if (!fs.existsSync(englishPath)) {
    console.warn('⚠ English slides.md not found');
    return {};
  }
  
  const content = fs.readFileSync(englishPath, 'utf-8');
  const sections = content.split('---').slice(1);
  const evidenceMap = {};
  
  sections.forEach((section) => {
    const lines = section.trim().split('\n');
    const metadata = {};
    let contentStart = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes(':') && !line.startsWith(' ')) {
        const [key, ...valueParts] = line.split(':');
        metadata[key.trim()] = valueParts.join(':').trim();
      } else if (line.trim() === '') {
        contentStart = i + 1;
        break;
      }
    }
    
    if (metadata.layout === 'shift-scroll' && metadata.loopNumber) {
      const shiftContent = lines.slice(contentStart).join('\n');
      const shiftId = metadata.loopNumber.toString().padStart(2, '0');
      
      const evidence = {
        stats: [],
        researchTop: [],
        research: [],
        aimEvidence: [],
        voices: []
      };
      
      // Parse Key Stats
      const statsMatch = shiftContent.match(/\*\*Key Stats:\*\*(.*?)(?=\*\*Research:|$)/s);
      if (statsMatch) {
        const statLines = statsMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
        statLines.forEach(line => {
          const match = line.match(/^-\s*\*\*([^:*]+):\*\*\s*(.+)/);
          if (match) {
            evidence.stats.push({
              value: match[1].trim(),
              label: match[2].trim()
            });
          }
        });
      }
      
      // Parse Research
      const researchMatch = shiftContent.match(/\*\*Research:\*\*(.*?)(?=\*\*AI Mindset Evidence:|\*\*Tags:|$)/s);
      if (researchMatch) {
        const researchLines = researchMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
        researchLines.forEach(line => {
          const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (linkMatch) {
            const title = linkMatch[1].replace(/^\*\*|\*\*$/g, '').trim();
            const url = linkMatch[2].trim();
            const description = line.split(/\)\s*:\s*/)[1] || '';
            
            const isTop = line.includes('[TOP]');
            const researchItem = {
              title: title,
              url: url,
              description: description.trim()
            };
            
            if (isTop) {
              evidence.researchTop.push(researchItem);
            } else {
              evidence.research.push(researchItem);
            }
          }
        });
      }
      
      // Parse AI Mindset Evidence
      const aimMatch = shiftContent.match(/\*\*AI Mindset Evidence:\*\*(.*?)(?=\*\*Tags:|$)/s);
      if (aimMatch) {
        const aimLines = aimMatch[1].split('\n').filter(l => l.trim().startsWith('→'));
        aimLines.forEach(line => {
          const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (linkMatch) {
            const title = linkMatch[1].replace(/^\*\*|\*\*$/g, '').trim();
            const url = linkMatch[2].trim();
            const description = line.split(/—\s*/)[1] || '';
            
            evidence.aimEvidence.push({
              title: title,
              url: url,
              description: description.trim()
            });
          }
        });
      }
      
      // Parse Community Voices
      const voicesMatch = shiftContent.match(/\*\*Community Voices:\*\*(.*?)(?=source:|$)/s);
      if (voicesMatch) {
        const voiceLines = voicesMatch[1].split('\n').filter(l => l.trim().startsWith('→'));
        voiceLines.forEach(line => {
          const quoteMatch = line.match(/\*\*"([^"]+)"\*\*\s*—\s*"(.+?)"\s*\(([^)]+)\)/);
          if (quoteMatch) {
            evidence.voices.push({
              tag: quoteMatch[1].trim(),
              text: quoteMatch[2].trim(),
              author: quoteMatch[3].trim()
            });
          }
        });
      }
      
      evidenceMap[shiftId] = evidence;
    }
  });
  
  return evidenceMap;
}

function parseLanguage(lang) {
  const inputPath = path.join(__dirname, `../content/slides.${lang}.md`);
  const outputPath = path.join(__dirname, `../public/content/shifts-${lang}.json`);

  // Check if input file exists
  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠ slides.${lang}.md not found, skipping...`);
    return false;
  }

  const content = fs.readFileSync(inputPath, 'utf-8');
  const sections = content.split('---').slice(1);
  
  // Get evidence from English
  const englishEvidence = parseEnglishEvidence();

  const layers = [];
  const shifts = [];
  let manifesto = null;
  let thankYou = null;

  sections.forEach((section, index) => {
    const lines = section.trim().split('\n');
    const slide = { metadata: {}, content: '' };
    let inMetadata = true;
    let contentLines = [];
    let freeTextLines = [];

    lines.forEach(line => {
      if (line.startsWith('title:')) {
        slide.metadata.title = line.replace('title:', '').trim();
      } else if (line.startsWith('subtitle:')) {
        slide.metadata.subtitle = line.replace('subtitle:', '').trim();
      } else if (line.startsWith('alternativeSubtitle:')) {
        slide.metadata.alternativeSubtitle = line.replace('alternativeSubtitle:', '').trim();
      } else if (line.startsWith('layout:')) {
        slide.metadata.layout = line.replace('layout:', '').trim();
      } else if (line.startsWith('loopNumber:')) {
        slide.metadata.loopNumber = line.replace('loopNumber:', '').trim();
      } else if (line.trim() === '') {
        inMetadata = false;
      } else if (inMetadata && !line.includes(':')) {
        // Free-text line in metadata block (likely constraint)
        freeTextLines.push(line.trim());
      } else if (!inMetadata) {
        contentLines.push(line);
      }
    });

    slide.content = contentLines.join('\n').trim();
    slide.metadata.constraint = freeTextLines.join(' ');

    // Determine slide type - check for layer keywords in multiple languages
    const isLayer = slide.metadata.layout === 'center' && (
      slide.metadata.title?.toLowerCase().includes('слой') ||  // ru
      slide.metadata.title?.toLowerCase().includes('пласт') || // by
      slide.metadata.title?.toLowerCase().includes('strat')    // ro
    );

    if (isLayer) {
      const layerId = slide.metadata.title.match(/([iv]+):/i)?.[1]?.toUpperCase() || `L${layers.length + 1}`;
      const titleClean = slide.metadata.title
        .replace(/слой [iv]+:\s*/i, '')
        .replace(/пласт [iv]+:\s*/i, '')
        .replace(/stratul [iv]+:\s*/i, '');
      
      // Get description from content
      const contentLines = slide.content.split('\n').filter(line => line.trim());
      const desc = contentLines[0] || '';
      
      layers.push({
        id: layerId,
        title: titleClean.toUpperCase(),
        subtitle: slide.metadata.subtitle || '',
        desc: desc,
        constraint: slide.metadata.constraint || '',
        metaphor: 'globe'
      });
    } else if (slide.metadata.layout === 'shift-scroll') {
      const shiftNum = slide.metadata.loopNumber || shifts.length + 1;
      const layerId = shiftNum <= 3 ? 'I' : shiftNum <= 6 ? 'II' : shiftNum <= 9 ? 'III' : 'IV';
      
      // Parse content sections - check for keywords in multiple languages
      let techSection = '', humanSection = '', gapSection = '';
      
      // Russian patterns
      const ruTech = slide.content.match(/\*\*технологии:\*\*(.*?)(?=\*\*вывод для технологий:|$)/s);
      const ruHuman = slide.content.match(/\*\*люди:\*\*(.*?)(?=\*\*вывод для людей:|$)/s);
      const ruGap = slide.content.match(/\*\*разрыв:\*\*(.*?)$/s);
      
      if (ruTech) techSection = ruTech[1].trim().replace(/\*\*/g, '');
      if (ruHuman) humanSection = ruHuman[1].trim().replace(/\*\*/g, '');
      if (ruGap) gapSection = ruGap[1].trim().replace(/\*\*/g, '');

      // Extract shift name from title
      const shiftName = slide.metadata.title
        .replace(/^сдвиг \d+:\s*/i, '')       // ru
        .replace(/^зрух \d+:\s*/i, '')        // by
        .replace(/^schimbare \d+:\s*/i, '');  // ro

      const layerTitles = {
        'I': { ru: 'ФУНДАМЕНТ', by: 'ФУНДАМЕНТ', ro: 'FUNDAȚIE' },
        'II': { ru: 'МЫШЛЕНИЕ', by: 'МЫСЛЕННЕ', ro: 'GÂNDIRE' },
        'III': { ru: 'ИНТЕРФЕЙС', by: 'ІНТЭРФЕЙС', ro: 'INTERFAȚĂ' },
        'IV': { ru: 'ЧЕЛОВЕЧНОСТЬ', by: 'ЧАЛАВЕЧНАСЦЬ', ro: 'UMANITATE' }
      };
      
      // Get evidence from English file
      const shiftId = shiftNum.toString().padStart(2, '0');
      const evidence = englishEvidence[shiftId] || {
        stats: [],
        researchTop: [],
        research: [],
        aimEvidence: [],
        voices: []
      };
      
      shifts.push({
        id: shiftNum.toString().padStart(2, '0'),
        layerId: layerId,
        layerTitle: layerTitles[layerId][lang] || layerTitles[layerId]['ru'],
        title: slide.metadata.subtitle || '',
        subtitle: shiftName || '',
        context: slide.metadata.alternativeSubtitle || '',
        machineCol: {
          label: lang === 'ru' ? 'ТЕХНОЛОГИЯ' : lang === 'by' ? 'ТЭХНАЛОГІЯ' : 'TEHNOLOGIE',
          title: lang === 'ru' ? 'Что строится' : lang === 'by' ? 'Што будуецца' : 'Ce se construiește',
          desc: techSection
        },
        humanCol: {
          label: lang === 'ru' ? 'ЧЕЛОВЕК' : lang === 'by' ? 'ЧАЛАВЕК' : 'UMAN',
          title: lang === 'ru' ? 'Как люди адаптируются' : lang === 'by' ? 'Як людзі адаптуюцца' : 'Cum se adaptează oamenii',
          desc: humanSection
        },
        gap: {
          title: lang === 'ru' ? 'РАЗРЫВ' : lang === 'by' ? 'РАЗРЫЎ' : 'DECALAJ',
          desc: gapSection
        },
        stats: evidence.stats,
        researchTop: evidence.researchTop,
        research: evidence.research,
        aimEvidence: evidence.aimEvidence,
        voices: evidence.voices
      });
    } else if (slide.metadata.layout === 'manifesto') {
      manifesto = {
        title: slide.metadata.title || '',
        subtitle: slide.metadata.subtitle || '',
        content: slide.content
      };
    } else if (slide.metadata.layout === 'thank-you') {
      thankYou = {
        title: slide.metadata.title || '',
        subtitle: slide.metadata.subtitle || '',
        content: slide.content
      };
    }
  });

  const output = {
    shifts,
    layers,
    manifesto,
    thankYou,
    generated: new Date().toISOString()
  };

  // Create directory if it doesn't exist
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`✓ Generated ${outputPath}`);
  console.log(`  - ${layers.length} layers`);
  console.log(`  - ${shifts.length} shifts`);
  
  return true;
}

// Process all languages
console.log('Generating content for all languages...\n');
languages.forEach(lang => parseLanguage(lang));
