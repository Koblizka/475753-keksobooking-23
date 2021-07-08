const getOffersData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
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
  fetch('https://23.javascript.pages.academy/keksobooking',
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

export {getOffersData, sendForm};
