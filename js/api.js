const OffersUrl = {
  DATA: 'https://23.javascript.pages.academy/keksobooking/data',
  ADDRESS: 'https://23.javascript.pages.academy/keksobooking',
};

const getOffersData = (onSuccess, onFail) => {
  fetch(OffersUrl.DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error (response.status, response.statusText);
    })
    .then((offersData) => {
      onSuccess(offersData);
    })
    .catch((err) => onFail(err.name, err.message));
};

const sendForm = (onSuccess, onFail, body) => {
  fetch(OffersUrl.ADDRESS,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }

      onFail();
    })
    .catch((err) => onFail(err.name, err.message));
};

export {
  getOffersData,
  sendForm
};
