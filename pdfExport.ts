import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export type PdfExportProgress = { current: number; total: number };

export type PdfExportOptions = {
  filename: string;
  pixelRatio?: number;
  onProgress?: (p: PdfExportProgress) => void;
};

const PDF_W_PT = 960; // 13.333in × 72pt
const PDF_H_PT = 540; // 7.5in × 72pt

// Delay helper for ensuring animations/fonts are settled
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Pre-convert images to data URLs to avoid CORS issues
const preloadImages = async (container: HTMLElement): Promise<void> => {
  const images = container.querySelectorAll<HTMLImageElement>('img');

  await Promise.all(
    Array.from(images).map(async (img) => {
      // Skip if already a data URL or blob URL
      if (img.src.startsWith('data:') || img.src.startsWith('blob:')) return;
      // Skip if it's a local asset (same origin)
      if (img.src.startsWith(window.location.origin)) return;

      try {
        // Try to convert external images to data URLs
        const response = await fetch(img.src, { mode: 'cors' });
        const blob = await response.blob();
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
        img.src = dataUrl;
      } catch {
        // If CORS fails, leave the image as is (it may render as blank)
        console.warn(`Could not preload image: ${img.src}`);
      }
    })
  );
};

export async function exportElementsToPdf(pages: HTMLElement[], options: PdfExportOptions): Promise<void> {
  const { filename, onProgress } = options;
  const pixelRatio = options.pixelRatio ?? 2; // Higher ratio for sharper PDF

  // Ensure fonts are ready (prevents fallback font renders in exports)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fonts = (document as any).fonts;
    if (fonts?.ready) await fonts.ready;
    // Extra delay to ensure fonts are fully rendered and layout settles
    await delay(200);
  } catch {
    // no-op
  }

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: [PDF_W_PT, PDF_H_PT],
    compress: true,
  });

  for (let i = 0; i < pages.length; i += 1) {
    onProgress?.({ current: i + 1, total: pages.length });

    // Delay between slides for DOM stability and rendering
    await delay(100);

    // Pre-load external images to avoid CORS issues
    try {
      await preloadImages(pages[i]);
    } catch {
      // Continue even if preloading fails
    }

    // Get the slide's background color more reliably
    // Check the actual computed style or look for dark class patterns
    const computedBg = getComputedStyle(pages[i]).backgroundColor;
    const hasDarkBg = pages[i].querySelector('[class*="bg-neutral-900"]') !== null ||
                      pages[i].querySelector('[class*="bg-black"]') !== null ||
                      pages[i].classList.contains('bg-neutral-900') ||
                      pages[i].classList.contains('bg-black');

    // Parse computed background if available
    let bgColor = '#ffffff';
    if (hasDarkBg) {
      bgColor = '#171717';
    } else if (computedBg && computedBg !== 'rgba(0, 0, 0, 0)' && computedBg !== 'transparent') {
      bgColor = computedBg;
    }

    // For single slide export, give extra time for rendering
    if (pages.length === 1) {
      await delay(300);
    }

    const dataUrl = await toPng(pages[i], {
      pixelRatio,
      backgroundColor: bgColor,
      cacheBust: true,
      skipFonts: false,
      // Include pseudo-elements and ensure all styles are captured
      includeQueryParams: true,
      // Better image handling
      fetchRequestInit: {
        mode: 'cors',
        credentials: 'same-origin',
      },
      // Filter out problematic elements
      filter: (node: HTMLElement) => {
        if (node.tagName === 'LINK') {
          const href = node.getAttribute('href') || '';
          if (href.includes('fonts.googleapis.com')) {
            return false; // Skip Google Fonts links (we embed fonts locally)
          }
        }
        // Skip motion elements that might be mid-animation
        if (node.classList?.contains('animate-bounce')) {
          return false;
        }
        return true;
      },
    });

    if (i > 0) pdf.addPage();
    pdf.addImage(dataUrl, 'PNG', 0, 0, PDF_W_PT, PDF_H_PT, undefined, 'FAST');
  }

  pdf.save(filename);
}


