import {
  Baby,
  Bone,
  Brain,
  Dna,
  Droplet,
  Droplets,
  Ear,
  FlaskConical,
  Flower2,
  Hand,
  HeartPulse,
  Stethoscope,
  Scan,
  ScanLine,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Specialty {
  slug: string;
  name: string;
  doctorSpecialty: string;
  icon: LucideIcon;
  intro: string;
  services: string[];
}

export const SPECIALTIES: Specialty[] = [
  {
    slug: 'neurologji',
    name: 'Neurologji',
    doctorSpecialty: 'Neurolog',
    icon: Brain,
    intro: 'Konsulta me mjekun neurolog për vlerësimin dhe trajtimin e çrregullimeve të sistemit nervor, të trurit dhe të muskujve.',
    services: ['Konsulta', 'CT dhe EEG'],
  },
  {
    slug: 'pneumologji',
    name: 'Pneumologji',
    doctorSpecialty: 'Pneumolog',
    icon: Wind,
    intro: 'Konsulta me mjekun pneumolog për diagnostikimin dhe monitorimin e sëmundjeve të mushkërive dhe të sistemit respirator.',
    services: ['Grafi', 'CT', 'Spirometri', 'Punksion pulmonar'],
  },
  {
    slug: 'kardiologji',
    name: 'Kardiologji',
    doctorSpecialty: 'Kardiolog',
    icon: HeartPulse,
    intro: 'Konsulta me mjekun kardiolog për vlerësimin e shëndetit të zemrës dhe të sistemit kardiovaskular.',
    services: ['Konsulta', 'Eko zemre (Ekokardiografi)', 'EKG', 'Prova ushtrimore', 'Holter ritmi'],
  },
  {
    slug: 'reumatologji',
    name: 'Reumatologji',
    doctorSpecialty: 'Reumatolog',
    icon: Hand,
    intro: 'Konsulta me mjekun reumatolog për diagnostikimin dhe trajtimin e sëmundjeve reumatike të kyçeve, muskujve dhe indeve lidhëse.',
    services: ['Konsulta dhe grafi të ndryshme'],
  },
  {
    slug: 'ortopedi',
    name: 'Ortopedi',
    doctorSpecialty: 'Ortoped',
    icon: Bone,
    intro: 'Konsulta me mjekun ortoped për problemet e kockave, kyçeve, kurrizit dhe muskujve, me opsione trajtimi dhe mbështetjeje sipas nevojës.',
    services: ['Konsulta', 'Vendosje allçie', 'Injektim kenakort', 'Këpucë ortopedike', 'Suporte të ndryshme'],
  },
  {
    slug: 'gastrohepatologji',
    name: 'Gastrohepatologji',
    doctorSpecialty: 'Gastrohepatolog',
    icon: Stethoscope,
    intro: 'Konsulta me mjekun gastrohepatolog për sëmundjet e stomakut, zorrëve dhe mëlçisë, përfshirë edhe procedurat endoskopike diagnostikuese.',
    services: ['Konsulta', 'Fibroskopi', 'Kolonoskopi', 'Endoskopi', 'Polipektomi'],
  },
  {
    slug: 'urologji',
    name: 'Urologji',
    doctorSpecialty: 'Urolog',
    icon: Droplets,
    intro: 'Konsulta me mjekun urolog për sëmundjet e sistemit urinar dhe të organeve gjenitale mashkullore.',
    services: ['Konsulta', 'Heqje stenti', 'Cistoskopi', 'Marrje biopsie prostate'],
  },
  {
    slug: 'gjinekologji',
    name: 'Gjinekologji',
    doctorSpecialty: 'Gjinekolog',
    icon: Dna,
    intro: 'Konsulta me mjekun gjinekolog për shëndetin e grave në të gjitha etapat e jetës, me ekzaminime preventive dhe diagnostikuese.',
    services: ['Konsulta', 'PAP test', 'Eko transvaginale'],
  },
  {
    slug: 'endokrinologji',
    name: 'Endokrinologji',
    doctorSpecialty: 'Endokrinolog',
    icon: FlaskConical,
    intro: 'Konsulta me mjekun endokrinolog për çrregullimet hormonale dhe metabolike.',
    services: [],
  },
  {
    slug: 'hematologji',
    name: 'Hematologji',
    doctorSpecialty: 'Hematolog',
    icon: Droplet,
    intro: 'Konsulta me mjekun hematolog për sëmundjet e gjakut dhe të organeve hematopoietike.',
    services: [],
  },
  {
    slug: 'orl',
    name: 'ORL',
    doctorSpecialty: 'ORL',
    icon: Ear,
    intro: 'Konsulta me mjekun ORL për sëmundjet e veshit, hundës dhe fytit.',
    services: [],
  },
  {
    slug: 'alergologji',
    name: 'Alergologji',
    doctorSpecialty: 'Alergolog',
    icon: Flower2,
    intro: 'Konsulta me mjekun alergolog për diagnostikimin dhe trajtimin e alergjive.',
    services: [],
  },
  {
    slug: 'pediatri',
    name: 'Pediatri',
    doctorSpecialty: 'Pediater',
    icon: Baby,
    intro: 'Konsulta me mjekun pediater për shëndetin dhe zhvillimin e fëmijëve.',
    services: [],
  },
  {
    slug: 'dermatologji',
    name: 'Dermatologji',
    doctorSpecialty: 'Dermatolog',
    icon: Scan,
    intro: 'Konsulta me mjekun dermatolog për sëmundjet e lëkurës, flokëve dhe thonjve.',
    services: [],
  },
  {
    slug: 'radiologji',
    name: 'Radiologji',
    doctorSpecialty: 'Radiolog',
    icon: ScanLine,
    intro: 'Konsulta me mjekun radiolog për interpretimin e imazheve mjekësore si tomografia, radiografia dhe ekografia.',
    services: [],
  },
];

export function getSpecialtyBySlug(slug: string): Specialty | undefined {
  return SPECIALTIES.find((specialty) => specialty.slug === slug);
}
