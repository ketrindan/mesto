import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';


const editButton = document.querySelector('.button_action_edit');
const addButton = document.querySelector('.button_action_add');
const changeAvatarButton = document.querySelector('.profile__edit-avatar');


const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '00a673b9-8570-48a8-8e0e-9115399f6375',
    'Content-Type': 'application/json'
  }
};

const api = new Api(apiConfig);


/* Информация о пользователе */

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');


/* Попап редактирования инфы о пользователе */

const profilePopup = new PopupWithForm('.profile-popup', (inputValueList) => {
  profilePopup.renderLoading(true);
  api.setUserData(inputValueList.name, inputValueList.job)
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    profilePopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    profilePopup.renderLoading(false);
  })
})


/* Попап аватара */

const avatarPopup = new PopupWithForm('.avatar-popup', (inputValueList) => {
  avatarPopup.renderLoading(true);
  api.changeAvatar(inputValueList.avatar)
  .then((data) => {
    userInfo.setAvatar(data.avatar);
    avatarPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    avatarPopup.renderLoading(false);
  })
})


/* Отрисовка карточек */

function createCard(data) {
  const card = new Card(data, '#elements-template', userInfo._id, imagePopup.open.bind(imagePopup),
    () => {
      deletePopup.open();
      deletePopup.setSubmitCallback(() => {
        api.deleteCard(card._cardId)
        .then(() => {
          card.deleteCard();
          deletePopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
      })
    },
    () => {
      api.putLike(card._cardId)
      .then((res) => {
        card.likeCard(res);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    () => {
      api.deleteLike(card._cardId)
      .then((res) => {
        card.likeCard(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  )

	const cardElement = card.createCard();

  return cardElement
}


const cardsList = new Section((card) => cardsList.addItem(createCard(card)), '.elements__container');


/* Попап добавления карточки */

const elementsPopup = new PopupWithForm('.elements-popup', (inputValueList) => {
  elementsPopup.renderLoading(true);
  api.addNewCard(inputValueList.place, inputValueList.link)
  .then((data) => {
    cardsList.addItem(createCard(data));
    elementsPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    elementsPopup.renderLoading(false);
  })
})


const imagePopup = new PopupWithImage('.image-popup');

const deletePopup = new PopupWithConfirmation('.delete-popup')


profilePopup.setEventListeners();

elementsPopup.setEventListeners();

imagePopup.setEventListeners();

avatarPopup.setEventListeners();

deletePopup.setEventListeners();


/* Первоначальная отрисовка */

Promise.all([api.getUserData(), api.getCards()])
.then(([userData, cardsdata])=> {
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setAvatar(userData.avatar);
  userInfo.getId(userData);
  cardsList.renderItems(cardsdata);
})
.catch((err) => {
   console.log(err);
})


/* Обработчики кнопок*/

editButton.addEventListener('click', function () {
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());

  formValidators['profile-form'].setInitialFormState();
});


addButton.addEventListener('click', function () {
  elementsPopup.open();

  formValidators['elements-form'].setInitialFormState();
});


changeAvatarButton.addEventListener('click', function () {
  avatarPopup.open();

  formValidators['avatar-form'].setInitialFormState();
})


/* Валидация */

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.submit-btn',
  inactiveButtonClass: 'submit-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}


const formValidators = {}

const handleValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);

    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;

    validator.enableValidation();
  });
};

handleValidation(validationConfig);
