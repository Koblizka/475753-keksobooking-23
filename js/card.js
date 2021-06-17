import {offers} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

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

  const getTextContent = (element, property, textContent) => {
    if (property.length === 0) {
      element.remove();

      return false;
    }

    element.textContent = textContent;
  };

  const getTextContentTwoProperties = (element, propertyOne, propertyTwo, textContent) => {
    if (propertyOne.length === 0 || propertyTwo.length === 0) {
      element.remove();

      return false;
    }

    element.textContent = textContent;
  };

  getTextContent(title, offer.title, offer.title);
  getTextContent(type, offer.type, offer.type);
  getTextContent(description, offer.description, offer.description);
  getTextContent(address, offer.address, offer.address);
  getTextContentTwoProperties(time, offer.checkin, offer.checkout, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

  const setElementSrc = (element, srcData) => {
    if (element.length === 0) {
      element.remove();

      return false;
    }

    element.src = srcData;
  };

  setElementSrc(avatar, `${author.avatar}`);

  const getPrice = (priceData) => {
    if (priceData.length === 0) {
      price.remove();

      return false;
    }

    price.textContent = `${offer.price} `;
    price.insertAdjacentHTML('beforeend', '<span>₽/ночь</span>');
  };

  getPrice(offer.price);

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

  const getCapacity = (number) => {
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

  getTextContentTwoProperties(capacity, offer.rooms, offer.guests, getCapacity(offer));

  const getFeatures = (element, featuresData) => {
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

  getFeatures(features, offer.features);

  const getPhotos = (element, photosData) => {
    if (photosData.length === 0) {
      element.remove();

      return false;
    }

    const photosFragment = document.createDocumentFragment();

    photosData.forEach((photo) => {
      const photoWidth = 45;
      const photoHeigth = 40;
      const photoItem = document.createElement('img');

      photoItem.classList.add ('popup__photo');
      photoItem.setAttribute.width = photoWidth;
      photoItem.setAttribute.heigth = photoHeigth;
      photoItem.setAttribute.alt = 'Фотография жилья';
      photoItem.src = photo;

      photosFragment.append(photoItem);
    });

    element.replaceChildren(photosFragment);
  };

  getPhotos(photos, offer.photos);

  return tempCard;
};

const renderCard = (card) => {
  const mapCanvas = document.querySelector('#map-canvas');
  const readyCard = prepareCards(card);

  mapCanvas.appendChild(readyCard);
};

const cards = offers.forEach((card) => {
  renderCard(card);
});

export {cards};
