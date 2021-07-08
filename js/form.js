import {PageState} from './data.js';
import {sendForm} from './api.js';
import {TokyoCenter, mainPinMarker} from './map.js';
import {resetAllPreviews} from './file-upload.js';

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersInputs = document.querySelector('.map__filters').querySelectorAll('[class^=map__]');
const capacityOptions = adForm.capacity.querySelectorAll('option');
const adFormResetButton = adForm.querySelector('.ad-form__reset');

const templateSuccessModal = document.querySelector('#success').content.querySelector('.success');
const templateErrorModal = document.querySelector('#error').content.querySelector('.error');

console.log(templateSuccessModal);
console.log(templateErrorModal);

const {
  title,
  price,
  rooms: room,
  type,
  timein,
  timeout,
  address,
} = adForm;

const roomsCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const TitleLength = {
  MIN: 30,
  MAX: 100,
};
const prices =  {
  max: 1000000,
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const ModalState = {
  FAIL: 'fail',
  SUCCESS: 'success',
};

const leftMouseButton = 0;

const setFormState = (formItems, isActivate) => {
  if (isActivate === 'active') {
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
    setFormState(adFormFieldsets, PageState.ACTIVE_STATE);
    setFormState(mapFiltersInputs, PageState.ACTIVE_STATE);
    return;
  }

  adForm.classList.add('ad-form--disabled');
  setFormState(adFormFieldsets, PageState.DEACTIVE_STATE);
  setFormState(mapFiltersInputs, PageState.DEACTIVE_STATE);
};

const titleValidity = (titleInput) => {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity(`Минимальная длина должна быть ${TitleLength.MIN} символов. Нужно ввести ещё ${TitleLength.MIN - titleInput.value.length}`);
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity(`Максимальная длина на может быть больше чем ${TitleLength.MAX} символов. Нужно удалить ещё ${titleInput.value.length - TitleLength.MAX}`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
};

const priceValidity = (priceInput) => {
  if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity(`Укажите цену, которая не должна быть больше ${prices.max}`);
  } else if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity(`Цена за ночь не может быть меньше, чем ${prices[type.value]}`);
  } else {
    priceInput.setCustomValidity('');
  }

  price.reportValidity();
};

const disableCapacityOptions = () => {
  capacityOptions.forEach((option) => {
    option.disabled = true;
  });
};

const changeRoomCapacity = (roomCapacity) => {
  roomsCapacity[roomCapacity].forEach((roomAmount) => {
    capacityOptions.forEach((option) => {
      if (Number(option.value) === roomAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const setAddress = ({lat, lng}) => {
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const onTypeChange = () => {
  price.setAttribute('min', `${prices[type.value]}`);
};

const onPriceInput = () => {
  onTypeChange();
  priceValidity(price);
};

const onTitleInput = () => {
  titleValidity(title);
};

const onRoomsChange = (evt) => {
  disableCapacityOptions();

  changeRoomCapacity(evt.target.value);
};

const onTimeinChange = (evt) => {
  timeout.value = evt.target.value;
};

const onTimeoutChange = (evt) => {
  timein.value = evt.target.value;
};

const resetAdForm = () => {
  adForm.reset();
  setAddress(TokyoCenter);
  mainPinMarker.setLatLng(TokyoCenter);
  resetAllPreviews();
};

const makeFailureMessage = (statusName, statusMessage) => {
  const element = document.createElement('div');
  const header = document.createElement('h3');
  const paragraph = document.createElement('p');
  const button = document.createElement('button');

  element.style.position = 'absolute';
  element.style.top = '50%';
  element.style.left = '50%';
  element.style.transform = 'translate(-50%, -50%)';
  element.style.zIndex = 1000;
  element.style.padding = '20px 10px';
  element.style.minWidth = '300px';
  element.style.fontSize = '32px';
  element.style.background = '#f0f0ea';
  element.style.border = '2px solid pink';
  element.style.borderRadius = '10px';
  element.style.textAlign= 'center';

  header.textContent = 'Не удалось выполнить запрос!';
  paragraph.textContent = `${statusName} : ${statusMessage}`;

  button.style.padding = '5px 10px';
  button.style.background = 'white';
  button.style.border = '2px solid';
  button.style.borderRadius = '5px';
  button.style.borderColor = 'pink';

  button.textContent = 'Ясно, понятно';

  element.insertAdjacentElement('afterbegin', paragraph);
  element.insertAdjacentElement('afterbegin', header);
  element.insertAdjacentElement('beforeend', button);


  button.addEventListener('click', (evt) => {
    evt.preventDefault();

    element.remove();
  });

  document.body.append(element);
};

const closeModal = (modalElement) => {
  const onClose = (evt) => {
    evt.preventDefault();

    if (evt.key === 'Escape' || evt.button === leftMouseButton) {
      modalElement.remove();

      document.removeEventListener('keydown', onClose);
      document.removeEventListener('click', onClose);
    }
  };

  document.addEventListener('click', onClose);
  document.addEventListener('keydown', onClose);
};

const closeModalOnButton = (buttonElement) => {
  const onButtonClick = (evt) => {
    evt.preventDefault();

    buttonElement.remove();

    buttonElement.querySelector('button').removeEventListener('click', onButtonClick);
  };

  buttonElement.querySelector('button').addEventListener('click', onButtonClick);
};

const showModal = (modalState, modalTemplate) => {
  const modal = modalTemplate.cloneNode(true);

  closeModal(modal);
  document.body.insertAdjacentElement('beforeend', modal);

  if (modalState === 'fail') {
    closeModalOnButton(modal);
  }

  if (modalState === 'success') {
    resetAdForm();
  }
};

const onSubmit = (evt) => {
  evt.preventDefault();

  sendForm(
    () => showModal(ModalState.SUCCESS, templateSuccessModal),
    () => showModal(ModalState.FAIL, templateErrorModal),
    new FormData(adForm),
  );
};

const onRestButtonClick = (evt) => {
  evt.preventDefault();

  resetAdForm();
};

title.addEventListener('input', onTitleInput);
room.addEventListener('change', onRoomsChange);
price.addEventListener('input', onPriceInput);
type.addEventListener('change', onTypeChange);
timein.addEventListener('change', onTimeinChange);
timeout.addEventListener('change', onTimeoutChange);
adForm.addEventListener('submit', onSubmit);

setPageState(PageState.DEACTIVE_STATE);
disableCapacityOptions();
changeRoomCapacity(room.value);

export {setPageState, setAddress, makeFailureMessage, adFormResetButton, onRestButtonClick};
