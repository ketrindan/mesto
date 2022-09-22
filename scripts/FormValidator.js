export default class FormValidator {
  constructor(formElement, config) {
  this._form = config.formSelector;
  this._input = config.inputSelector;
  this._submitButton = config.submitButtonSelector;
  this._inactiveButton = config.inactiveButtonClass;
  this._inputError = config.inputErrorClass;
  this._error = config.errorClass;
  this._formElement = formElement;
  }

    /* Скрыть/показать ошибки */

  _showInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    errorElement.classList.add(this._error);
    errorElement.textContent = inputElement.validationMessage;
  }


  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._error);
    errorElement.textContent = '';
  }


  /* Проверка полей */

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }


  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }


  /* Кнопки */

  _disableSubmitButton () {
    this._formElement.querySelector(this._submitButton).classList.add(this._inactiveButton);
    this._formElement.querySelector(this._submitButton).setAttribute("disabled", "true");
  }


  _enableSubmitButton () {
    this._formElement.querySelector(this._submitButton).classList.remove(this._inactiveButton);
    this._formElement.querySelector(this._submitButton).removeAttribute("disabled");
  }


  _toggleButtonState (inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton ()
    } else {
      this._enableSubmitButton ()
    }
  }

  /* Валидация */

  setInitialFormState () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._input));

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState(inputList)
  }


  enableValidation () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._input));

    this._toggleButtonState(inputList)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList)
      });
    });
  }
}
