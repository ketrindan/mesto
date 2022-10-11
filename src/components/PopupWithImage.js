import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageLink = this._popup.querySelector('.popup__image');
    this._imageSubtitle = this._popup.querySelector('.popup__image-subtitle');
  }

  open(name, link) {
    super.open();
    this._imageLink.setAttribute("src", link);
    this._imageLink.setAttribute("alt", `картинка ${name}`);
    this._imageSubtitle.textContent = name;
  }
}
