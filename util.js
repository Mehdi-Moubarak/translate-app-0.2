const randomize = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const extractKeys = (obj) => {
  if (obj == null) return;
  const keys = [];
  for (let key in obj) {
    keys.push(key);
  }
  return keys;
};

const extractValues = (obj) => {
  if (obj == null) return;
  const values = [];
  for (let key in obj) {
    values.push(obj[key]);
  }
  return values;
};

const injectElementToDOM = (domElement, parent) => {
  parent.appendChild(domElement);
};

const getDomElementUsingClass = (className) => {
  return document.querySelector(`.${className}`);
};

const getDomElementInnerText = (domElement) => {
  return domElement.innerText;
};

const addClassNameToDomElement = (domElement, className) => {
  domElement.classList.add(className);
};

const removeClassNameToDomElement = (domElement, className) => {
  domElement.classList.remove(className);
};
