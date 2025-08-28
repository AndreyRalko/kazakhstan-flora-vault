import adonisVernalis from '@/assets/plants/adonis-vernalis.jpg';
import tulipaSchrenkii from '@/assets/plants/tulipa-schrenkii.jpg';
import irisRuthenica from '@/assets/plants/iris-ruthenica.jpg';
import stipaPennata from '@/assets/plants/stipa-pennata.jpg';
import papaverRhoeas from '@/assets/plants/papaver-rhoeas.jpg';

export interface Plant {
  id: string;
  scientificName: string;
  commonName: string;
  kazakhName: string;
  family: string;
  description: string;
  habitat: string;
  region: string[];
  bloomingPeriod: string;
  status: 'common' | 'rare' | 'endangered' | 'protected';
  image: string;
  uses?: string;
  characteristics: string[];
}

export const plants: Plant[] = [
  {
    id: 'adonis-vernalis',
    scientificName: 'Adonis vernalis',
    commonName: 'Spring Adonis',
    kazakhName: 'Көктемгі адонис',
    family: 'Ranunculaceae',
    description: 'Многолетнее травянистое растение с яркими желтыми цветками. Один из самых красивых первоцветов казахстанских степей.',
    habitat: 'Степные склоны, луга, лесные опушки',
    region: ['Северный Казахстан', 'Центральный Казахстан', 'Восточный Казахстан'],
    bloomingPeriod: 'Апрель - Май',
    status: 'rare',
    image: adonisVernalis,
    uses: 'Лекарственное растение, используется в народной медицине',
    characteristics: [
      'Высота: 20-40 см',
      'Цветы: ярко-желтые, 4-6 см в диаметре',
      'Листья: многократно перисто-рассеченные',
      'Плод: многоорешек'
    ]
  },
  {
    id: 'tulipa-schrenkii',
    scientificName: 'Tulipa schrenkii',
    commonName: "Schrenk's Tulip",
    kazakhName: 'Шренк қызғалдағы',
    family: 'Liliaceae',
    description: 'Дикий тюльпан с ярко-красными цветками, эндемик степей Казахстана. Символ весенней степи.',
    habitat: 'Степи, полупустыни, солонцеватые луга',
    region: ['Западный Казахстан', 'Мангистау', 'Атырау', 'Актобе'],
    bloomingPeriod: 'Март - Апрель',
    status: 'protected',
    image: tulipaSchrenkii,
    uses: 'Декоративное растение, охраняется государством',
    characteristics: [
      'Высота: 15-25 см',
      'Цветы: красные с темным дном',
      'Листья: сизо-зеленые, широколанцетные',
      'Луковица: яйцевидная, до 3 см'
    ]
  },
  {
    id: 'iris-ruthenica',
    scientificName: 'Iris ruthenica',
    commonName: 'Russian Iris',
    kazakhName: 'Орыс касатигі',
    family: 'Iridaceae',
    description: 'Изящный ирис с фиолетово-синими цветками. Украшает степные просторы своими элегантными соцветиями.',
    habitat: 'Степи, луга, опушки березовых колков',
    region: ['Северный Казахстан', 'Костанай', 'Акмолинская область'],
    bloomingPeriod: 'Май - Июнь',
    status: 'common',
    image: irisRuthenica,
    uses: 'Декоративное и медоносное растение',
    characteristics: [
      'Высота: 30-50 см',
      'Цветы: фиолетово-синие с желтыми пятнами',
      'Листья: мечевидные, узкие',
      'Корневище: ползучее, ветвистое'
    ]
  },
  {
    id: 'stipa-pennata',
    scientificName: 'Stipa pennata',
    commonName: 'Feather Grass',
    kazakhName: 'Жүнді ақ шөп',
    family: 'Poaceae',
    description: 'Символ казахстанских степей - многолетний злак с красивыми перистыми остями. Важный компонент степных экосистем.',
    habitat: 'Сухие степи, каменистые склоны, полупустыни',
    region: ['Центральный Казахстан', 'Южный Казахстан', 'Западный Казахстан', 'Северный Казахстан'],
    bloomingPeriod: 'Май - Июнь',
    status: 'common',
    image: stipaPennata,
    uses: 'Кормовое растение, используется в декоративных целях',
    characteristics: [
      'Высота: 60-80 см',
      'Соцветие: метелка с перистыми остями',
      'Листья: узколинейные, жесткие',
      'Корневая система: мощная, глубокая'
    ]
  },
  {
    id: 'papaver-rhoeas',
    scientificName: 'Papaver rhoeas',
    commonName: 'Corn Poppy',
    kazakhName: 'Қызыл көкнәр',
    family: 'Papaveraceae',
    description: 'Яркий однолетний мак с алыми цветками. Часто встречается в посевах и на нарушенных почвах по всему Казахстану.',
    habitat: 'Поля, обочины дорог, нарушенные земли, сорные места',
    region: ['Северный Казахстан', 'Южный Казахстан', 'Алматинская область', 'Жамбылская область'],
    bloomingPeriod: 'Май - Август',
    status: 'common',
    image: papaverRhoeas,
    uses: 'Медоносное и декоративное растение, семена используются в кулинарии',
    characteristics: [
      'Высота: 20-60 см',
      'Цветы: ярко-красные, 4-7 см в диаметре',
      'Листья: перисто-рассеченные, опушенные',
      'Плод: коробочка с многочисленными мелкими семенами'
    ]
  }
];

export const regions = [
  'Северный Казахстан',
  'Центральный Казахстан',
  'Восточный Казахстан',
  'Западный Казахстан',
  'Южный Казахстан',
  'Мангистау',
  'Атырау',
  'Актобе',
  'Костанай',
  'Акмолинская область'
];

export const families = [
  'Ranunculaceae',
  'Liliaceae', 
  'Iridaceae',
  'Poaceae',
  'Papaveraceae',
  'Rosaceae',
  'Asteraceae',
  'Fabaceae'
];

export const statusLabels = {
  common: 'Обычный',
  rare: 'Редкий',
  endangered: 'Исчезающий',
  protected: 'Охраняемый'
};