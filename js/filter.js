import {placeAllOffersOnMap, clearMarkers} from './map.js';

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersSelects = mapFiltersForm.querySelectorAll('option');
const mapFiltersFeatures = mapFiltersForm.querySelectorAll('[name=features]');
console.log(6588756, mapFiltersSelects, mapFiltersFeatures);

const livingTypeFilter = mapFiltersForm['housing-type'];
// arr[String(evt.name).replace(/housing-/g, '')] = evt.value;

const typeValue = livingTypeFilter.querySelectorAll('option');
console.log(5555, typeValue);

const filterValues = {
  type: '',
  price: '',
  rooms: '',
  guests: '',
  features: [],
};

const prepareFilterInputs = (item) => {
  const property = item.name.replace(/housing-/g, '');

  if (item.value !== 'any') {
    filterValues[property] = item.value;

    return;
  }

  filterValues[property] = '';
};

const prepareFilterFeatures = (item) => {
  if (item.checked === true) {
    filterValues.features.push(item.value);
    return;
  }

  filterValues.features.splice(filterValues.features.indexOf(item.value), 1);
};

const prepareFilterOptions = (item) => {
  if (item.name === 'features') {
    prepareFilterFeatures(item);

    return;
  }

  prepareFilterInputs(item);
};

const comparePrice = (price, filterValue) => {
  switch (filterValue){
    case 'low':
      return price < 10000;
    case 'middle':
      return (10000 < price) && (price > 50000);
    case 'high':
      return price > 50000;
  }
};

const compareFilterWithOffers = (offer, filter) => {

  const shallowOffer = {
    type: offer.offer.type,
    price: offer.offer.price,
    rooms: offer.offer.rooms,
    guests: offer.offer.guests,
    features: offer.offer.features,
  };

  for (const property in shallowOffer) {
    // if (property === 'price') {
    //   comparePrice(shallowOffer[property], filter.price);
    // }

    // if (property === 'features') {
    //   filter.features.forEach((feature) => {
    //     shallowOffer[property].includes(feature);
    //   });
    // }
    return shallowOffer[property] === filter[property];
  }

  console.log(12414, shallowOffer);
};

const filterOffers = (offers) => {
  mapFiltersForm.addEventListener('change', (evt) => {
    prepareFilterOptions(evt.target);
    console.log(13, filterValues);
  });

  const t = offers.filter((offer) => {compareFilterWithOffers(offer, filterValues);});
  console.log(t);
  return t;
};


export {filterOffers};

// взять временный объект
// записать в него то, что выбрал пользователь
//   - при этом создаются ключи и записываются свойства
// сравнить ключи с оффреми

// если возвращает тру, то ок
