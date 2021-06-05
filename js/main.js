const randomize = (min, max, isInclude) => isInclude ? Math.random() * (max - min + 1) + min : Math.random() * (max - min) + min;

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('Числа не могут быть отрицательными, попробуй снова!');
  }

  if (min > max) {
    throw new Error('«max» не может быть меньше, чем «min»');
  }

  if (min === max)  {
    return min;
  }

  min = Math.floor(min);
  max = Math.ceil(max);

  return Math.floor(randomize(min, max, true));
};

const getRandomFloat = (min, max, decimalPoints) => {
  if (min < 0 || max < 0) {
    throw new Error('Числа не могут быть отрицательными, попробуй снова!');
  }

  if (min > max) {
    throw new Error('«max» не может быть меньше, чем «min»');
  }

  if (min === max)  {
    return min;
  }

  return Number.parseFloat(randomize(min, max, false).toFixed(decimalPoints));
};

const AVATAR_COUNT = 8;
const NUMBER_OF_OFFERS = 10;
const AVATARS = new Array(AVATAR_COUNT).fill(0).map((avatar, index) => `img/avatars/user${String(index + 1).padStart(2, 0)}.png`);
const OFFER_TITLES = [
  'Лучшее предложение ева',
  'Ты никогда такого не видел',
  'Даже не думай',
  'Что может быть лучше',
  'Я тебя по Ай-пи вычислю!',
  'Лучшая хата',
  'Бери или пожалеешь',
  'Без клопов',
  'С клопами, зато какая',
  'Продам гараж',
];
const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const OFFER_CHEKINOUTS = [
  '12:00',
  '13:00',
  '14:00',
];
const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const OFFER_DESCRIPTIOPNS = [
  'Великолепная квартира-студия в центре Токио.',
  'Если хочешь страдать, то ты пришёл по адресу.',
  'Мы приглашаем вас окунуться в сказочный мир в прямом смысле этого слова!»',
  'Не „Баунти“, но тоже „райское наслаждение“.',
  'Здание было построено в 1895 году известным архитектором для своей семьи, что объясняет качество строения.',
  'За домом находится средневековая оборонительная стена Праги «Стена голода».',
  'Позже, на месте танка построили фонтан, однако его маленький кусочек до сих пор находится на площади и напоминает горожанам о действиях прошлых лет в Праге',
  'Our holiday was wonderful. Everything needed was in the apartment.',
  '«Хрущёвки» сносимых серий предназначались для временного решения жилищной проблемы и были рассчитаны на 25 лет, но часть из них до сих пор используется по назначению, представляя угрозу для жителей.',
  '«Хрущёвки» несносимых серий имели расчётный ресурс 50 лет, поздние исследования показали, что ресурс может быть продлён до 150 лет (при своевременных капитальных ремонтах)',
];
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const OfferPriceRange = {
  MIN: 0,
  MAX: 100000,
};
const OFFER_ROOM_AMOUNTS = [
  1,
  2,
  3,
  100,
];
const OFFER_CAPACITY = [
  1,
  2,
  3,
  'не для гостей',
];
const getRanodomeArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const shuffle = (array) => {
  let arrayLength = array.length;
  let currentElement;
  let remainingElement;

  while (arrayLength) {
    remainingElement = Math.floor(Math.random() * arrayLength--);
    currentElement = array[arrayLength];
    array[arrayLength] = array[remainingElement];
    array[remainingElement] = currentElement;
  }

  return array;
};

const getRandomBunchArrayElements = (features) => {
  shuffle(features);

  return features.slice(0, getRandomInteger(0, features.length - 1));
};

const getOffer = () => {
  const locationX = getRandomFloat(35.65000, 35.70000, 5);
  const locationY = getRandomFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: getRanodomeArrayElement(AVATARS),
    },
    offer: {
      title: getRanodomeArrayElement(OFFER_TITLES),
      address: `${locationX}, ${locationY}`,
      price: getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
      type: getRanodomeArrayElement(OFFER_TYPES),
      rooms: getRanodomeArrayElement(OFFER_ROOM_AMOUNTS),
      guests: getRanodomeArrayElement(OFFER_CAPACITY),
      checkin: getRanodomeArrayElement(OFFER_CHEKINOUTS),
      checkout: getRanodomeArrayElement(OFFER_CHEKINOUTS),
      features: getRandomBunchArrayElements(OFFER_FEATURES),
      description: getRanodomeArrayElement(OFFER_DESCRIPTIOPNS),
      photos: getRandomBunchArrayElements(OFFER_PHOTOS),
    },
    location: {
      lat: locationX,
      lng: locationY,
    },
  };
};

const offers = new Array(NUMBER_OF_OFFERS).fill(null).map(getOffer);

offers;
