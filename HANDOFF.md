# AIM Annual Report 2025 - Project Handoff

**Version:** 2.0 (Tectonic Shifts Edition)
**Last Updated:** 2026-01-22
**Production URL:** https://eppelas.github.io/aim-report/

---

## Current State

**Status:** Production Ready ✓
**Deployment:** GitHub Pages via GitHub Actions
**Languages:** English (default), Russian (full localization)

### What Works

1. **Interactive Navigation**
   - Landing page with hero animation
   - 4 layers (Foundation, Cognition, Interface, Humanity)
   - 11 shifts with layer intros
   - Executive Summary page
   - Manifesto page
   - Thank You page
   - Full keyboard navigation (arrow keys, mouse wheel)
   - Timeline navigation panel
   - Index navigation popup

2. **Content System**
   - Markdown-based content (`content/slides.md` for EN)
   - Russian localization (`content/slides.ru.md`)
   - Automatic JSON generation for RU content
   - Dynamic content loading based on language
   - Evidence blocks (stats, research, industry signals, sources, voices)
   - OG preview for external links
   - Blocked domains list for iframe issues

3. **Localization (EN/RU)**
   - Full UI translation (buttons, labels, sections)
   - Dynamic content loading per language
   - Language switcher in header
   - Persistent language preference
   - Stays on same page/shift when switching languages

4. **Analytics**
   - Yandex.Metrika integration (ID: 106376865)
   - Automatic hash tracking for SPA navigation (`trackHash: true`)
   - WebVisor, click map, accurate bounce rate tracking

5. **Theme System**
   - Dark/Light mode toggle
   - Persistent theme preference (localStorage)
   - Smooth transitions between themes

6. **Responsive Design**
   - Mobile-friendly layouts
   - Touch gesture support
   - Optimized for all screen sizes

---

## Technical Architecture

### Tech Stack
```
Frontend:
├── React 19.2.3
├── TypeScript 5.8.2
├── Vite 6.4.1
├── GSAP 3.14.2 (animations)
├── Lenis 1.1.0 (smooth scroll)
└── Tailwind CSS (via CDN)

Deployment:
├── GitHub Actions (.github/workflows/deploy.yml)
├── GitHub Pages
└── Custom domain support ready
```

### File Structure
```
├── components/          # React components
│   ├── Hero.tsx
│   ├── TectonicShiftsAnimation.tsx
│   ├── ReportView.tsx
│   ├── LayerView.tsx
│   ├── SummaryView.tsx
│   ├── ThankYou.tsx
│   ├── ManifestoPage/
│   ├── NavigationPopUp/
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useShiftsData.ts
│   ├── useI18n.ts
│   └── ...
├── public/
│   ├── content/
│   │   ├── shifts.json       # Generated from slides.md
│   │   └── shifts-ru.json    # Generated from slides.ru.md
│   └── i18n/
│       ├── en.json
│       └── ru.json
├── scripts/
│   └── parse-ru-content.js   # RU content generator
├── content/
│   └── slides.ru.md          # Russian content source
├── App.tsx                   # Main app component
├── index.html               # HTML entry point
├── index.tsx                # React entry point
├── package.json
└── vite.config.ts
```

### Content Management

**English Content:**
- Source: Lives in repository root level at `content/slides.md` (managed separately)
- Generated: `public/content/shifts.json`
- Format: Markdown with YAML frontmatter

**Russian Content:**
- Source: `content/slides.ru.md`
- Generated: `public/content/shifts-ru.json` (via `npm run content:ru`)
- Auto-generation: Runs on every build (`npm run build`)

**Evidence Data:**
- English evidence (stats, research, industry signals, sources, voices) stored in `shifts.json`
- Russian shifts inherit English evidence data (fallback merge in `useShiftsData.ts`)
- Translation: Only shift narratives (tech, human, gap) are translated

---

## Deployment

### GitHub Actions Workflow
```yaml
Location: .github/workflows/deploy.yml
Trigger: Push to main branch
Process:
  1. Checkout code
  2. Install dependencies (in project root)
  3. Build (npm run build - includes multi-language content generation)
  4. Deploy to GitHub Pages
```

### Build Commands
```bash
# Development
npm run dev

# Build production
npm run build  # Auto-generates shifts-ru.json + builds Vite

# Generate RU content only
npm run content:ru

# Preview production build
npm run preview
```

### Environment Setup
- Node.js 20+
- npm 10+
- No environment variables required
- Base path: `/aim-report/` (configured in `vite.config.ts`)

---

## Evidence System Architecture

### Data Structure

Each shift contains multiple evidence types, structured hierarchically:

