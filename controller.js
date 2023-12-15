const validator = {
  selectedWords: selectedWords,
  canValidate: () => {
    //check if both words aren't null.
    return !!selectedWords.foreignWord && !!selectedWords.nativeWord;
  },
  validate: function () {
    const selectedForeignWord = selectedWords.foreignWord;
    const selectedNativeWord = selectedWords.nativeWord;
    if (dictionary[selectedNativeWord] == null) return;
    if (dictionary[selectedNativeWord] === selectedForeignWord) return true;
    return false;
  },
};

const manager = {
  selectedWords: selectedWords,
  validator: validator,
  notify: function () {
    this.updateClassNameForSelectedWords();
    if (this.validator.canValidate()) {
      if (this.validator.validate()) {
        this.updateWordsStateClickable();
        this.selectedWords.reset();
      } else {
        this.subtractOneFromAttempts();
        const selectedNativeWord = this.selectedWords.nativeWord;
        const selectedForeignWord = this.selectedWords.foreignWord;
        this.selectedWords.reset();
        //get previously chosen words form the dom. after resetting the dom, and add class name "wrong" for 400ms then remove the class names.
        const selectedDomNativeWord = wordDOMElements.nativeWords.find(
          (wordDomElement) => wordDomElement.innerText === selectedNativeWord
        );
        const selectedDomForeignWord = wordDOMElements.foreignWords.find(
          (wordDomElement) => wordDomElement.innerText === selectedForeignWord
        );

        addClassNameToDomElement(selectedDomNativeWord, "wrong");
        addClassNameToDomElement(selectedDomForeignWord, "wrong");
        setTimeout(() => {
          removeClassNameToDomElement(selectedDomNativeWord, "wrong");
          removeClassNameToDomElement(selectedDomForeignWord, "wrong");
        }, 400);
      }
    }
  },
  updateClassNameForSelectedWords: function () {
    //updated the class name for the selected words.
    wordDOMElements.foreignWords.forEach((element) => {
      const word = getDomElementInnerText(element);
      if (this.selectedWords.foreignWord === word) {
        addClassNameToDomElement(element, SELECTED_CLASS_NAME);
      } else {
        removeClassNameToDomElement(element, SELECTED_CLASS_NAME);
      }
    });
    wordDOMElements.nativeWords.forEach((element) => {
      const word = getDomElementInnerText(element);
      if (this.selectedWords.nativeWord === word) {
        addClassNameToDomElement(element, SELECTED_CLASS_NAME);
      } else {
        removeClassNameToDomElement(element, SELECTED_CLASS_NAME);
      }
    });
  },
  updateWordsStateClickable: function () {
    // updated clickable for native words;
    wordsState.nativeWords.forEach((nativeWord) => {
      if (nativeWord.word === this.selectedWords.nativeWord) {
        wordsState.updateNativeWordClickable(nativeWord.word, false);
      }
    });

    // updated clickable for native words;
    wordsState.foreignWords.forEach((foreignWord) => {
      if (foreignWord.word === this.selectedWords.foreignWord) {
        wordsState.updateForeignWordClickable(foreignWord.word, false);
      }
    });
  },
  subtractOneFromAttempts: function () {
    attempts.subtractOne();
  },
};

wordsState.subscribe(domWordsUiUpdater);
selectedWords.subscribe(manager);
attempts.subscribe(domAttemptsUpdater);
domWordsUiUpdater.notify();
domAttemptsUpdater.notify();
