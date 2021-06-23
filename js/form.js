const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersInputs = document.querySelector('.map__filters').querySelectorAll('[class^=map__]');
const capacityOptions = adForm.capacity.querySelectorAll('option');

const {
  title,
  price,
  rooms: room,
} = adForm;

const state = {
  active: true,
  deactive: false,
};
const RoomsCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const TitleLength = {
  MIN: 30,
  MAX: 100,
};
const maxPrice = 1000000;

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

const titleValidity = (titleInput) => {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity(`Минимальная длина должна быть ${TitleLength.min} символов. Нужно ввести ещё ${TitleLength.MIN - titleInput.value.length}`);
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity(`Максимальная длина на может быть больше чем ${TitleLength.MAX} символов. Нужно удалить ещё ${titleInput.value.length - TitleLength.MAX}`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
};

const priceValidity = (priceInput) => {
  if (priceInput.value.length > maxPrice) {
    priceInput.setCustomValidity(`Укажите цену, которая не должна быть больше ${maxPrice}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
};

const disableCapacityOptions = () => {
  capacityOptions.forEach((option) => {
    option.disabled = true;
  });
};

const changeRoomCapacity = (roomCapacity) => {
  RoomsCapacity[roomCapacity].forEach((roomAmount) => {
    capacityOptions.forEach((option) => {
      if (Number(option.value) === roomAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const onPriceInput = () => {
  priceValidity(price);
};

const onTitleInput = () => {
  titleValidity(title);
};

const onRoomsChange = (evt) => {
  disableCapacityOptions();

  changeRoomCapacity(evt.target.value);
};

title.addEventListener('input', onTitleInput);
room.addEventListener('change', onRoomsChange );
price.addEventListener('input', onPriceInput);

setPageState(state.active);
disableCapacityOptions();
changeRoomCapacity(room.value);
