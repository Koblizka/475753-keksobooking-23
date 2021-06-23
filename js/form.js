const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersInputs = document.querySelector('.map__filters').querySelectorAll('[class^=map__]');

const adFormTitle = adForm.title;
const adFormPrice = adForm.price;
const adFormRooms = adForm.rooms;
const adFormCapacity = adForm.capacity;
const adFormType = adForm.type;
const adFormTimein = adForm.timein;
const adFormTimeout = adForm.timeout;

const prices = {
  max: 1000000,
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const state = {
  active: true,
  deactive: false,
};
const roomsCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const titleLength = {
  min: 30,
  max: 100,
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

setPageState(state.active);

const inputValidity = (input) => {
  if (input.validity.tooShort) {
    input.setCustomValidity(`Минимальная длина должна быть ${titleLength.min} символов. Нужно ввести ещё ${titleLength.min - input.value.length}`);
  } else if (input.validity.tooLong) {
    input.setCustomValidity(`Максимальная длина на может быть больше чем ${titleLength.max} символов. Нужно удалить ещё ${input.value.length - titleLength.max}`);
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
};

const priceValidity = (price) => {
  if (price.validity.rangeOverflow) {
    price.setCustomValidity(`Укажите цену, которая не должна быть больше ${prices.max}`);
  } else if (price.validity.rangeUnderflow) {
    price.setCustomValidity(`Цена за ночь не может быть меньше, чем ${prices[adFormType.value]}`);
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
};
// Добавить функицю для гостей
const roomsValidity = (roomsQuantity) => {
  if (roomsQuantity === 1) {
    return '1 комната — «для 1 гостя»';
  }

  if (roomsQuantity === 2 || roomsQuantity === 3) {
    return `${roomsQuantity} комнаты — «для 2 гостей» или «для 1 гостя`;
  }

  if (roomsQuantity === 100) {
    return `${roomsQuantity} комнат — «не для гостей»`;
  }

  return `${roomsQuantity} комнат — «для 3 гостей», «для 2 гостей» или «для 1 гостя»`;
};
// Поправить для гостей и комнат
const checkRoomCapacity = (eventElement) => {
  const roomsValue = Number(adFormRooms.value);
  const guestsValue = Number(adFormCapacity.value);

  if (!roomsCapacity[roomsValue].includes(guestsValue)) {
    eventElement.setCustomValidity(roomsValidity(roomsValue));
  } else {
    eventElement.setCustomValidity('');
  }

  eventElement.reportValidity();
};
// Подумать над тем как вызвать, чтобы сработала валидация сразу
const onCapacityChange = () => {
  checkRoomCapacity(adFormRooms);
  checkRoomCapacity(adFormCapacity);
};

const onTypeChange = () => {
  adFormPrice.setAttribute('min', `${prices[adFormType.value]}`);
};

const onPriceInput = () => {
  onTypeChange();
  priceValidity(adFormPrice);
};

const onTitleInput = () => {
  inputValidity(adFormTitle);
};

const onTimeinChange = (evt) => {
  adFormTimeout.value = evt.target.value;
};

const onTimeoutChange = (evt) => {
  adFormTimein.value = evt.target.value;
};

adFormRooms.addEventListener('change', onCapacityChange);
adFormCapacity.addEventListener('change', onCapacityChange);
adFormTitle.addEventListener('input', onTitleInput);
adFormType.addEventListener('change', onTypeChange);
adFormPrice.addEventListener('input', onPriceInput);
adFormTimein.addEventListener('change', onTimeinChange);
adFormTimeout.addEventListener('change', onTimeoutChange);
