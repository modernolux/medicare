import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CONTACT, FULL_ADDRESS } from '@/data/contact';
import { CLINIC_LAT, CLINIC_LNG } from '@/data/location';
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/site';

interface SeoOptions {
  title: string;
  description: string;
  noindex?: boolean;
  image?: string;
  structuredData?: Record<string, unknown>;
}

export function useSeo({ title, description, noindex = false, image = DEFAULT_OG_IMAGE, structuredData }: SeoOptions) {
  const { pathname } = useLocation();
  useEffect(() => {
    const suffix = ` | ${CONTACT.brandName}`;
    const fullTitle = `${title.slice(0, Math.max(1, 60 - suffix.length))}${suffix}`;
    const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
    const normalizedDescription = (description.length < 110 ? `${description} Medicare Qendër Diagnostike Durrës dhe informacioni i kontaktit.` : description).slice(0, 155);
    document.documentElement.lang = 'sq';
    document.title = fullTitle;
    setMeta('name', 'description', normalizedDescription);
    setMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', normalizedDescription);
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
    const clinicId = `${SITE_URL}/#clinic`;
    const clinic: Record<string, unknown> = { '@type': 'MedicalClinic', '@id': clinicId, name: 'Medicare Qendër Diagnostike', url: SITE_URL, logo: `${SITE_URL}/logo-v3.png`, image: `${SITE_URL}/logo-og.png`, telephone: '+355694334944', address: { '@type': 'PostalAddress', streetAddress: `${CONTACT.addressStreet} (${CONTACT.addressNote})`, addressLocality: 'Durrës', addressCountry: 'AL' }, openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '20:00' }], sameAs: [CONTACT.facebookUrl, CONTACT.instagramUrl], geo: { '@type': 'GeoCoordinates', latitude: CLINIC_LAT, longitude: CLINIC_LNG } };
    const graph: Record<string, unknown>[] = [clinic];
    if (structuredData) graph.push(structuredData);
    if (pathname !== '/') graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Kreu', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: title, item: canonical }] });
    setJsonLd({ '@context': 'https://schema.org', '@graph': graph });
  }, [description, image, noindex, pathname, structuredData, title]);
}

function setMeta(attr: 'name' | 'property', key: string, content: string) { let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`); if (!element) { element = document.createElement('meta'); element.setAttribute(attr, key); document.head.appendChild(element); } element.setAttribute('content', content); }
function setJsonLd(value: Record<string, unknown>) { let element = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]'); if (!element) { element = document.createElement('script'); element.type = 'application/ld+json'; element.dataset.seoJsonld = 'true'; document.head.appendChild(element); } element.textContent = JSON.stringify(value); }
