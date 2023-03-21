export default class Card {
  constructor(
    card,
    templateSelector,
    handleCardClick,
    handleTrashClick,
    handleLikeClick,
    userId
  ) {
    this._userId = userId;
    this._card = card;
    this._likes = card.likes;
    this._id = card._id;
    this._name = card.name;
    this._link = card.link;
    this._owner = card.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
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

    if (this._owner._id !== this._userId) {
      this._removeButton.classList.add('elements__remove_hidden');
    }

    if (this.isLiked()) {
      this._togleLike();
    }

    return this._element;
  }

  _togleLike() {
    this._likeButton.classList.toggle('elements__like_active');
  }

  removeCard() {
    this._element.remove();
  }

  updateLikesData(updatedCard) {
    this._likes = updatedCard.likes;
  }

  isLiked() {
    return !!this._likes.find((user) => user._id === this._userId);
  }

  updateLikesCount() {
    this._likesCount.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
      this._togleLike();
    });
    this._cardImage.addEventListener('click', this._handleCardClick);
    this._removeButton.addEventListener('click', this._handleTrashClick);
  }
}
