const ATTEMPTS_COUNT = 5;

// words state keeps track of native words and foreign words in the app, as well as if they're clickable or not.

const wordsState = {
  subscribers: [],
  subscribe: function (subscriber) {
    this.subscribers.push(subscriber);
  },
  notifySubscribers: function () {
    this.subscribers.forEach((subscriber) => {
      subscriber.notify();
    });
  },
  nativeWords: randomize(extractKeys(dictionary)).map((word) => {
    return {
      word: word,
      clickable: true,
    };
  }),
  foreignWords: randomize(
    extractValues(dictionary).map((word) => {
      return {
        word: word,
        clickable: true,
      };
    })
  ),
  updateNativeWordClickable: function (word, clickable) {
    this.nativeWords.forEach((nativeWord) => {
      if (nativeWord.word === word) {
        nativeWord.clickable = clickable;
      }
    });
    this.notifySubscribers();
  },

  updateForeignWordClickable: function (word, clickable) {
    this.foreignWords.forEach((foreignWord) => {
      if (foreignWord.word === word) {
        foreignWord.clickable = clickable;
      }
    });
    this.notifySubscribers();
  },
};

const attempts = {
  count: ATTEMPTS_COUNT,
  subscribers: [],
  subscribe: function (subscriber) {
    this.subscribers.push(subscriber);
  },
  notifySubscribers: function () {
    this.subscribers.forEach((subscriber) => {
      subscriber.notify();
    });
  },
  subtractOne: function () {
    this.count--;
    this.notifySubscribers();
  },
};

const selectedWords = {
  nativeWord: null,
  foreignWord: null,
  subscribers: [],
  subscribe: function (subscriber) {
    this.subscribers.push(subscriber);
  },
  updateNativeWord: function (word) {
    this.nativeWord = word;
    this.notifySubscribers();
  },
  updateForeignWord: function (word) {
    this.foreignWord = word;
    this.notifySubscribers();
  },
  reset: function () {
    this.nativeWord = null;
    this.foreignWord = null;
    this.notifySubscribers();
  },
  notifySubscribers: function () {
    this.subscribers.forEach((subscriber) => subscriber.notify());
  },
};
