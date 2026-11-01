export const CONTACT = {
  brandName: 'Medicare Qendër Diagnostike Durrës',
  phone: '0694334944',
  phoneHref: 'tel:+355694334944',
  whatsappNumber: '355694334944',
  email: 'medicaredurres2@gmail.com',
  addressStreet: 'Rr. "Aleksander Goga", Nr. 231',
  addressNote: 'pranë Spitalit Durrës',
  addressCity: 'Durrës, Shqipëri',
  hours: 'E hënë - E shtunë: 08:00 - 20:00',
  facebookUrl: 'https://www.facebook.com/medicare.dr/',
  instagramUrl: 'https://www.instagram.com/medicaredurres',
} as const;

export const FULL_ADDRESS = `${CONTACT.addressStreet} (${CONTACT.addressNote}), ${CONTACT.addressCity}`;
