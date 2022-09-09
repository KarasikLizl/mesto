export default class Card {
  constructor(
    data,
    selector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
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
    this._setEventListeners();
    this.updateLikesNum(this._likes, this._likes.length);
    if (this._cardOwner !== this._myId) {
      this._disableDeleteCard();
    }
    this._setLikeIfActive();

    return this._element;
  }

  updateLikesNum(likes, counter) {
    this._likes = likes;
    this._cardLikeNum.textContent = counter;
    this._setLikeIfActive();
  }
  //Если лайки есть
  _setLikeIfActive() {
    const isLiked = this._isLiked();
    if (isLiked) {
      this._cardLikeBtn.classList.add("card__like-button_active");
    } else {
      this._cardLikeBtn.classList.remove("card__like-button_active");
    }
  }

  //Установщик слушателя
  _setEventListeners() {
    this._cardLikeBtn.addEventListener("click", () => this._handleCardLike());
    this._cardDeleteBtn.addEventListener("click", () =>
    this._handleDeleteClick(this._cardId));
    this._cardPointer.addEventListener("click", () => this._handleCardOpen());
  }
  //Слушатели
  _handleCardLike() {
    this._setLikeIfActive()
    this._handleLikeClick(this._cardId, this._isLiked());
  }

  _isLiked() {
    return this._likes.some((user) => {
      return user._id === this._myId;
    });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleCardOpen() {
    this._handleCardClick(this._name, this._link);
  }

  _disableDeleteCard() {
    this._cardDeleteBtn.classList.add("card__delete-button_disabled");
  }
}
