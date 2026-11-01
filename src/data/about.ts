import { Award, Heart, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const MISSION_TEXT =
  'Të ofrojmë kujdes shëndetësor profesional, të sigurt dhe të besueshëm, duke vendosur mirëqenien e pacientit në qendër të çdo shërbimi. Me përkushtim, humanizëm dhe standarde të larta profesionale, Medicare Klinik synon të jetë pranë jush, kudo që keni nevojë për kujdes mjekësor.';

/* TODO: Rishikoni tekstin e "Vizionit" përpara publikimit. */
export const VISION_TEXT =
  'Të jemi qendra diagnostikuese dhe shërbimi mjekësor më i besuar në Durrës, duke sjellë kujdes cilësor, të aksesueshëm dhe me shpejtësi për çdo familje.';

export const ABOUT_INTRO =
  'E themeluar në vitin 2003 në qytetin e Durrësit, Medicare Klinik ka ndërtuar ndër vite një histori të rëndësishme në fushën e shërbimeve shëndetësore, duke u bërë një emër i njohur për pacientët që kërkojnë kujdes mjekësor profesional dhe të besueshëm. Një nga momentet më të rëndësishme në historinë tonë ishte prezantimi i skanerit të parë në Durrës, një hap i rëndësishëm në zhvillimin e shërbimeve diagnostikuese dhe në përmirësimin e mundësive për ekzaminime mjekësore në qytet. Gjatë gjithë këtyre viteve, Medicare Klinik ka vijuar të zhvillohet, duke investuar në përvojën profesionale, përkushtimin dhe bashkëpunimin me staf të specializuar, me synimin për t\'u përgjigjur sa më mirë nevojave të pacientëve. Sot, ne synojmë të ofrojmë një gamë të gjerë shërbimesh mjekësore, duke bashkuar përvojën shumëvjeçare me përkushtimin ndaj cilësisë dhe kujdesit për çdo pacient. Për ne, çdo pacient është në qendër të punës sonë. Besimi i ndërtuar ndër vite na motivon të vazhdojmë përpara, duke ruajtur vlerat tona dhe duke synuar standarde gjithnjë e më të larta në shërbimin shëndetësor.';

export interface HighlightItem {
  title: string;
  text: string;
  icon: LucideIcon;
}

export const ABOUT_HIGHLIGHTS: HighlightItem[] = [
  {
    title: 'Traditë dhe përvojë ndër vite',
    text: 'Me një histori të gjatë në Durrës, kemi ndërtuar marrëdhënie besimi me pacientët tanë, duke e vendosur kujdesin shëndetësor dhe përgjegjësinë profesionale në qendër të punës sonë.',
    icon: Award,
  },
  {
    title: 'Kujdes profesional dhe njerëzor',
    text: 'Çdo pacient është prioritet për ne. Synojmë të ofrojmë shërbim me përkushtim, korrektësi dhe vëmendje ndaj nevojave individuale të secilit.',
    icon: Heart,
  },
  {
    title: 'Shërbim mjekësor brenda dhe jashtë vendit',
    text: 'Jemi pranë pacientëve tanë me shërbime mjekësore dhe staf të specializuar për t\'i mbështetur sipas nevojave të tyre, si në Shqipëri, ashtu edhe jashtë saj.',
    icon: Shield,
  },
];
