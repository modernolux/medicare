import { FlaskConical } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { SPECIALTIES } from '@/data/specialties';

export interface ServiceHubSearchItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const serviceSearchItems = SERVICES.flatMap((service) => [
  { label: service.title, to: service.path, icon: service.icon },
  ...service.items.map((item) => ({ label: item, to: service.path, icon: service.icon })),
]);

export const SERVICE_HUB_SEARCH_ITEMS: ServiceHubSearchItem[] = [
  ...serviceSearchItems,
  { label: 'Analiza', to: '/sherbimet/laborator', icon: FlaskConical },
  ...SPECIALTIES.map((specialty) => ({
    label: `Konsultë ${specialty.name}`,
    to: `/sherbimet/konsulta/${specialty.slug}`,
    icon: specialty.icon,
  })),
];
