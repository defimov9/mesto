export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._togleLike());
    this._cardImage.addEventListener('click', this._handleCardClick);

    this._element
      .querySelector('.elements__remove')
      .addEventListener('click', () => this._removeCard());
  }
}
