
const adForm = document.querySelector('.ad-form');
const adFormInputs = adForm.querySelectorAll('fieldset');

const disablePage = (isTrue) => {
  if (isTrue === true) {
    adForm.classList.add('ad-form--disabled');

    adFormInputs.forEach((item) => {
      item.setAttribute('disabled', '');
    });
  } else {
    adForm.classList.remove('ad-form--disabled');

    adFormInputs.forEach((item) => {
      item.removeAttribute('disabled');
    });
  }
};

disablePage(true);
