import {getOffersData} from './api.js';
import {isMapLoaded, renderOffersOnMap} from './map.js';
import {
  adForm,
  PageState,
  adFormResetButton,
  onRestButtonClick,
  onSubmit,
  makeFailureMessage,
  setPageState
} from './form.js';
import {
  onChangeFilterOptions,
  resetFilter
} from './filter.js';
import './card.js';
import './file-upload.js';

setPageState(PageState.DEACTIVE_STATE);

getOffersData((offers) => {
  if (isMapLoaded) {
    setPageState(PageState.ACTIVE_STATE);
  }

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
