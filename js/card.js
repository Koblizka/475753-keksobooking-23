const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const livingSpaceTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const fillTextContent = (element, property, textContent) => {
  if (!property) {
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

const fillPrice = (element, priceData) => {
  if (priceData.length === 0) {
    element.remove();

    return false;
  }

  element.textContent = `${priceData} `;
  element.insertAdjacentHTML('beforeend', '<span>₽/ночь</span>');
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

const getFeatureElement = (featureData) => {
  const featureElement = document.createElement('li');

  featureElement.classList.add('popup__feature');
  featureElement.classList.add(`popup__feature--${featureData}`);

  return featureElement;
};

const getPhotoElement = (photoData) => {
  const photoWidth = 45;
  const photoHeight = 40;
  const photoItem = document.createElement('img');

  photoItem.classList.add ('popup__photo');
  photoItem.setAttribute('width', photoWidth);
  photoItem.setAttribute('height', photoHeight);
  photoItem.setAttribute('alt', 'Фотография жилья');
  photoItem.src = photoData;

  return photoItem;
};

const fillBunchElements = (element, elementsData, elementFunction) => {
  if (!elementsData) {
    element.remove();

    return false;
  }

  const elementsFragment = document.createDocumentFragment();

  elementsData.forEach((item) => {
    elementsFragment.append(elementFunction(item));
  });

  element.replaceChildren(elementsFragment);
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
  fillPrice(price, offer.price);

  livingSpace.textContent = livingSpaceTypes[offer.type];

  fillTextContentTwoProperties(capacity, offer.rooms, offer.guests, fillCapacity(offer));
  fillBunchElements(features, offer.features, getFeatureElement);
  fillBunchElements(photos, offer.photos, getPhotoElement);

  return tempCard;
};

export {prepareCards};
