import * as data from './data.js';
import * as utils from './utils.js';

const getOffer = () => {
  const locationX = utils.getRandomFloat(35.65000, 35.70000, 5);
  const locationY = utils.getRandomFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: utils.getRandomArrayElement(data.AVATARS),
    },
    offer: {
      title: utils.getRandomArrayElement(data.OFFER_TITLES),
      address: `${locationX}, ${locationY}`,
      price: utils.getRandomInteger(data.OfferPriceRange.MIN, data.OfferPriceRange.MAX),
      type: utils.getRandomArrayElement(data.OFFER_TYPES),
      rooms: utils.getRandomArrayElement(data.OFFER_ROOM_AMOUNTS),
      guests: utils.getRandomArrayElement(data.OFFER_CAPACITY),
      checkin: utils.getRandomArrayElement(data.OFFER_CHEKINOUTS),
      checkout: utils.getRandomArrayElement(data.OFFER_CHEKINOUTS),
      features: utils.getRandomBunchArrayElements(data.OFFER_FEATURES),
      description: utils.getRandomArrayElement(data.OFFER_DESCRIPTIOPNS),
      photos: utils.getRandomBunchArrayElements(data.OFFER_PHOTOS),
    },
    location: {
      lat: locationX,
      lng: locationY,
    },
  };
};

export {getOffer};
