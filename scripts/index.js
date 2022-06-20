const page = document.querySelector(".page");

const profileName = page.querySelector(".profile__title");
const profileJob = page.querySelector(".profile__subtitle");

//Кнопки инициации попапов
const editProfileButton = page.querySelector(".profile__edit-button");
const addPhotoButton = page.querySelector(".profile__add-button");

//Попапы
const popupProfile = page.querySelector(".popup_profile");
const popupPhoto = page.querySelector(".popup_photo");

// Инпуты и кнопки попапа для профиля
const popupProfileName = popupProfile.querySelector(".form__input_field_username");
const popupProfileJob = popupProfile.querySelector(".form__input_field_job");
const popupProfileSubmitBtn = popupProfile.querySelector(".form__submit-button_type_profile");
const popupProfileCloseBtn = popupProfile.querySelector(".popup__close-button_type_profile");

// Инпуты и кнопки попапа для фотокарточек
const popupPhotoTitle = popupPhoto.querySelector(".form__input_field_title");
const popupPhotoLink = popupPhoto.querySelector(".form__input_field_photo");
const popupPhotoSubmitBtn = popupPhoto.querySelector(".form__submit-button_type_photo");
const popupPhotoCloseBtn = popupPhoto.querySelector(".popup__close-button_type_photo");

//Функция открытия popup
function popupOpen(newPopup) {
  const closeBtn = newPopup.querySelector(".popup__close-button");
  closeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    newPopup.classList.toggle("popup_is_opened");
  });
  return newPopup;
}

//Слушатели событий
editProfileButton.addEventListener('click', function(event) {
  event.preventDefault();
  popupProfile.classList.toggle("popup_is_opened");
})
popupOpen(popupProfile);

addPhotoButton.addEventListener('click', function(event) {
  event.preventDefault();
  popupPhoto.classList.toggle("popup_is_opened");
})
popupOpen(popupPhoto);

//Шаблоны
const cardTemplate = page
  .querySelector("#card-template")
  .content.querySelector(".card");
//Контейнер ДОМ
const initialContainer = page.querySelector(".cards");
//Подгрузка начальных карточек
function preloadCard(initialItem) {
  const newCard = cardTemplate.cloneNode(true);
  const titleCard = newCard.querySelector(".card__title");
  const imageCard = newCard.querySelector(".card__image");
  //Лайки
  const likeButton = newCard
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_active");
    });

  titleCard.textContent = initialItem.name;
  imageCard.setAttribute("src", initialItem.link);

  return newCard;
}
//Рендер карточки
function renderCards(initialItem) {
  initialContainer.append(preloadCard(initialItem));
}
// Загрузка карточки
initialCards.forEach((initialItem) => {
  renderCards(initialItem);
});