import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CONTACT } from '@/data/contact';
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/site';

interface SeoOptions {
  title: string;
  description: string;
  noindex?: boolean;
  image?: string;
}

export function useSeo({ title, description, noindex = false, image = DEFAULT_OG_IMAGE }: SeoOptions) {
  const { pathname } = useLocation();
  useEffect(() => {
    const suffix = ` | ${CONTACT.brandName}`;
    const fullTitle = `${title.slice(0, Math.max(1, 60 - suffix.length))}${suffix}`;
    const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
    const normalizedDescription = description.length < 110 ? `${description} Medicare Qendër Diagnostike Durrës dhe informacioni i kontaktit.` : description;
    document.documentElement.lang = 'sq';
    document.title = fullTitle;
    setMeta('name', 'description', normalizedDescription.slice(0, 155));
    setMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', normalizedDescription.slice(0, 155));
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', CONTACT.brandName);
    setMeta('property', 'og:locale', 'sq_AL');
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:image', image);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = canonical;
  }, [description, image, noindex, pathname, title]);
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) { element = document.createElement('meta'); element.setAttribute(attr, key); document.head.appendChild(element); }
  element.setAttribute('content', content);
}
