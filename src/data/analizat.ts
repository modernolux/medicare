export interface AnalysisCategory {
  id: string;
  title: string;
  /* TODO: Lista e 230 analizave do të shtohet këtu sipas kategorive. */
  tests: string[];
}

export const ANALYSIS_CATEGORIES: AnalysisCategory[] = [
  { id: 'hematologji', title: 'Hematologji', tests: [] },
  { id: 'biokimi', title: 'Biokimi', tests: [] },
  { id: 'lipide', title: 'Lipide', tests: [] },
  { id: 'hormone', title: 'Hormone', tests: [] },
  { id: 'markera-tumorale', title: 'Markera tumorale', tests: [] },
  { id: 'imunologji-serologji', title: 'Imunologji dhe Serologji', tests: [] },
  { id: 'mikrobiologji', title: 'Mikrobiologji', tests: [] },
  { id: 'urina-feces', title: 'Urina dhe Feçe', tests: [] },
  { id: 'te-tjera', title: 'Të tjera', tests: [] },
];
