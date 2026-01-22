interface MetaTagsConfig {
  title: string;
  description: string;
  url?: string;
}

export function updateMetaTags(config: MetaTagsConfig) {
  const baseUrl = 'https://eppelas.github.io/aim-report/';
  const url = config.url || baseUrl;

  // Update document title
  document.title = config.title;

  // Update or create meta description
  updateMetaTag('name', 'description', config.description);

  // Update Open Graph tags
  updateMetaTag('property', 'og:title', config.title);
  updateMetaTag('property', 'og:description', config.description);
  updateMetaTag('property', 'og:url', url);

  // Update Twitter Card tags
  updateMetaTag('property', 'twitter:title', config.title);
  updateMetaTag('property', 'twitter:description', config.description);
  updateMetaTag('property', 'twitter:url', url);
}

function updateMetaTag(attr: string, attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${attrValue}"]`) as HTMLMetaElement;
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attr, attrValue);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
}
