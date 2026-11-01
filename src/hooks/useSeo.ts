import { useEffect } from 'react';
import { CONTACT } from '@/data/contact';
import { LOGO } from '@/data/logo';

interface SeoOptions {
  title: string;
  description: string;
}

export function useSeo({ title, description }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${CONTACT.brandName}`;
    document.title = fullTitle;

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', LOGO);
    setMeta('name', 'twitter:image', LOGO);
  }, [title, description]);
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
