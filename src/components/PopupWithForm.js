import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.form');
    this._inputList = [...this._formElement.querySelectorAll('.form__input')];
    this._submitButton = this._formElement.querySelector('.submit-btn');
    this._submitButtonText = this._submitButton.textContent;
  }


  _getInputValues() {
    this._inputValueList = {};
    this._inputList.forEach(input => this._inputValueList[input.name] = input.value);

    return this._inputValueList;
  }


  setInputValues(inputValueList) {
    this._inputList.forEach((input) => {
      if (inputValueList[input.name]) {
        input.value = inputValueList[input.name]
      }
    });
  }


  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this.close();
    })
  }


  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }


  close() {
    super.close();
    this._formElement.reset();
  }
}
