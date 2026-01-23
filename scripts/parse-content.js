import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Languages to process
const languages = ['en', 'ru', 'by', 'ro'];

// Parse evidence data from English slides.md
function parseEnglishEvidence() {
  const englishPath = path.join(__dirname, '../content/slides.md');
  if (!fs.existsSync(englishPath)) {
    console.warn(' English slides.md not found');
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
        const value = valueParts.join(':').trim();
        
        // Handle multiline YAML (|)
        if (value === '|') {
          const multilineContent = [];
          i++;
          while (i < lines.length && (lines[i].startsWith('  ') || lines[i].trim() === '')) {
            if (lines[i].trim()) {
              multilineContent.push(lines[i].trim());
            }
            i++;
          }
          metadata[key.trim()] = multilineContent.join('\n');
          i--; // step back one line
        } else {
          metadata[key.trim()] = value;
        }
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
          const match = line.match(/\*\*([^:]+):\*\*\s*(.+)/);
          if (match) {
            let desc = match[2].trim();
            // Extract ALL URLs from markdown links
            const urlMatches = [...desc.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
            const url = urlMatches.length > 0 ? urlMatches[0][2] : '';
            
            // Take only text before the first opening parenthesis (removes all markdown links)
            const parenIndex = desc.indexOf('(');
            if (parenIndex > 0) {
              desc = desc.substring(0, parenIndex).trim();
            }
            evidence.stats.push({
              label: '',
              value: match[1].trim(),
              desc: desc.trim(),
              url: url
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
          // Match format: → **"tag"** — "text" (author) OR → **"tag"** — text without quotes (author)
          const quoteMatch = line.match(/\*\*"([^"]+)"\*\*\s*—\s*(.+?)\s*\(([^)]+)\)/);
          if (quoteMatch) {
            let text = quoteMatch[2].trim();
            // Remove quotes if present
            text = text.replace(/^"|"$/g, '');
            evidence.voices.push({
              tag: quoteMatch[1].trim(),
              text: text,
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
  const inputFile = lang === 'en' ? 'slides.md' : `slides.${lang}.md`;
  const inputPath = path.join(__dirname, `../content/${inputFile}`);
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
    let freeTextLines = [];

    // Parse metadata with multiline YAML support
    let i = 0;
    let inMetadata = true;
    while (i < lines.length && inMetadata) {
      const line = lines[i];
      
      // YAML field: key: value
      if (line.includes(':') && !line.startsWith(' ') && line.trim() !== '') {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        
        // Handle multiline YAML (|)
        if (value === '|') {
          const multilineContent = [];
          i++;
          while (i < lines.length && lines[i].startsWith('  ')) {
            multilineContent.push(lines[i].trim());
            i++;
          }
          slide.metadata[key.trim()] = multilineContent.join('\n');
          continue; // don't increment i, already at next line
        } else {
          slide.metadata[key.trim()] = value;
        }
      } else if (line.trim() === '') {
        // Empty line - metadata ends here
        inMetadata = false;
        i++;
        freeTextLines = lines.slice(i);
        break;
      }
      i++;
    }

    slide.content = freeTextLines.join('\n').trim();

    // Determine slide type - check for layer keywords in multiple languages
    const isLayer = slide.metadata.layout === 'center' && (
      slide.metadata.title?.toLowerCase().includes('layer') || // en
      slide.metadata.title?.toLowerCase().includes('слой') ||  // ru
      slide.metadata.title?.toLowerCase().includes('пласт') || // by
      slide.metadata.title?.toLowerCase().includes('strat')    // ro
    );

    if (isLayer) {
      const layerId = slide.metadata.title.match(/([iv]+):/i)?.[1]?.toUpperCase() || `L${layers.length + 1}`;
      const titleClean = slide.metadata.title
        .replace(/layer [iv]+:\s*/i, '')
        .replace(/слой [iv]+:\s*/i, '')
        .replace(/пласт [iv]+:\s*/i, '')
        .replace(/stratul [iv]+:\s*/i, '');
      
      // Get description and constraint from metadata
      const desc = slide.metadata.caption || '';
      const constraint = slide.metadata.content || slide.content || '';
      
      layers.push({
        id: layerId,
        title: titleClean.toUpperCase(),
        subtitle: slide.metadata.subtitle || '',
        desc: desc,
        constraint: constraint,
        metaphor: 'globe'
      });
    } else if (slide.metadata.layout === 'shift-scroll') {
      const shiftNum = slide.metadata.loopNumber || shifts.length + 1;
      const layerId = shiftNum <= 3 ? 'I' : shiftNum <= 6 ? 'II' : shiftNum <= 9 ? 'III' : 'IV';
      
      // Parse content sections - check for keywords in multiple languages
      let techSection = '', humanSection = '', gapSection = '';
      let techTitle = '', humanTitle = '';
      
      // ВАЖНО: для shift слайдов весь контент (Machine Vector, Human Reaction, Gap) находится в slide.content
      // English patterns - ищем блоки текста между заголовками (включая стрелочку)
      const machineBlock = slide.content.match(/\*\*Machine Vector:\*\*([\s\S]*?)(?=\n\n\*\*Human Reaction:)/);
      const humanBlock = slide.content.match(/\*\*Human Reaction:\*\*([\s\S]*?)(?=\n\n\*\*Gap:)/);
      
      // Извлекаем основной текст (до стрелочки) и summary (после стрелочки)
      if (machineBlock) {
        const machineText = machineBlock[1].trim();
        const lines = machineText.split('\n');
        const arrowLineIndex = lines.findIndex(line => line.trim().startsWith('→'));
        if (arrowLineIndex !== -1) {
          techSection = lines.slice(0, arrowLineIndex).join('\n').trim();
          techTitle = lines[arrowLineIndex].replace(/^→\s*/, '').trim();
        } else {
          techSection = machineText;
        }
      }
      
      if (humanBlock) {
        const humanText = humanBlock[1].trim();
        const lines = humanText.split('\n');
        const arrowLineIndex = lines.findIndex(line => line.trim().startsWith('→'));
        if (arrowLineIndex !== -1) {
          humanSection = lines.slice(0, arrowLineIndex).join('\n').trim();
          humanTitle = lines[arrowLineIndex].replace(/^→\s*/, '').trim();
        } else {
          humanSection = humanText;
        }
      }
      
      // Gap - весь текст до Key Stats/Tags
      const gapMatch = slide.content.match(/\*\*Gap:\*\*\s*([\s\S]+?)(?=\n+\*\*(?:Key Stats|Tags))/);
      if (gapMatch) {
        gapSection = gapMatch[1].trim();
      }
      // Remove ** from gap
      gapSection = gapSection.replace(/\*\*/g, '');

      
      // Extract gap title from brackets like [context gap]
      let gapTitle = '';
      const gapTitleMatch = gapSection.match(/^\[([^\]]+)\]/);
      if (gapTitleMatch) {
        gapTitle = gapTitleMatch[1];
        gapSection = gapSection.replace(/^\[([^\]]+)\]\s*/, '').trim();
      }
      // Remove ** from gap
      gapSection = gapSection.replace(/\*\*/g, '');

      // Extract shift name from title
      const shiftName = slide.metadata.title
        .replace(/^сдвиг \d+:\s*/i, '')       // ru
        .replace(/^зрух \d+:\s*/i, '')        // by
        .replace(/^schimbare \d+:\s*/i, '');  // ro

      const layerTitles = {
        'I': { en: 'FOUNDATION', ru: 'ФУНДАМЕНТ', by: 'ФУНДАМЕНТ', ro: 'FUNDAȚIE' },
        'II': { en: 'COGNITION', ru: 'МЫШЛЕНИЕ', by: 'МЫСЛЕННЕ', ro: 'GÂNDIRE' },
        'III': { en: 'INTERFACE', ru: 'ИНТЕРФЕЙС', by: 'ІНТЭРФЕЙС', ro: 'INTERFAȚĂ' },
        'IV': { en: 'HUMANITY', ru: 'ЧЕЛОВЕЧНОСТЬ', by: 'ЧАЛАВЕЧНАСЦЬ', ro: 'UMANITATE' }
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
        layerTitle: layerTitles[layerId][lang] || layerTitles[layerId]['en'],
        title: shiftName || '',
        subtitle: slide.metadata.subtitle || '',
        context: slide.metadata.alternativeSubtitle || '',
        machineCol: {
          label: lang === 'en' ? 'MACHINE VECTOR' : lang === 'ru' ? 'МАШИННЫЙ ВЕКТОР' : lang === 'by' ? 'МАШЫННЫ ВЕКТАР' : 'VECTOR MAȘINĂ',
          title: techTitle || (lang === 'en' ? 'What\'s being built' : lang === 'ru' ? 'Что строится' : lang === 'by' ? 'Што будуецца' : 'Ce se construiește'),
          desc: techSection || ''
        },
        humanCol: {
          label: lang === 'en' ? 'HUMAN REACTION' : lang === 'ru' ? 'ЧЕЛОВЕЧЕСКАЯ РЕАКЦИЯ' : lang === 'by' ? 'ЧАЛАВЕЧАЯ РЭАКЦЫЯ' : 'REACȚIE UMANĂ',
          title: humanTitle || (lang === 'en' ? 'How humans adapt' : lang === 'ru' ? 'Как люди адаптируются' : lang === 'by' ? 'Як людзі адаптуюцца' : 'Cum se adaptează oamenii'),
          desc: humanSection || ''
        },
        gap: {
          title: gapTitle || (lang === 'en' ? 'GAP' : lang === 'ru' ? 'РАЗРЫВ' : lang === 'by' ? 'РАЗРЫЎ' : 'DECALAJ'),
          desc: gapSection.trim()
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
