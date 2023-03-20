export default class Card {
  constructor(card, templateSelector, handleCardClick) {
    this._card = card;
    this._likes = card.likes;
    this._id = card.id;
    this._name = card.name;
    this._link = card.link;
    this._owner = card.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardTitle = this._element.querySelector('.elements__title');
    this._likesCount = this._element.querySelector('.elements__likes-count');
    this._likeButton = this._element.querySelector('.elements__like');
    this._removeButton = this._element.querySelector('.elements__remove');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likesCount.textContent = this._likes.length;

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
    this._removeButton.addEventListener('click', () => this._removeCard());
  }
}
