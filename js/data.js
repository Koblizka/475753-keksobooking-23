import * as util from './utils.js';

const NUMBER_OF_OFFERS = 10;
const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];
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
  '',
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
const PageState = {
  ACTIVE_STATE: 'active',
  DEACTIVE_STATE: 'deactive',
};


const getOffer = () => {
  const locationX = util.getRandomFloat(35.65000, 35.70000, 5);
  const locationY = util.getRandomFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: util.getRandomArrayElement(AVATARS),
    },
    offer: {
      title: util.getRandomArrayElement(OFFER_TITLES),
      address: `${locationX}, ${locationY}`,
      price: util.getRandomInteger(OfferPriceRange.MIN, OfferPriceRange.MAX),
      type: util.getRandomArrayElement(OFFER_TYPES),
      rooms: util.getRandomArrayElement(OFFER_ROOM_AMOUNTS),
      guests: util.getRandomArrayElement(OFFER_CAPACITY),
      checkin: util.getRandomArrayElement(OFFER_CHEKINOUTS),
      checkout: util.getRandomArrayElement(OFFER_CHEKINOUTS),
      features: util.getRandomBunchArrayElements(OFFER_FEATURES),
      description: util.getRandomArrayElement(OFFER_DESCRIPTIOPNS),
      photos: util.getRandomBunchArrayElements(OFFER_PHOTOS),
    },
    location: {
      lat: locationX,
      lng: locationY,
    },
  };
};

const offers = new Array(NUMBER_OF_OFFERS).fill(null).map(getOffer);

export {
  NUMBER_OF_OFFERS,
  AVATARS,
  OFFER_TITLES,
  OFFER_TYPES,
  OFFER_CHEKINOUTS,
  OFFER_FEATURES,
  OFFER_DESCRIPTIOPNS,
  OFFER_PHOTOS,
  OfferPriceRange,
  OFFER_ROOM_AMOUNTS,
  OFFER_CAPACITY,
  PageState,
  offers
};
