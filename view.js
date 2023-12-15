const NATIVE_DOM_WRAPPER_CLASS_NAME = "natives";
const FOREIGN_DOM_WRAPPER_CLASS_NAME = "foreigns";
const SELECTED_CLASS_NAME = "selected";
const ATTEMPTS_COUNT_CLASS_NAME = "attempts-count";

const createDomWord = (word, className, clickEventHandler) => {
  const domWord = document.createElement("div");
  domWord.className += className;
  domWord.innerText = word;
  domWord.addEventListener("click", clickEventHandler);
  return domWord;
};

const wordDOMElements = {
  subscribers: [],
  nativeWords: [],
  foreignWords: [],
  subscribe: function (subscriber) {
    this.subscribers.push(subscriber);
  },
  notifySubscribers: function () {
    this.subscribers.forEach((subscriber) => {
      subscriber.notify();
    });
  },
  addToNativeWords: function (domWord) {
    this.nativeWords.push(domWord);
    this.notifySubscribers();
  },
  addToForeignWords: function (domWord) {
    this.foreignWords.push(domWord);
    this.notifySubscribers();
  },
  reset: function () {
    this.nativeWords = [];
    this.foreignWords = [];
    this.notifySubscribers();
  },
};

const wordDOMuiManager = {
  wordDOMElements: wordDOMElements,
  foreignWordsDOMWrapper: getDomElementUsingClass(
    FOREIGN_DOM_WRAPPER_CLASS_NAME
  ),
  nativeWordsDOMWrapper: getDomElementUsingClass(NATIVE_DOM_WRAPPER_CLASS_NAME),
  notify: function () {
    this.clear();
    this.injectDomWordsIntoWrappers();
  },
  clear: function () {
    this.foreignWordsDOMWrapper.innerHTML = "";
    this.nativeWordsDOMWrapper.innerHTML = "";
  },
  injectDomWordsIntoWrappers: function () {
    this.wordDOMElements.foreignWords.forEach((domWord) => {
      injectElementToDOM(domWord, this.foreignWordsDOMWrapper);
    });
    this.wordDOMElements.nativeWords.forEach((domWord) => {
      injectElementToDOM(domWord, this.nativeWordsDOMWrapper);
    });
  },
};
wordDOMElements.subscribe(wordDOMuiManager);

const domWordsUiUpdater = {
  notify: function () {
    this.createDomWordsFromWordsState();
  },
  createDomWordsFromWordsState: function () {
    wordDOMElements.reset();
    wordsState.foreignWords.forEach((foreignWord) => {
      const handleForeignWordClick = () => {
        selectedWords.foreignWord === foreignWord.word
          ? selectedWords.updateForeignWord(null)
          : selectedWords.updateForeignWord(foreignWord.word);
      };
      const domForeignWord = createDomWord(
        foreignWord.word,
        `foreign-word ${foreignWord.clickable ? "clickable" : "unclickable"}`,
        foreignWord.clickable ? handleForeignWordClick : () => {}
      );
      wordDOMElements.addToForeignWords(domForeignWord);
    });

    wordsState.nativeWords.forEach((nativeWord) => {
      const handleNativeWordClick = () => {
        selectedWords.nativeWord === nativeWord.word
          ? selectedWords.updateNativeWord(null)
          : selectedWords.updateNativeWord(nativeWord.word);
      };
      const domNativeWord = createDomWord(
        nativeWord.word,
        `native-word ${nativeWord.clickable ? "clickable" : "unclickable"}`,
        nativeWord.clickable ? handleNativeWordClick : () => {}
      );
      wordDOMElements.addToNativeWords(domNativeWord);
    });
  },
};

const domAttemptsUpdater = {
  attempts: attempts,
  attemptsCounterDomElement: getDomElementUsingClass(ATTEMPTS_COUNT_CLASS_NAME),
  notify: function () {
    this.attemptsCounterDomElement.innerText = this.attempts.count;
  },
};
