import waitingRoom from '@/assets/images/WhatsApp_Image_2026-10-27_at_12.26.40_PM.jpeg';
import ultrasound from '@/assets/images/WhatsApp_Image_2026-10-27_a.jpeg';
import facade from '@/assets/images/WhatsApp_Image_2026-10-27_at_12.26.40_P.jpeg';
import ambulance from '@/assets/images/WhatsApp_Image_2026-10-27_at_12.26.40.jpeg';

/* Clinic photos come from src/assets/images. Stock placeholders (Pexels) can be swapped by editing these URLs. */
export const IMAGES = {
  hero: 'https://res.cloudinary.com/l5tyqnmr/image/upload/v1793467998/Gemini_Generated_Image_21ysmd21ysmd21ys.jpg',
  aboutPrimary: ultrasound,
  aboutSecondary: waitingRoom,
  aboutSlides: [waitingRoom, ultrasound],
  clinicFacade: facade,
  ambulance,
  placeholderCt: 'https://images.pexels.com/photos/13176452/pexels-photo-13176452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  placeholderXray: 'https://images.pexels.com/photos/7617612/pexels-photo-7617612.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  placeholderEeg: 'https://images.pexels.com/photos/19034027/pexels-photo-19034027.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  placeholderEndoscopy: 'https://images.pexels.com/photos/30964336/pexels-photo-30964336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  placeholderNurse: 'https://images.pexels.com/photos/5207032/pexels-photo-5207032.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  placeholderLab: 'https://images.pexels.com/photos/4047146/pexels-photo-4047146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  placeholderOrtho: 'https://images.pexels.com/photos/7446986/pexels-photo-7446986.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  placeholderConsult: 'https://images.pexels.com/photos/7579827/pexels-photo-7579827.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
} as const;
