import {
  editButton,
  addButton,
  popups,
  editProfilePopup,
  addPhotoPopup,
  editProfileForm,
  nameField,
  jobField,
  currName,
  currJob,
  addPhotoForm,
  titleField,
  urlField,
  cardsContainer,
  initialCards,
  validationConfig,
  cardTemplateSelector,
  cardsContainerSelector,
} from '../utils/constants.js';

import { closePopup, openPopup } from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

editButton.addEventListener('click', () => {
  handleCurrentProfileInfo();
  editProfileFormValidator.hideFormErrors();
  openPopup(editProfilePopup);
});

addButton.addEventListener('click', () => {
  addPhotoForm.reset();
  addPhotoFormValidator.disableSubmitButton();
  addPhotoFormValidator.hideFormErrors();
  openPopup(addPhotoPopup);
});

popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});

const handleCurrentProfileInfo = () => {
  nameField.value = currName.textContent;
  jobField.value = currJob.textContent;
};

const editProfileData = (event) => {
  event.preventDefault();
  currName.textContent = nameField.value;
  currJob.textContent = jobField.value;
  editProfileFormValidator.disableSubmitButton();
  closePopup(editProfilePopup);
};

editProfileForm.addEventListener('submit', editProfileData);

const createCard = (card) =>
  new Card(card, cardTemplateSelector).generateCard();

const addCard = (event) => {
  event.preventDefault();
  const card = { name: titleField.value, link: urlField.value };
  cardsContainer.prepend(createCard(card));
  closePopup(addPhotoPopup);
};

addPhotoForm.addEventListener('submit', addCard);

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => createCard(item),
  },
  cardsContainerSelector
);

cardList.renderItems();

// const renderInitialCards = (cards) => {
//   cards.forEach((card) => {
//     cardsContainer.append(createCard(card));
//   });
// };

// renderInitialCards(initialCards);

const createFormValidator = (form) => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
  return formValidator;
};

const editProfileFormValidator = createFormValidator(editProfileForm);
const addPhotoFormValidator = createFormValidator(addPhotoForm);
