import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.form');
    this._inputList = [...this._formElement.querySelectorAll('.form__input')];
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


  _getElement() {
    return this._formElement;
  }


  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this.close();
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
