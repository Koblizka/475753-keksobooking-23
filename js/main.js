import {getOffersData} from './api.js';
import {renderOffersOnMap} from './map.js';
import {
  adForm,
  adFormResetButton,
  onRestButtonClick,
  onSubmit,
  makeFailureMessage
} from './form.js';
import {onChangeFilterOptions, resetFilter} from './filter.js';
import './card.js';
import './file-upload.js';

getOffersData((offers) => {
  renderOffersOnMap(offers);
  onChangeFilterOptions(offers);
  adForm.addEventListener('submit', (evt) => {
    onSubmit(evt);
    resetFilter(offers);
  });

  adFormResetButton.addEventListener('click', (evt) => {
    onRestButtonClick(evt);
    resetFilter(offers);
  });
}, makeFailureMessage);
