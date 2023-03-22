import '../pages/index.css';

import {
  editButton,
  addButton,
  updateAvatar,
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
  updateAvatarPopupSelector,
  deleteCardPopupSelector,
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
  formValidators['edit-profile'].hideFormErrors();
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
});

addButton.addEventListener('click', () => {
  formValidators['add-photo'].hideFormErrors();
  addPhotoPopup.open();
});

updateAvatar.addEventListener('click', () => {
  formValidators['update-avatar'].hideFormErrors();
  popupUpdateAvatar.open();
});

const userInfo = new UserInfo({
  userNameSelector,
  userJobSelector,
  userAvatarSelector,
});

const editProfilePopup = new PopupWithForm(
  editProfilePopupSelector,
  (userData) => {
    formValidators['edit-profile'].disableSubmitButton();
    api
      .updateUserInfo(userData)
      .then((updatedUserInfo) => {
        userInfo.setUserInfo(updatedUserInfo);
        editProfilePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editProfilePopup.renderLoading(false);
        formValidators['edit-profile'].enableSubmitButton();
      });
  }
);
editProfilePopup.setEventListeners();

const addPhotoPopup = new PopupWithForm(addPhotoPopupSelector, (card) => {
  formValidators['add-photo'].disableSubmitButton();
  api
    .addNewCard(card)
    .then((newCard) => {
      cardList.addItem(newCard);
      addPhotoPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      addPhotoPopup.renderLoading(false);
      formValidators['add-photo'].enableSubmitButton();
    });
});
addPhotoPopup.setEventListeners();

const popupWithImage = new PopupWithImage(photoPopupSelector);
popupWithImage.setEventListeners();

const popupDeleteCard = new PopupWithConfirm(
  deleteCardPopupSelector,
  (card) => {
    formValidators['delete-card'].disableSubmitButton();
    api
      .deleteCard(card._id)
      .then(() => {
        card.removeCard();
        popupDeleteCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupDeleteCard.renderLoading(false);
        formValidators['delete-card'].enableSubmitButton();
      });
  }
);
popupDeleteCard.setEventListeners();

const popupUpdateAvatar = new PopupWithForm(
  updateAvatarPopupSelector,
  ({ link }) => {
    formValidators['update-avatar'].disableSubmitButton();
    api
      .updateUserAvatar(link)
      .then((updatedUserData) => {
        userInfo.setUserInfo(updatedUserData);
        popupUpdateAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupUpdateAvatar.renderLoading(false);
        formValidators['update-avatar'].enableSubmitButton();
      });
  }
);
popupUpdateAvatar.setEventListeners();

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
        api
          .deleteLike(cardItem._id)
          .then((updatedCard) => {
            cardItem.updateLikesData(updatedCard);
            cardItem.updateLikesCount();
          })
          .catch((err) => {
            cardItem.toggleLikeDisabled();
            console.log(err);
          });
      } else {
        api
          .addLike(cardItem._id)
          .then((updatedCard) => {
            cardItem.updateLikesData(updatedCard);
            cardItem.updateLikesCount();
          })
          .catch((err) => {
            cardItem.toggleLikeDisabled();
            console.log(err);
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
