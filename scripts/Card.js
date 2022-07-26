export default class Card {
  constructor(data, selector, openPhotoPopup ) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._openPhotoPopup  = openPhotoPopup;
  }

  //Возвращение разметки
  _getTemplateElement() {
    const cardTemplate = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  //Создание карточки
  generateCard() {
    this._element = this._getTemplateElement();
    this._setEventListeres();

    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").alt = this._element.textContent;
    this._element.querySelector(".card__image").src = this._link;

    return this._element;
  }

  //Установщик слушателя
  _setEventListeres() {
    //Лайки
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleCardLike());
    //Корзинка
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleCardDelete());

    //Открыть
    this._element
      .querySelector(".card__pointer")
      .addEventListener("click", () => this._handleCardOpen());
    //Закрыть
  }
  //Слушатели
  _handleCardLike() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleCardDelete() {
    this._element
      .querySelector(".card__delete-button")
      .closest(".card")
      .remove();
  }

  _handleCardOpen() {
    this._openPhotoPopup(this._element)  
  }
}
