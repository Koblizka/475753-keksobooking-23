
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersInputs = document.querySelector('.map__filters').querySelectorAll('[class^=map__]');
const state = {
  active: true,
  deactive: false,
};

const setFormState = (formItems, isActivate) => {
  if (isActivate) {
    formItems.forEach((item) => {
      item.removeAttribute('disabled');
    });

    return;
  }

  formItems.forEach((item) => {
    item.setAttribute('disabled', '');
  });
};

const setPageState = (isActive) => {
  if (isActive) {
    adForm.classList.remove('ad-form--disabled');
    setFormState(adFormFieldsets, state.active);
    setFormState(mapFiltersInputs, state.active);
    return;
  }

  adForm.classList.add('ad-form--disabled');
  setFormState(adFormFieldsets, state.deactive);
  setFormState(mapFiltersInputs, state.deactive);
};

setPageState(state.deactive);
