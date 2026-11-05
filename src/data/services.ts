import { Activity, Ambulance, Award, Bone, Brain, FlaskConical, House, Microscope, Radiation, Scan, Stethoscope, Syringe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { IMAGES } from '@/data/images';

export interface Service {
  slug: string;
  path: string;
  title: string;
  cardText: string;
  intro: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  items: string[];
}

export const SERVICES: Service[] = [
  {
    slug: 'tomografi-kompjuterizuar',
    path: '/sherbimet/tomografi-kompjuterizuar',
    title: 'Tomografi e Kompjuterizuar (CT)',
    cardText: 'Ekzaminime CT me imazhe të detajuara të trupit, me ose pa kontrast.',
    intro:
      'Tomografia e kompjuterizuar (CT) është një metodë imazherie mjekësore që krijon imazhe të detajuara të trupit në prerje të hollë. Ajo ndihmon mjekët të vlerësojnë me saktësi organet, indet dhe strukturat e brendshme. Ekzaminimet kryhen me aparaturë moderne dhe nga staf mjekësor i trajnuar.',
    image: IMAGES.placeholderCt,
    imageAlt: 'Aparat tomografie i kompjuterizuar në një dhomë ekzaminimi',
    icon: Scan,
    items: [
      'CT koke',
      'CT koke me kontrast',
      'CT torakale',
      'CT torakale me kontrast',
      'CT abdominale',
      'CT abdominale me kontrast',
      'CT pelvis',
      'CT ekstremiteteve',
      'CT kolonës vertebrale',
      'CT kolonës vertebrale një regjion',
      'URO CT',
    ],
  },
  {
    slug: 'radiografi-digitale',
    path: '/sherbimet/radiografi-digitale',
    title: 'Radiografi Digitale',
    cardText: 'Radiografi digjitale me rezultate të menjëhershme për kocka dhe organe.',
    intro:
      'Radiografia digjitale është një metodë e shpejtë dhe e saktë për vizualizimin e strukturave kockore dhe të organeve të brendshme. Imazhet shfaqen menjëherë në ekran, duke lehtësuar vlerësimin mjekësor. Ekzaminimet kryhen me aparaturë digjitale dhe me staf mjekësor të specializuar.',
    image: IMAGES.placeholderXray,
    imageAlt: 'Pajisje radiografie digjitale në një klinikë',
    icon: Radiation,
    items: [
      'Panoramex',
      'Ro pulmon',
      'Ro thorax',
      'Ro koke',
      'Ro sinuseve',
      'Ro cervikale',
      'Ro scapulo humeral',
      'Ro cubiti',
      'Ro radio carpal',
      'Ro mani',
      'Ro lumbare',
      'Ro pelvis',
      'Ro coxofemorale',
      'Ro genu',
      'Ro cruris',
      'Ro talocrural',
      'Ro pedis',
      'Ro ezofagu me sulfat bariumi',
    ],
  },
  {
    slug: 'ekografi',
    path: '/sherbimet/ekografi',
    title: 'Ekografi',
    cardText: 'Ekzaminime ekografike jo-invazive për organet e brendshme dhe indet.',
    intro:
      'Ekografia është një ekzaminim jo invaziv që përdor valët e ultrazërit për të parë organet e brendshme në kohë reale. Është një metodë e sigurt dhe e pa dhimbshme, e përdorur gjerësisht në diagnostikë. Ekzaminimet kryhen nga mjekë radiologë dhe specialistë me përvojë.',
    image: IMAGES.aboutPrimary,
    imageAlt: 'Mjek duke kryer një ekzaminim ekografik me aparaturë ekografike',
    icon: Activity,
    items: [
      'Eko abdominale',
      'Eko tiroide',
      'Eko doppler e karotideve',
      'Eko doppler e ekstremiteteve',
      'Eko koksofemorale',
      'Eko e indeve të buta',
      'Eko testeve',
      'Eko mamme',
      'Eko transrektale',
      'Eko zemre',
      'Eko obstetrike',
      'Eko transvaginale',
      'Eko prostatës',
    ],
  },
  {
    slug: 'elektrofiziologji',
    path: '/sherbimet/elektrofiziologji',
    title: 'Elektrofiziologji',
    cardText: 'Regjistrim i aktivitetit elektrik të trurit me EEG dhe EEG të zgjatur gjumi.',
    intro:
      'Elektrofiziologjia përfshin regjistrimin e aktivitetit elektrik të trurit dhe të sistemit nervor. Ekzaminimet EEG ndihmojnë mjekët në vlerësimin e funksionit neurologjik. Procedurat kryhen në mënyrë të sigurt dhe me udhëzime të qarta për pacientin.',
    image: IMAGES.placeholderEeg,
    imageAlt: 'Ekzaminim EEG i aktivitetit të trurit',
    icon: Brain,
    items: ['EEG', 'EEG e zgjatur gjumi'],
  },
  {
    slug: 'endoskopi',
    path: '/sherbimet/endoskopi',
    title: 'Endoskopi',
    cardText: 'Gastroskopi, kolonoskopi, cistoskopi dhe procedura të tjera endoskopike.',
    intro:
      'Endoskopia është një procedurë që lejon vizualizimin e brendshëm të organeve përmes një pajisjeje të hollë me kamerë. Përdoret për diagnostikim dhe, kur është e nevojshme, për marrjen e mostrave për analiza. Procedurat kryhen nga specialistë të fushës.',
    image: IMAGES.placeholderEndoscopy,
    imageAlt: 'Procedurë endoskopike në sallën e operacionit',
    icon: Microscope,
    items: ['Gastroskopi', 'Kolonoskopi', 'Cistoskopi', 'Heqje stendi', 'Marrje biopsie prostate'],
  },
  {
    slug: 'sherbime-infermierore',
    path: '/sherbimet/sherbime-infermierore',
    title: 'Shërbime Infermierore',
    cardText: 'Injeksione, terapi, kateterizim, perfuzion dhe kujdes infermieror në shtëpi.',
    intro:
      'Shërbimet infermierore mbështesin trajtimin e pacientit me kujdes profesional, si në qendër ashtu edhe në shtëpi. Ofrojmë procedura bazë dhe të avancuara, sipas urdhrit të mjekut. Stafi ynë trajnohet për kujdes të sigurt dhe të dhembshur.',
    image: IMAGES.placeholderNurse,
    imageAlt: 'Infermiere duke kryer një injeksion te pacienti',
    icon: Syringe,
    items: [
      'Injeksione',
      'Terapi hekuri',
      'Terapi + medikamente',
      'Vendosje kateteri',
      'Terapi në shtëpi',
      'Perfuzion',
      'Vendosje sondë nazogastrike',
      'Mjekim plage',
      'Kujdesje infermierore post operatore',
      'Oksigjenoterapi në shtëpi',
      'EKG në shtëpi',
    ],
  },
  {
    slug: 'laborator',
    path: '/sherbimet/laborator',
    title: 'Laborator',
    cardText: 'Analiza biokimike, hormonale dhe mikrobiologjike me kërkim të shpejtë.',
    intro:
      'Laboratori ynë ofron analiza biokimike, hormonale dhe mikrobiologjike për mbështetjen e diagnostikimit dhe monitorimit të shëndetit. Kërkoni listën e plotë të analizave më poshtë dhe na kontaktoni për çdo pyetje.',
    image: IMAGES.placeholderLab,
    imageAlt: 'Tuba gjaku të gatshme për analizë në laborator',
    icon: FlaskConical,
    items: [],
  },
  {
    slug: 'transport-me-ambulance',
    path: '/sherbimet/transport-me-ambulance',
    title: 'Transport me Ambulancë',
    cardText: 'Transport i sigurt brenda vendit dhe ndërkombëtar, me staf mjekësor.',
    intro:
      'Shërbimi ynë i transportit me ambulancë mundëson lëvizjen e sigurt të pacientëve brenda vendit dhe jashtë vendit. Ambulancat janë të pajisura dhe shoqërohen nga staf mjekësor kur kërkohet. Na kontaktoni për të planifikuar transportin tuaj.',
    image: IMAGES.ambulance,
    imageAlt: 'Ambulancat e Medicare para qendrës',
    icon: Ambulance,
    items: ['Transport brenda vendit', 'Transport ndërkombëtar jashtë vendit me staf mjekësor'],
  },
  {
    slug: 'vizita-ne-shtepi',
    path: '/sherbimet/vizita-ne-shtepi',
    title: 'Vizita në shtëpi',
    cardText: 'Mjek dhe infermier në shtëpinë tuaj.',
    subtitle: 'Mjek dhe infermier në shtëpinë tuaj',
    intro:
      'Ofrojmë vizita me mjek dhe shërbime infermierore në shtëpinë tuaj, për pacientët që nuk mund të vijnë në qendër. Për të rezervuar një vizitë, na telefononi ose na shkruani në WhatsApp.',
    image: IMAGES.placeholderNurse,
    imageAlt: 'Mjek dhe infermier duke ofruar kujdes në shtëpi',
    icon: House,
    items: [],
  },
  {
    slug: 'paisje-ortopedike',
    path: '/sherbimet/paisje-ortopedike',
    title: 'Paisje Ortopedike',
    cardText: 'Allçi, këpucë ortopedike, suporte dhe kenakort.',
    intro:
      'Paisjet ortopedike ndihmojnë në mbështetjen, stabilizimin dhe rehabilitimin e pacientëve me probleme të kockave, kyçeve dhe muskujve. Ofrojmë vendosje allçie, këpucë ortopedike dhe suporte të ndryshme sipas nevojës së secilit pacient.',
    image: IMAGES.placeholderOrtho,
    imageAlt: 'Mjek ortoped duke vlerësuar gjendjen e këmbës së pacientit',
    icon: Bone,
    items: ['Vendosje allçie', 'Këpucë ortopedike', 'Suporte të ndryshme', 'Kenakort'],
  },
  {
    slug: 'konsulta',
    path: '/mjeket-tane',
    title: 'Konsulta me Mjekë Specialistë',
    cardText: 'Konsulta në gjashtëmbëdhjetë specialitete mjekësore me mjekët tanë.',
    intro:
      'Konsultat me mjekë specialistë ofrohen në fusha të ndryshme mjekësore. Çdo konsultë përfshin vlerësimin e gjendjes shëndetësore dhe udhëzime për vazhdimin e kujdesit. Zgjidhni specialitetin e duhur dhe rezervoni takimin tuaj.',
    image: IMAGES.placeholderConsult,
    imageAlt: 'Konsultë me mjekun specialist në klinikë',
    icon: Stethoscope,
    items: [],
  },
];

export const SERVICE_PAGE_HIGHLIGHTS = [
  { title: 'Staf mjekësor profesional', icon: Stethoscope },
  { title: 'Aparatura moderne', icon: Scan },
  { title: 'Specialistë mjekësorë më të mirë në vend', icon: Award },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
