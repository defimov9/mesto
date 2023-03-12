import '../pages/index.css';

import {
  editButton,
  addButton,
  initialCards,
  validationConfig,
  cardTemplateSelector,
  cardsContainerSelector,
  photoPopupSelector,
  userJobSelector,
  userNameSelector,
  editProfilePopupSelector,
  addPhotoPopupSelector,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

const userInfo = new UserInfo({ userNameSelector, userJobSelector });

const editProfilePopup = new PopupWithForm(
  editProfilePopupSelector,
  (userData) => userInfo.setUserInfo(userData)
);
editProfilePopup.setEventListeners();

const addPhotoPopup = new PopupWithForm(addPhotoPopupSelector, (card) =>
  cardList.addItem(card)
);

addPhotoPopup.setEventListeners();

const popupWithImage = new PopupWithImage(photoPopupSelector);
popupWithImage.setEventListeners();

const createCard = (card) =>
  new Card(card, cardTemplateSelector, () =>
    popupWithImage.open(card)
  ).generateCard();

const cardList = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  cardsContainerSelector
);

cardList.renderItems();

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
