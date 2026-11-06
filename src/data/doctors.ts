export interface Doctor {
  name: string;
  specialty: string;
  title?: string;
}

export const DOCTORS: Doctor[] = [
  { name: 'Indrit Kellici', specialty: 'Gastrohepatolog' }, { name: 'Ornela Kalaja', specialty: 'Pneumolog' }, { name: 'Edlira Ndreu', specialty: 'Pneumolog' }, { name: 'Edi Vafeklliu', specialty: 'Pneumolog' }, { name: 'Sotir Xhunga', specialty: 'Kardiolog' }, { name: 'Arlind Maliqati', specialty: 'Ortoped' }, { name: 'Erenato Bushi', specialty: 'Ortoped' }, { name: 'Taulant Bita', specialty: 'Ortoped' }, { name: 'Megi Legbello', specialty: 'Endokrinolog' }, { name: 'Ira Xhemollari', specialty: 'Endokrinolog' }, { name: 'Arjeta Cyrbja', specialty: 'Hematolog' }, { name: 'Elona Kodra', specialty: 'ORL' }, { name: 'Shkelqim Ferko', specialty: 'Urolog' }, { name: 'Gent Kavaja', specialty: 'Reumatolog' }, { name: 'Besmir Muca', specialty: 'Reumatolog' }, { name: 'Selami Balla', specialty: 'Reumatolog' }, { name: 'Isid Xhura', specialty: 'Neurolog' }, { name: 'Endri Shehu', specialty: 'Neurolog' }, { name: 'Dorina Qerimi', specialty: 'Alergolog' }, { name: 'Silvana Kau', specialty: 'Pediater' }, { name: 'Malbora Jani', specialty: 'Pediater' }, { name: 'Ermira Demiraj', specialty: 'Dermatolog' }, { name: 'Elton Ceka', specialty: 'Radiolog' }, { name: 'Armando Mersini', specialty: 'Radiolog' }, { name: 'Blerim Bucpapaj', specialty: 'Radiolog' }, { name: 'Ivirt Shkreli', specialty: 'Gjinekolog' },
];

export function getDoctorDisplayName(doctor: Doctor): string { return doctor.title ? `${doctor.title} ${doctor.name}` : doctor.name; }
export function getDoctorSlug(doctor: Doctor): string { return doctor.name.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
export function getDoctorBySlug(slug: string): Doctor | undefined { return DOCTORS.find((doctor) => getDoctorSlug(doctor) === slug); }
