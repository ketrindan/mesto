export default class Card {
  constructor(data, selector, openImagePopup) {
    this._name = data.name;
		this._link = data.link;
		this._selector = selector;
    this._openImagePopup = openImagePopup;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
	}


  addElement() {
    this._element = this._getElement();
  	this._element.querySelector('.elements__title').textContent = this._name;
  	this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = `картинка ${this._name}`;;

    this._setEventListeners();

  	return this._element;
  }


  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__like_active');
    });

    this._element.querySelector('.elements__delete-btn').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openImagePopup(this._name, this._link)
    });
 }
}
