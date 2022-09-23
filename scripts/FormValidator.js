export default class FormValidator {
  constructor(formElement, config) {
  this._formSelector = config.formSelector;
  this._inputSelector = config.inputSelector;
  this._submitButtonSelector = config.submitButtonSelector;
  this._inactiveButtonClass = config.inactiveButtonClass;
  this._inputErrorClass = config.inputErrorClass;
  this._errorClass = config.errorClass;
  this._formElement = formElement;
  }

    /* Скрыть/показать ошибки */

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }


  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }


  /* Проверка полей */

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }


  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }


  /* Кнопки */

  _disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute("disabled", "true");
  }


  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute("disabled");
  }


  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton()
    } else {
      this._enableSubmitButton()
    }
  }

  /* Валидация */

  setInitialFormState() {
    const inputList = Array.from(this._input);

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState(inputList)
  }


  enableValidation() {
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._input = this._formElement.querySelectorAll(this._inputSelector);

    const inputList = Array.from(this._input);

    this._toggleButtonState(inputList)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList)
      });
    });
  }
}