```typescript
interface ShiftData {
  // ... shift metadata ...
  
  stats: Array<{           // Key Statistics (top of page)
    label: string;         // e.g. "Surge", "Gap", "CapEx"
    value: string;         // e.g. "160%", "40x", "$7T"
    desc: string;          // Full description with source attribution
    url?: string;          // Optional link to source
  }>;
  
  evidence?: Array<{       // AIM Evidence (custom research/artifacts)
    title: string;         // e.g. "Intention OS", "Founder OS"
    desc: string;          // Description of the evidence
    url: string;           // Link to artifact
  }>;
  
  sources: Array<{         // Industry Sources (academic, reports, articles)
    id: number;
    title: string;         // Source title
    author: string;        // Author/Organization
    type: string;          // "Report", "Paper", "Article", "Standard"
    url: string;           // Link to source
  }>;
  
  voices?: Array<{         // Community Voices (quotes from practitioners)
    quote: string;         // The quote text
    author: string;        // Person's name
    role: string;          // Their role/title
  }>;
}
```

### Rendering Logic

Evidence is displayed in order on shift pages:

1. **Key Stats Section** (top)
   - Rendered as 3-column grid (mobile: 1 column)
   - Large numbers with labels
   - Clickable if `url` is provided → opens modal with iframe/OG preview
   - Height: 160px mobile, 300px desktop

2. **Data Sources Section** (middle)
   - **AIM Evidence subsection** (if exists)
     - Branded with AIM logo
     - 2-column grid layout
     - Cards with title + description
     - Marked as `type: "Evidence", author: "AIM Lab"`
   - **Industry Sources subsection**
     - 4-column grid layout
     - Grid class determined by `type`:
       - `"Report"` → `col-span-2` (wider)
       - `"Paper"` → `col-span-2` (wider)
       - `"Article"` → `col-span-1` (standard)
       - Other → `col-span-1`
     - Shows: type badge, title, author

3. **Voices Section** (bottom, optional)
   - Only renders if `voices` array exists and has items
   - Quote cards with attribution
   - Italic serif font for quotes
   - Author + role displayed below

### Translation Strategy

- **English evidence** is stored in `public/content/shifts.json`
- **Translated shifts** (ru/by/ro) inherit ALL English evidence data
- Only shift narratives (tech/human/gap) are translated
- Evidence blocks remain in English across all languages
- This is by design - evidence is factual and doesn't require translation

---

## Iframe vs OG Preview System

### Decision Logic

When a user clicks on a stat/source/evidence item, the system decides whether to show:
1. **Iframe embed** (default) - shows the actual website
2. **OG preview** (fallback) - shows Open Graph card with metadata

Decision flow:
```
User clicks link
  ↓
Check: Is domain in BLOCKED_DOMAINS?
  ↓ YES → Show OG Preview
  ↓ NO  → Try Iframe
      ↓
      Iframe loads successfully? 
        ↓ YES → Show Iframe
        ↓ NO  → Show OG Preview (fallback)
```

### BLOCKED_DOMAINS List

Domains that **cannot** be embedded in iframe (security/policy restrictions):

```typescript
const BLOCKED_DOMAINS = [
  // Video platforms (X-Frame-Options: DENY)
  'youtube.com', 'youtu.be',
  
  // Messaging platforms (CSP restrictions)
  't.me', 'telegram.me',
  
  // Academic journals (paywall/security)
  'nature.com', 'science.org',
  
  // Tech media (anti-iframe policies)
  'technologyreview.com', 'theverge.com', 'techcrunch.com',
  
  // Industry reports (security policies)
  'iea.org', 'mckinsey.com',
  
  // Newsletters/blogs
  'substack.com',
  
  // AIM artifacts (custom handling)
  'intention.aimindset.org', 
  'spiridonov.aimindset.org', 
  'ivanov.aimindset.org'
]
```

### Implementation Details

**Iframe Mode:**
- Modal opens with full-screen iframe
- Website loads inside the modal
- User can navigate within iframe
- "Open Full" button opens in new tab
- Close button exits modal

**OG Preview Mode:**
- Fetches Open Graph metadata via `https://opengraph.io` API
- Caches results in `ogCache` ref (avoid repeated fetches)
- Prefetches on hover for instant display
- Shows: image, title, description, site name
- "Open Link" button opens in new tab
- Fallback if OG fetch fails: shows basic link info

**Error Handling:**
```typescript
// Iframe error detection
<iframe 
  onError={() => setIframeError(true)}  // Triggers OG fallback
/>

// OG fetch with cache
if (ogCache.current[url]) {
  setOgData(ogCache.current[url]);  // Use cached data
} else {
  const response = await fetch(...);  // Fetch new
  ogCache.current[url] = result;     // Cache for future
}
```

### Adding New Blocked Domain

To add a domain to the blocked list:

1. Edit `components/ReportView.tsx`:
   ```typescript
   const BLOCKED_DOMAINS = [
     // ... existing domains
     'newdomain.com'  // Add here
   ];
   ```

