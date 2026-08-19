import { useEffect } from 'react';

export interface SeoMetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'service';
  keywords?: string[];
}

/**
 * Hook para gestionar meta tags dinámicos para SEO, Open Graph y Twitter Cards.
 * Se ejecuta solo en el cliente (efecto secundario).
 */
export function useSeoMeta({ 
  title, 
  description, 
  canonical, 
  ogImage = '/og-image.jpg', 
  type = 'website',
  keywords = []
}: SeoMetaProps) {
  useEffect(() => {
    const baseUrl = 'https://www.farutech.com';
    const fullCanonical = canonical ? `${baseUrl}${canonical}` : window.location.href;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

    // Helper para actualizar o crear meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Título
    document.title = `${title} | FaruTech`;
    
    // Meta básicos
    setMeta('description', description);
    setMeta('keywords', keywords.join(', '));
    setMeta('author', 'FaruTech');
    
    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonical);

    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:url', fullCanonical, true);
    setMeta('og:image', fullOgImage, true);
    setMeta('og:site_name', 'FaruTech', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', fullOgImage);

    // Limpieza al desmontar (opcional, pero buena práctica)
    return () => {
      // No limpiamos aquí para evitar parpadeos en navegación SPA rápida,
      // el siguiente efecto lo sobrescribirá.
    };
  }, [title, description, canonical, ogImage, type, keywords]);
}
