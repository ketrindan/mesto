export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-btn');
  }


  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscape);
  }


  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscape);
  }


  _handleEscape = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }


  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
