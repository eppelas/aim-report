# AIM Annual Report 2025

Interactive web experience showcasing 11 Tectonic Shifts in AI across 4 layers: Foundation, Cognition, Interface, and Humanity.

## Features

- **Interactive Landing Animation** - GSAP-powered tectonic shifts visualization
- **11 Detailed Shift Reports** - Each with data, sources, and community voices
- **4 Language Support** - English, Russian, Belarusian, Romanian
- **Responsive Design** - Optimized for desktop and mobile
- **Dark/Light Theme** - Seamless theme switching
- **Keyboard Navigation** - Space, arrows for navigation

## Tech Stack

- **React 18** + TypeScript
- **Vite** - Fast build tool
- **GSAP** + ScrollTrigger - Advanced animations
- **Tailwind CSS** - Styling
- **Markdown** - Content management

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── components/          # React components
│   ├── TectonicShiftsAnimation.tsx  # Landing animation
│   ├── ReportView.tsx              # Shift detail pages
│   ├── NavigationPopUp/            # Index overlay
│   └── ...
├── content/            # Markdown content (shifts, manifesto)
├── public/
│   ├── content/        # Generated JSON from markdown
│   └── i18n/          # Translations
├── hooks/             # Custom React hooks
└── lib/               # Utilities, GSAP config

```

## Content Management

Content is managed via Markdown files in `/content/`:
- `slides.md` - English content
- `slides.ru.md` - Russian content
- `slides.by.md` - Belarusian content
- `slides.ro.md` - Romanian content

Run `npm run build` to parse Markdown → JSON.

## Navigation

- **Space** - Scroll down / Next snap point on landing
- **Arrow Keys** - Navigate between pages
- **Index Button** - Open full navigation overlay
- **Swipe** - Mobile navigation (shift pages only)

## License

© 2025 AI Mindset. All rights reserved.

## Links

- Website: https://aimindset.org
- Telegram: https://t.me/ai_mind_set
- Substack: https://aimindsetspace.substack.com
