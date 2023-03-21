import '../pages/index.css';

import {
  editButton,
  addButton,
  initialCards,
  apiConfig,
  validationConfig,
  cardTemplateSelector,
  cardsContainerSelector,
  photoPopupSelector,
  userJobSelector,
  userNameSelector,
  userAvatarSelector,
  editProfilePopupSelector,
  addPhotoPopupSelector,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/popupWithConfirm';

const api = new Api(apiConfig);

let userId;

api
  .getUserData()
  .then((userData) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
  })
  .catch((err) => console.log(err));
api
  .getInitialCards()
  .then((cards) => cardList.renderItems(cards))
  .catch((err) => console.log(err));

editButton.addEventListener('click', () => {
  formValidators['edit-profile'].disableSubmitButton();
  formValidators['edit-profile'].hideFormErrors();
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
});

addButton.addEventListener('click', () => {
  formValidators['add-photo'].disableSubmitButton();
  formValidators['add-photo'].hideFormErrors();
  addPhotoPopup.open();
});

const userInfo = new UserInfo({
  userNameSelector,
  userJobSelector,
  userAvatarSelector,
});

const editProfilePopup = new PopupWithForm(
  editProfilePopupSelector,
  (userData) => {
    api
      .updateUserInfo(userData)
      .then((updatedUserInfo) => userInfo.setUserInfo(updatedUserInfo))
      .catch((err) => console.log(err));
  }
);
editProfilePopup.setEventListeners();

const addPhotoPopup = new PopupWithForm(addPhotoPopupSelector, (card) => {
  api
    .addNewCard(card)
    .then((newCard) => cardList.addItem(newCard))
    .catch((err) => console.log(err));
});
addPhotoPopup.setEventListeners();

const popupWithImage = new PopupWithImage(photoPopupSelector);
popupWithImage.setEventListeners();

const popupDeleteCard = new PopupWithConfirm(
  '.popup_type_delete-card',
  (card) => {
    api
      .deleteCard(card._id)
      .then(() => card.removeCard())
      .catch((err) => console.log(err));
  }
);
popupDeleteCard.setEventListeners();

const createCard = (card) => {
  const cardItem = new Card(
    card,
    cardTemplateSelector,
    () => popupWithImage.open(card),
    () => {
      popupDeleteCard.setCard(cardItem);
      popupDeleteCard.open();
    },
    () => {
      if (cardItem.isLiked()) {
        api.deleteLike(cardItem._id).then((updatedCard) => {
          cardItem.updateLikesData(updatedCard);
          cardItem.updateLikesCount();
        });
      } else {
        api.addLike(cardItem._id).then((updatedCard) => {
          cardItem.updateLikesData(updatedCard);
          cardItem.updateLikesCount();
        });
      }
    },
    userId
  );
  return cardItem.generateCard();
};

const cardList = new Section(createCard, cardsContainerSelector);

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
