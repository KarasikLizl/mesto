export default class Card {
  constructor(data, selector, openPhotoPopup) {
    this._name = data.name;
    this._link = data.link;
    this._openPhotoPopup = openPhotoPopup;
    this._element = document
      .querySelector(selector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardLikeBtn = this._element.querySelector(".card__like-button");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardDeleteBtn = this._element.querySelector(".card__delete-button");
    this._cardPointer = this._element.querySelector(".card__pointer");
  }

  //Создание карточки
  generateCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._setEventListeres();

    return this._element;
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
  }

  _handleCardDelete() {
    this._element.remove();
    this._element = null;
  }

  _handleCardOpen() {
    this._openPhotoPopup(this._name, this._link);
  }
}
