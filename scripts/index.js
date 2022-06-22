const page = document.querySelector(".page");

const profileName = page.querySelector(".profile__title");
const profileJob = page.querySelector(".profile__subtitle");

//Кнопки инициации попапов
const editProfileButton = page.querySelector(".profile__edit-button");
const addPhotoButton = page.querySelector(".profile__add-button");

//Попапы
const popupProfile = page.querySelector(".popup_profile");
const popupPhoto = page.querySelector(".popup_photo");

// Инпуты, форма и кнопки попапа для профиля
const profileForm = popupProfile.querySelector(".form_profile");
const popupProfileName = popupProfile.querySelector(".form__input_field_username");
const popupProfileJob = popupProfile.querySelector(".form__input_field_job");
const popupProfileCloseBtn = popupProfile.querySelector(".popup__close-button_type_profile");

// Инпуты, форма и кнопки попапа для фотокарточек
const photoForm = popupPhoto.querySelector(".form_photo");
const popupPhotoTitle = popupPhoto.querySelector(".form__input_field_title");
const popupPhotoLink = popupPhoto.querySelector(".form__input_field_photo");
const popupPhotoCloseBtn = popupPhoto.querySelector(".popup__close-button_type_photo");

//Функция открытия popup
function popupOpen(newPopup) {
  const closeBtn = newPopup.querySelector(".popup__close-button");
  closeBtn.addEventListener("click", function (event) {
    event.preventDefault();
    newPopup.classList.toggle("popup_is_opened");
  });
  return newPopup;
}

//Слушатели для открытия попапов
editProfileButton.addEventListener("click", function (event) {
  event.preventDefault();
  popupProfile.classList.toggle("popup_is_opened");
});
popupOpen(popupProfile);

addPhotoButton.addEventListener("click", function (event) {
  event.preventDefault();
  popupPhoto.classList.toggle("popup_is_opened");
});
popupOpen(popupPhoto);

//Функция редактирования имени профиля
function submitProfileHandler (evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileJob.textContent = popupProfileJob.value;

  popupProfile.classList.toggle("popup_is_opened");
};

profileForm.addEventListener("submit", submitProfileHandler);

//Фотокарточки

//Сабмит добавления фотокарточки
function submitPhotoHandler (evt) {
  evt.preventDefault();

  renderCards({name: popupPhotoTitle.value, link: popupPhotoLink.value });
  popupPhotoTitle.value = '';
  popupPhotoLink.value  = '';

  popupPhoto.classList.toggle("popup_is_opened");
};

//Лайк фотокарточки
function likeButton (evt) {
  evt.target.classList.toggle("card__like-button_active");
};

//Удаление фотокарточки

//Увеличение фотокарточки 

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
  titleCard.textContent = initialItem.name;

  const imageCard = newCard.querySelector(".card__image");
  imageCard.setAttribute("src", initialItem.link);
  //Лайки
  const likeButtonCheck = newCard.querySelector(".card__like-button");
  likeButtonCheck.addEventListener("click", likeButton);

  return newCard;
};
//Рендер карточки
function renderCards(initialItem) {
  initialContainer.append(preloadCard(initialItem));
}
// Загрузка карточки
initialCards.forEach((initialItem) => {
  renderCards(initialItem);
});

photoForm.addEventListener('submit', submitPhotoHandler);