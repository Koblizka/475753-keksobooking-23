import {renderOffersOnMap, clearMarkers} from './map.js';
import {debounce} from './utils/debounce.js';

const mapFiltersForm = document.querySelector('.map__filters');

const filterValues = {
  type: '',
  price: '',
  rooms: '',
  guests: '',
  features: [],
};

const PriceValues = {
  LOW: 10000,
  HIGHT: 50000,
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

const comparePrices = (offerPrice, filterValue) => {
  switch (filterValue){
    case '':
      return true;
    case 'low':
      return offerPrice < PriceValues.LOW;
    case 'middle':
      return (PriceValues.LOW < offerPrice) && (offerPrice < PriceValues.HIGHT);
    case 'high':
      return offerPrice > 50000;
    default:
      return false;
  }
};

const compareValues = (offerValue, filterValue) => filterValue === '' ? true : String(offerValue) === String(filterValue);

const compareFeatures = (offerFeatrues, filterFeatures) => {
  if (filterFeatures === []) {
    return true;
  }

  let countEqualFeatures = 0;

  filterFeatures.forEach((feature) => {
    if (offerFeatrues.includes(feature)) {
      countEqualFeatures += 1;
    }
  });

  if (countEqualFeatures === filterFeatures.length) {
    return true;
  }

  return false;
};

const comparingOfferWithFilter = (offer, filter) => {

  const tempOffer = {
    type: offer.offer.type,
    price: offer.offer.price,
    rooms: offer.offer.rooms,
    guests: offer.offer.guests,
    features: offer.offer.features ? offer.offer.features : [],
  };

  return compareValues(tempOffer.type, filter.type) &&
  compareValues(tempOffer.rooms, filter.rooms) &&
  compareValues(tempOffer.guests, filter.guests) &&
  comparePrices(tempOffer.price, filter.price) &&
  compareFeatures(tempOffer.features, filter.features);
};

const renderFilteredOffers = (offers) => {
  clearMarkers();
  renderOffersOnMap(offers.filter((offer) => comparingOfferWithFilter(offer, filterValues)));
};

const debounceApplayingFilter = debounce((offers) => renderFilteredOffers(offers));

const onChangeFilterOptions = (offers) => {
  mapFiltersForm.addEventListener('change', (evt) => {
    prepareFilterOptions(evt.target);
    debounceApplayingFilter(offers);
  });
};

export {onChangeFilterOptions};
