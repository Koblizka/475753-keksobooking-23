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

export {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  shuffle,
  getRandomBunchArrayElements
};
