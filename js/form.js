
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

const disablePage = (isTrue) => {
  if (isTrue) {
    adForm.classList.add('ad-form--disabled');

    adFormFieldsets.forEach((item) => {
      item.setAttribute('disabled', '');
    });
  } else {
    adForm.classList.remove('ad-form--disabled');

    adFormFieldsets.forEach((item) => {
      item.removeAttribute('disabled');
    });
  }
};

// disablePage(true);

const adFormTitle = adForm.title;
console.log(adFormTitle);