2. Edit `components/ManifestoPage/Index.tsx`:
   ```typescript
   const BLOCKED_DOMAINS = [
     // ... existing domains
     'newdomain.com'  // Keep synchronized
   ];
   ```

3. Both lists **must be identical** to ensure consistent behavior across the app.

---

## Known Issues & Quirks

### Fixed Issues
- ✓ Black screen on RU language switch → Fixed with loading states
- ✓ UI not translating → Fixed with `useI18n` hook
- ✓ Shifts not rendering on RU → Fixed JSON structure in parser
- ✓ Evidence blocks missing in RU → Added fallback merge
- ✓ OG preview not showing → Added domains to BLOCKED_DOMAINS
- ✓ GitHub Actions failing → Fixed workflow paths
- ✓ Yandex.Metrika not tracking navigation → Added `trackHash: true`

### Known Limitations
1. Some external links don't embed well in iframe → Use BLOCKED_DOMAINS list
2. Evidence content not translated → English fallback (by design)
3. Large bundle size (530KB) → Consider code splitting in future

### BLOCKED_DOMAINS List
Domains that show OG preview instead of iframe embed:
```typescript
[
  'youtube.com', 'youtu.be',
  't.me', 'telegram.me',
  'nature.com', 'science.org',
  'technologyreview.com', 'theverge.com', 'techcrunch.com',
  'iea.org', 'mckinsey.com',
  'substack.com',
  'intention.aimindset.org', 'spiridonov.aimindset.org', 'ivanov.aimindset.org'
]
```

---

## TODO / Potential Improvements

### High Priority
- [ ] Add more languages (BY, RO) - infrastructure ready
- [ ] Optimize bundle size (code splitting, lazy loading)
- [ ] Add meta tags for each shift (SEO)
- [ ] Custom domain setup if needed

### Medium Priority
- [ ] Translate evidence sections (research, stats) to RU
- [ ] Add accessibility improvements (ARIA labels, keyboard hints)
- [ ] Analytics dashboard integration
- [ ] Add print styles for PDF export

### Low Priority
- [ ] Add animations to shift transitions
- [ ] Add social sharing buttons
- [ ] Add comments/feedback system
- [ ] Add version history page

---

## Content Updates

### To Update English Content
1. Edit `content/slides.md` (in repository root, managed separately)
2. Regenerate JSON if needed
3. Test locally: `npm run dev`
4. Commit and push to main

### To Update Russian Content
1. Edit `content/slides.ru.md`
2. Run `npm run content` to regenerate JSON for all languages
3. Test locally: `npm run dev`
4. Commit and push to main

### To Update UI Translations
1. Edit `public/i18n/en.json` or `public/i18n/ru.json`
2. Test locally
3. Commit and push

### To Add New Blocked Domain
1. Edit `components/ReportView.tsx` → `BLOCKED_DOMAINS`
2. Edit `components/ManifestoPage/Index.tsx` → `BLOCKED_DOMAINS`
3. Keep both lists synchronized
4. Test locally, commit, push

---

## Team Context

**Created by:** AI Mindset Labs Community
**Development:** Collaborative with Claude/Windsurf
**Content:** Ray Ivanov, Anca Stavenski, community contributors
**Design:** Swiss Brutalist aesthetic, dark/light modes

**Philosophy:**
This is not just a report - it's a paired map of Machines ↔ Humans, showing the divergence between what machines can do and what humans can integrate. The gap between machine generation and human integration is the defining challenge of our time.

---

## Quick Start for New Team Members

```bash
# Clone repo
git clone https://github.com/eppelas/aim-report.git
cd aim-report

# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser
# Navigate to http://localhost:5173 (or shown port)

# Make changes, test locally

# Build for production
npm run build

# Preview production build
npm run preview
```

**First tasks to get familiar:**
1. Navigate through all pages in browser
2. Try language switcher (EN ↔ RU)
3. Try theme toggle (Dark ↔ Light)
4. Check responsive design (mobile view)
5. Read through `App.tsx` to understand navigation
6. Look at `components/ReportView.tsx` for main shift rendering

---

## Support & Documentation

**Live Site:** https://eppelas.github.io/aim-report/
**GitHub Repo:** https://github.com/eppelas/aim-report
**Issues:** GitHub Issues (if enabled)

**Key Files to Understand:**
- `App.tsx` - Main app logic, navigation, language state
- `components/ReportView.tsx` - Shift rendering, evidence blocks
- `hooks/useShiftsData.ts` - Content loading, language handling
- `hooks/useI18n.ts` - UI translations
- `scripts/parse-content.js` - Multi-language content parser (RU, BY, RO)
- `lib/gsap-config.ts` - Centralized GSAP configuration
- `lib/updateMetaTags.ts` - Dynamic SEO meta tags helper

---

*Document created: 2026-01-22*
*For: AI Mindset Labs Community*
