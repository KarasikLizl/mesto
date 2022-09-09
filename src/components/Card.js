export default class Card {
  constructor(data, selector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._myId = data.myId;
    this._cardId = data.id;
    this._cardOwner = data.owner._id;
    this._likes = data.likes || [];
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._element = document
      .querySelector(selector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardLikeBtn = this._element.querySelector(".card__like-button");
    this._cardLikeNum = this._element.querySelector(".card__like-number");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardDeleteBtn = this._element.querySelector(".card__delete-button");
    this._cardPointer = this._element.querySelector(".card__pointer");
  }

  //Создание карточки
  generateCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeres();
    this._setLikeIfActive();
    this.setLikesCounter(this._likes.length);
    if (this._cardOwner !== this._myId) {
			this._disableDeleteCard();
		}

    return this._element;
  }

  setLikesCounter(counter) {
    this._cardLikeNum.textContent = counter;
  }

  updateLikesNum (likes) {
    this._likes = likes;
  }
  //Если лайки есть
  _setLikeIfActive() {
    const isLiked = this._isLiked();
    if (isLiked) {
      this._cardLikeBtn.classList.add("card__like-button_active");
    }
}

  //Установщик слушателя
  _setEventListeres() {
    this._cardLikeBtn.addEventListener("click", () => this._handleCardLike());
    this._cardDeleteBtn.addEventListener("click", () =>
      this._handleCardDelete()
    );
    this._cardPointer.addEventListener("click", () => this._handleCardOpen());
  }
  //Слушатели
  _handleCardLike() {
    this._cardLikeBtn.classList.toggle("card__like-button_active");
    this._handleLikeClick(this._cardId, this._isLiked());
  }

  _isLiked() {
		return this._likes.some(user => {
			return user._id === this._myId;
		});
	}

  _handleCardDelete() {
    this._handleDeleteClick(this._cardId);
  }

  _handleCardOpen() {
    this._handleCardClick(this._name, this._link);
  }

  _disableDeleteCard() {
    this._cardDeleteBtn.classList.add("card__delete-button_disabled");
  }
}
