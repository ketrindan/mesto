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


  _toggleLike() {
    this._likeButton.classList.toggle('elements__like_active');
  }


  _deleteCard() {
    this._element.remove();
    this._element = null;
  }


  _handleImageClick() {
    this._openImagePopup(this._name, this._link);
  }


  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    this._deleteButton .addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
 }


  createCard() {
    this._element = this._getElement();

    this._likeButton = this._element.querySelector('.elements__like');
    this._deleteButton = this._element.querySelector('.elements__delete-btn');
    this._cardImage = this._element.querySelector('.elements__image');

    this._cardImage = this._element.querySelector('.elements__image');
    this._cardTitle = this._element.querySelector('.elements__title');

  	this._cardTitle.textContent = this._name;
  	this._cardImage.src = this._link;
    this._cardImage.alt = `картинка ${this._name}`;;

    this._setEventListeners();

  	return this._element;
  }
}
