import {getOffersData} from './api.js';
import {placeAllOffersOnMap, clearMarkers} from './map.js';
import {makeFailureMessage} from './form.js';
import {filterOffers} from './filter.js';
import './card.js';
import './form.js';

getOffersData((offers) => {
  console.log(0, offers);
  placeAllOffersOnMap(offers);
  filterOffers(offers);
}, makeFailureMessage);
