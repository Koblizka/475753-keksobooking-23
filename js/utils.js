const randomize = (min, max, isInclude) => isInclude ? Math.random() * (max - min + 1) + min : Math.random() * (max - min) + min;

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('Числа не могут быть отрицательными, попробуй снова!');
  }

  if (min > max) {
    throw new Error('«max» не может быть меньше, чем «min»');
  }

  if (min === max)  {
    return min;
  }

  min = Math.floor(min);
  max = Math.ceil(max);

  return Math.floor(randomize(min, max, true));
};

const getRandomFloat = (min, max, decimalPoints) => {
  if (min < 0 || max < 0) {
    throw new Error('Числа не могут быть отрицательными, попробуй снова!');
  }

  if (min > max) {
    throw new Error('«max» не может быть меньше, чем «min»');
  }

  if (min === max)  {
    return min;
  }

  return Number.parseFloat(randomize(min, max, false).toFixed(decimalPoints));
};


const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const shuffle = (array) => {
  const tempArray = array.slice();
  let arrayLength = tempArray.length;
  let currentElement;
  let remainingElement;

  tempArray.forEach(() => {
    remainingElement = Math.floor(Math.random() * arrayLength--);
    currentElement = tempArray[arrayLength];
    tempArray[arrayLength] = tempArray[remainingElement];
    tempArray[remainingElement] = currentElement;
  });

  return tempArray;
};

const getRandomBunchArrayElements = (features) => {
  shuffle(features);

  return features.slice(0, getRandomInteger(0, features.length));
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

export {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  shuffle,
  getRandomBunchArrayElements,
  makeFailureMessage
};
