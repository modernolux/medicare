export const GOOGLE_REVIEWS_CONFIG = {
  count: 37,
  url: 'https://maps.app.goo.gl/9kvmrK54yD8Qbknt5',
};

export interface Testimonial {
  name: string;
  text: string;
  stars: number;
  timeLabel: string;
  published: boolean;
  order: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Erogen Llukaj',
    text: 'In regard to the services offered by "Medicare" Clinic in the city of Durres, I would say they are the best in town. Also, the staff was very respectable and professional. If you ever feel the need for a professional well trained staff and the best services, I would highly recommend it.',
    stars: 5,
    timeLabel: '',
    published: true,
    order: 1,
  },
  {
    name: 'Ervis Xhafa',
    text: 'Super Staff Profesional.',
    stars: 5,
    timeLabel: '',
    published: true,
    order: 2,
  },
  {
    name: 'Andreina Pirjasi',
    text: 'The best and fastest service.',
    stars: 5,
    timeLabel: '',
    published: true,
    order: 3,
  },
  {
    name: 'Liljana Isha',
    text: 'Medicare Durres is the best diagnostic center in Durres for both professionalism and care and dedication to each patient.',
    stars: 5,
    timeLabel: '',
    published: true,
    order: 4,
  },
];
