const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersInputs = document.querySelector('.map__filters').querySelectorAll('[class^=map__]');

const adFormTitle = adForm.title;
const adFormPrice = adForm.price;
const adFormRooms = adForm.rooms;
const adFormCapacity = adForm.capacity;
const maxPrice = 1000000;

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

setPageState(state.deactive);

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
  if (price.value.length > maxPrice) {
    price.setCustomValidity(`Укажите цену, которая не должна быть больше ${maxPrice}`);
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
};

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

const checkRoomCapacity = (rooms, guests, evt) => {
  const roomsValue = Number(rooms.value);
  const guestsValue = Number(guests.value);

  if (!roomsCapacity[roomsValue].includes(guestsValue)) {
    evt.target.setCustomValidity(roomsValidity(roomsValue));
  } else {
    evt.target.setCustomValidity('');
  }

  evt.target.reportValidity();
};

const onCapacityChange = (evt) => {
  checkRoomCapacity(adFormRooms, adFormCapacity, evt);
};

const onPriceInput = () => {
  priceValidity(adFormPrice);
};

const onTitleInput = () => {
  inputValidity(adFormTitle);
};

adFormRooms.addEventListener('change', onCapacityChange);
adFormCapacity.addEventListener('change', onCapacityChange);
adFormTitle.addEventListener('input', onTitleInput);
adFormPrice.addEventListener('input', onPriceInput);
