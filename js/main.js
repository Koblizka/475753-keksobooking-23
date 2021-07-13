import {getOffersData} from './api.js';

import {
  adForm,
  PageState,
  adFormResetButton,
  onRestButtonClick,
  onSubmit,
  makeFailureMessage,
  setPageState,
  setAddress
} from './form.js';
import {
  renderOffersOnMap,
  initialMap,
  TokyoCenter
} from './map.js';
import {
  onChangeFilterOptions,
  resetFilter
} from './filter.js';
import './card.js';
import './file-upload.js';

setPageState(PageState.DEACTIVE_STATE);

const onLoadMap = () => {
  getOffersData((offers) => {
    setPageState(PageState.ACTIVE_STATE);
    setAddress(TokyoCenter);
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
};

initialMap(onLoadMap);
