import {
  imageInPhotoPopup,
  subtitleInPhotoPopup,
  photoPopup,
} from '../utils/constants.js';

import { openPopup } from '../utils/utils.js';

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardTitle = this._element.querySelector('.elements__title');
    this._likeButton = this._element.querySelector('.elements__like');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }

  _togleLike() {
    this._likeButton.classList.toggle('elements__like_active');
  }

  _removeCard() {
    this._element.remove();
  }

  _openImagePopup() {
    imageInPhotoPopup.src = this._link;
    imageInPhotoPopup.alt = this._name;
    subtitleInPhotoPopup.textContent = this._name;
    openPopup(photoPopup);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._togleLike());
    this._cardImage.addEventListener('click', () => this._openImagePopup());

    this._element
      .querySelector('.elements__remove')
      .addEventListener('click', () => this._removeCard());
  }
}
