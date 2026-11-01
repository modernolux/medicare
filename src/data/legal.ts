export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  sections: LegalSection[];
}

const DRAFT_NOTE = 'DRAFT: Ky tekst është një model dhe duhet të rishikohet nga një jurist para publikimit.';

export const TERMS_DOCUMENT: LegalDocument = {
  title: 'Rregullat dhe Kushtet',
  sections: [
    { heading: 'Përdorimi i faqes', paragraphs: [DRAFT_NOTE, 'Ky sajt ofron informacion mbi shërbimet e Medicare Qendër Diagnostike Durrës dhe mundësi për rezervimin e takimeve. Përdoruesi pranon ta përdorë sajtin në mënyrë të ligjshme.'] },
    { heading: 'Rezervimi i takimeve', paragraphs: ['TODO: Përshkruani procesin e konfirmimit të takimit, politikën e anulimit dhe të vonesave.'] },
    { heading: 'Informacioni mjekësor', paragraphs: ['Informacioni në këtë sajt nuk zëvendëson vlerësimin e drejtpërdrejtë nga mjeku. Për çdo shqetësim shëndetësor, kontaktoni mjekun.'] },
    { heading: 'Ndryshimet', paragraphs: ['TODO: Përcaktoni si do të njoftohen përdoruesit për ndryshimet e kushteve.'] },
  ],
};

export const PRIVACY_DOCUMENT: LegalDocument = {
  title: 'Politikat e Privatësisë',
  sections: [
    { heading: 'Të dhënat që mblidhen', paragraphs: [DRAFT_NOTE, 'Kur plotësoni formularin e rezervimit ose të kontaktit, mblidhen emri, numri i telefonit, email-i dhe mesazhi juaj, vetëm për qëllimin e shërbimit.'] },
    { heading: 'Përdorimi i të dhënave', paragraphs: ['TODO: Përshkruani qëllimet e përpunimit dhe bazën ligjore sipas legjislacionit shqiptar.'] },
    { heading: 'Ruajtja dhe siguria', paragraphs: ['TODO: Përshkruani periudhën e ruajtjes së të dhënave dhe masat e sigurisë.'] },
    { heading: 'Të drejtat tuaja', paragraphs: ['Mund të kërkoni akses, korrigjim ose fshirje të të dhënave tuaja duke na shkruar në email-in e qendrës.'] },
  ],
};
