import type { LucideIcon } from 'lucide-react';
import { Ambulance, Bone, Brain, FlaskConical, Microscope, Scan, Stethoscope, Syringe } from 'lucide-react';
import { SPECIALTIES } from '@/data/specialties';

export interface NavChild {
  label: string;
  to: string;
}

export interface NavGroup {
  label: string;
  to?: string;
  children?: NavChild[];
  icon?: LucideIcon;
}

export const MAIN_NAV = [
  { label: 'Medicare', to: '/' },
  { label: 'Mjekët Tanë', to: '/mjeket-tane' },
  { label: 'Shërbimet', to: '/sherbimet' },
  { label: 'Rreth Nesh', to: '/rreth-nesh' },
] as const;

export const SERVICE_MENU: NavGroup[] = [
  {
    label: 'Imazheri / Radiologji',
    icon: Scan,
    children: [
      { label: 'Tomografi e Kompjuterizuar (CT)', to: '/sherbimet/tomografi-kompjuterizuar' },
      { label: 'Radiografi Digitale', to: '/sherbimet/radiografi-digitale' },
      { label: 'Ekografi', to: '/sherbimet/ekografi' },
    ],
  },
  {
    label: 'Konsulta',
    icon: Stethoscope,
    children: SPECIALTIES.map((specialty) => ({
      label: specialty.doctorSpecialty,
      to: `/sherbimet/konsulta/${specialty.slug}`,
    })),
  },
  {
    label: 'Elektrofiziologji',
    icon: Brain,
    children: [
      { label: 'EEG', to: '/sherbimet/elektrofiziologji' },
      { label: 'EEG e Zgjatur Gjumi', to: '/sherbimet/elektrofiziologji' },
    ],
  },
  { label: 'Endoskopi', icon: Microscope, to: '/sherbimet/endoskopi' },
  { label: 'Shërbime Infermierore', icon: Syringe, to: '/sherbimet/sherbime-infermierore' },
  { label: 'Laborator', icon: FlaskConical, to: '/sherbimet/laborator' },
  { label: 'Transport me Ambulancë', icon: Ambulance, to: '/sherbimet/transport-me-ambulance' },
  { label: 'Paisje Ortopedike', icon: Bone, to: '/sherbimet/paisje-ortopedike' },
];

export const FOOTER_SERVICE_LINKS = [
  { label: 'Imazheri / Radiologji', to: '/sherbimet' },
  { label: 'Konsulta', to: '/mjeket-tane' },
  { label: 'Elektrofiziologji', to: '/sherbimet/elektrofiziologji' },
  { label: 'Laborator', to: '/sherbimet/laborator' },
] as const;

export const FOOTER_MAIN_LINKS = [
  { label: 'Medicare', to: '/' },
  { label: 'Mjekët Tanë', to: '/mjeket-tane' },
  { label: 'Rreth Nesh', to: '/rreth-nesh' },
  { label: 'Kontaktoni', to: '/kontakti' },
] as const;
