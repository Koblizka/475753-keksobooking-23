import {renderOffersOnMap, clearMarkers} from './map.js';
import {debounce} from './utils/debounce.js';

const DEFAULT_FILTER_VALUE = 'any';

const mapFilterForm = document.querySelector('.map__filters');

const mapFilterFormElements = mapFilterForm.elements;
const typeFilterElement = mapFilterFormElements['housing-type'];
const priceFilterElement = mapFilterFormElements['housing-price'];
const roomsFilterElement = mapFilterFormElements['housing-rooms'];
const guestsFilterElement = mapFilterFormElements['housing-guests'];

const PriceValues = {
  LOW: 10000,
  HIGHT: 50000,
};

const comparePrices = (offerPrice, filterValue) => {
  switch (filterValue){
    case 'any':
      return true;
    case 'low':
      return offerPrice < PriceValues.LOW;
    case 'middle':
      return (PriceValues.LOW < offerPrice) && (offerPrice < PriceValues.HIGHT);
    case 'high':
      return offerPrice > PriceValues.HIGHT;
    default:
      return false;
  }
};

const compareValues = (offerValue, filterValue) => filterValue === DEFAULT_FILTER_VALUE ? true : String(offerValue) === String(filterValue);

const compareFeatures = (offerFeatrues) => {
  const choosenFeatures = mapFilterForm.querySelectorAll('.map__checkbox:checked');
  let countEqualFeatures = 0;

  choosenFeatures.forEach((feature) => {
    if (offerFeatrues.includes(feature.value)) {
      countEqualFeatures += 1;
    }
  });

  return countEqualFeatures === choosenFeatures.length;
};

const comparingOfferWithFilter = (offer) =>
  compareValues(offer.offer.type, typeFilterElement.value) &&
  compareValues(offer.offer.rooms, roomsFilterElement.value) &&
  compareValues(offer.offer.guests, guestsFilterElement.value) &&
  comparePrices(offer.offer.price, priceFilterElement.value) &&
  compareFeatures(offer.offer.features ? offer.offer.features : []);


const renderFilteredOffers = (offers) => {
  clearMarkers();
  renderOffersOnMap(offers.filter((offer) => comparingOfferWithFilter(offer)));
};

const debounceApplayingFilter = debounce((offers) => renderFilteredOffers(offers));

const onChangeFilterOptions = (offers) => {
  mapFilterForm.addEventListener('change', () => {
    debounceApplayingFilter(offers);
  });
};

export {onChangeFilterOptions};
