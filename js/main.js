import {getOffersData} from './api.js';
import {renderOffersOnMap} from './map.js';
import {makeFailureMessage, adFormResetButton, onRestButtonClick} from './form.js';
import {onChangeFilterOptions, resetFilter} from './filter.js';
import './card.js';
import './form.js';
import './file-upload.js';

getOffersData((offers) => {
  renderOffersOnMap(offers);
  onChangeFilterOptions(offers);
  adFormResetButton.addEventListener('click', () => {
    onRestButtonClick;
    resetFilter(offers);
  });
}, makeFailureMessage);
