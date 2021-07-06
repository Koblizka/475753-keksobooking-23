import {getOffersData} from './api.js';
import {renderOffersOnMap} from './map.js';
import {makeFailureMessage} from './form.js';
import {onChangeFilterOptions} from './filter.js';
import './card.js';
import './form.js';

getOffersData((offers) => {
  renderOffersOnMap(offers);
  onChangeFilterOptions(offers);
}, makeFailureMessage);
