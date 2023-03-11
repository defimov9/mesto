import '../pages/index.css';

import {
  editButton,
  addButton,
  editProfileForm,
  nameField,
  jobField,
  addPhotoForm,
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
  editProfileFormValidator.hideFormErrors();
  const { name, job } = userInfo.getUserInfo();
  nameField.value = name;
  jobField.value = job;
  editProfilePopup.open();
});

addButton.addEventListener('click', () => {
  addPhotoFormValidator.disableSubmitButton();
  addPhotoFormValidator.hideFormErrors();
  addPhotoPopup.open();
});

const userInfo = new UserInfo({ userNameSelector, userJobSelector });

const editProfilePopup = new PopupWithForm(
  editProfilePopupSelector,
  ({ name, job }) => {
    userInfo.setUserInfo({ name, job });
    editProfileFormValidator.disableSubmitButton();
  }
);
editProfilePopup.setEventListeners();

const addPhotoPopup = new PopupWithForm(
  addPhotoPopupSelector,
  ({ name, link }) => {
    const card = { name, link };
    cardList.addItem(card);
  }
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
    renderer: (item) => createCard(item),
  },
  cardsContainerSelector
);

cardList.renderItems();

const createFormValidator = (form) => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
  return formValidator;
};

const editProfileFormValidator = createFormValidator(editProfileForm);
const addPhotoFormValidator = createFormValidator(addPhotoForm);
