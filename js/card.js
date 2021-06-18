import {offers} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const fillTextContent = (element, property, textContent) => {
  if (property.length === 0) {
    element.remove();

    return false;
  }

  element.textContent = textContent;
};

const fillTextContentTwoProperties = (element, propertyOne, propertyTwo, textContent) => {
  if (propertyOne.length === 0 || propertyTwo.length === 0) {
    element.remove();

    return false;
  }

  element.textContent = textContent;
};

const fillElementSrc = (element, srcData) => {
  if (element.length === 0) {
    element.remove();

    return false;
  }

  element.src = srcData;
};

const fillPrice = (priceData) => {
  if (priceData.length === 0) {
    price.remove();

    return false;
  }

  price.textContent = `${priceData.price} `;
  price.insertAdjacentHTML('beforeend', '<span>₽/ночь</span>');
};

const fillCapacity = (number) => {
  let rooms = 'комнаты';
  let guests = 'гостей';

  if (number.rooms === 1) {
    rooms = 'комната';
  }

  if (number.rooms === 100) {
    rooms = 'комнат';
  }

  if (number.guests === 1) {
    guests = 'гостя';
  }

  if (number.guests === 'не для гостей') {
    return `${number.rooms} ${rooms} ${number.guests}`;
  }

  return `${number.rooms} ${rooms} для ${number.guests} ${guests}`;
};

const fillFeatures = (element, featuresData) => {
  if (featuresData.length === 0) {
    element.remove();

    return false;
  }

  const featuresFragment = document.createDocumentFragment();

  featuresData.forEach((feature) => {
    const featureItem = document.createElement('li');

    featureItem.classList.add('popup__feature');
    featureItem.classList.add(`popup__feature--${feature}`);
    featuresFragment.append(featureItem);
  });

  element.replaceChildren(featuresFragment);
};

const fillPhotos = (element, photosData) => {
  if (photosData.length === 0) {
    element.remove();

    return false;
  }

  const photosFragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    const photoWidth = 45;
    const photoHeight = 40;
    const photoItem = document.createElement('img');

    photoItem.classList.add ('popup__photo');
    photoItem.setAttribute('width', photoWidth);
    photoItem.setAttribute('height', photoHeight);
    photoItem.setAttribute('alt', 'Фотография жилья');
    photoItem.src = photo;

    photosFragment.append(photoItem);
  });

  element.replaceChildren(photosFragment);
};

const prepareCards = (cardsData) => {
  const {author, offer} = cardsData;

  const tempCard = cardTemplate.cloneNode(true);

  const title = tempCard.querySelector('.popup__title');
  const type = tempCard.querySelector('.popup__type');
  const description = tempCard.querySelector('.popup__description');
  const address = tempCard.querySelector('.popup__text--address');
  const avatar = tempCard.querySelector('.popup__avatar');
  const price = tempCard.querySelector('.popup__text--price');
  const livingSpace = tempCard.querySelector('.popup__type');
  const capacity = tempCard.querySelector('.popup__text--capacity');
  const time = tempCard.querySelector('.popup__text--time');
  const features = tempCard.querySelector('.popup__features');
  const photos = tempCard.querySelector('.popup__photos');

  fillTextContent(title, offer.title, offer.title);
  fillTextContent(type, offer.type, offer.type);
  fillTextContent(description, offer.description, offer.description);
  fillTextContent(address, offer.address, offer.address);
  fillTextContentTwoProperties(time, offer.checkin, offer.checkout, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  fillElementSrc(avatar, `${author.avatar}`);
  fillPrice(offer.price);

  switch (offer.type) {
    case 'flat':
      livingSpace.textContent = 'Квартира';
      break;
    case 'bungalow':
      livingSpace.textContent = 'Бунгало';
      break;
    case 'hotel':
      livingSpace.textContent = 'Отель';
      break;
    case 'house':
      livingSpace.textContent = 'Дом';
      break;
    case 'palace':
      livingSpace.textContent = 'Дворец';
      break;
    default:
      throw new Error ('Такого типа жилой площади нет');
  }

  fillTextContentTwoProperties(capacity, offer.rooms, offer.guests, fillCapacity(offer));
  fillFeatures(features, offer.features);
  fillPhotos(photos, offer.photos);

  return tempCard;
};

const renderCard = (card) => {
  const mapCanvas = document.querySelector('#map-canvas');
  const readyCard = prepareCards(card);

  mapCanvas.appendChild(readyCard);
};

const renderCards = (cardsData) => {
  cardsData.forEach((card => {
    renderCard(card);
  }))
};

renderCards(offers);
