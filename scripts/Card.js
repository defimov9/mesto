import {
  imageInPhotoPopup,
  subtitleInPhotoPopup,
  photoPopup,
} from './constants.js';

import { openPopup } from './utils.js';

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
    this._setEventListeners();

    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;

    return this._element;
  }

  _togleLike() {
    this._element
      .querySelector('.elements__like')
      .classList.toggle('elements__like_active');
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
    this._element
      .querySelector('.elements__like')
      .addEventListener('click', () => this._togleLike());

    this._element
      .querySelector('.elements__remove')
      .addEventListener('click', () => this._removeCard());

    this._element
      .querySelector('.elements__image')
      .addEventListener('click', () => this._openImagePopup());
  }
}
