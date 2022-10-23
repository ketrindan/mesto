export default class Card {
  constructor(data, selector, userId, handleImageClick, handleDeleteClick, handlePutLike, handleDeleteLike) {
    this._name = data.name;
		this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
		this._selector = selector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this._cardId = data._id;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
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
    if (this._likeButton.classList.contains('elements__like_active')) {
      this._handleDeleteLike(this._cardId);
    } else {
      this._handlePutLike(this._cardId);
    }
  }


  _handleDelete() {
    this._handleDeleteClick(this._cardID);
  }


  _handleImage() {
    this._handleImageClick(this._name, this._link);
  }


  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDelete();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImage();
    });
 }


  likeCard(data) {
    this._likes = data.likes;
    this._cardLikes.textContent = this._likes.length;
    this._likeButton.classList.toggle('elements__like_active');
  }


  deleteCard() {
    this._element.remove();
    this._element = null;
  }


  createCard() {
    this._element = this._getElement();

    this._likeButton = this._element.querySelector('.elements__like');
    this._deleteButton = this._element.querySelector('.elements__delete-btn');
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardLikes = this._element.querySelector('.elements__like-counter');
    this._cardTitle = this._element.querySelector('.elements__title');

  	this._cardTitle.textContent = this._name;
  	this._cardImage.src = this._link;
    this._cardImage.alt = `картинка ${this._name}`;
    this._cardLikes.textContent = this._likes.length;

    if (this._owner._id !== this._userId) {
      this._deleteButton.remove();
    }

    if (this._likes.some((user) => {
      return user._id === this._userId
      })) {
      this._likeButton.classList.add('elements__like_active');
    }

    this._setEventListeners();

  	return this._element;
  }
}

