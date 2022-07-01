const page = document.querySelector(".page");

const profileName = page.querySelector(".profile__title");
const profileJob = page.querySelector(".profile__subtitle");

//Кнопки инициации и закрытия попапов
const editProfileButton = page.querySelector(".profile__edit-button");
const addPhotoButton = page.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll('.popup__close-button');
//Попапы
const popup = page.querySelector(".popup");
const popupProfile = page.querySelector(".popup_profile");
const popupPhoto = page.querySelector(".popup_photo_add");
const popupPhotoOpened = page.querySelector(".popup_photo_opened");

// Инпуты, форма и кнопки попапа для профиля
const profileForm = popupProfile.querySelector(".form_profile");
const popupProfileName = popupProfile.querySelector(".form__input_field_username");
const popupProfileJob = popupProfile.querySelector(".form__input_field_job");
const popupProfileCloseBtn = popupProfile.querySelector(".popup__close-button_type_profile");

// Инпуты, форма и кнопки попапа для фотокарточек
const photoForm = popupPhoto.querySelector(".form_photo");
const popupPhotoTitle = popupPhoto.querySelector(".form__input_field_title");
const popupPhotoLink = popupPhoto.querySelector(".form__input_field_photo");

// Rнопки попапа для открытия фотокарточек
const fullPhoto = popupPhotoOpened.querySelector(".popup__big-photo");
const photoSubtitle = popupPhotoOpened.querySelector(".popup__subtitle");

//Открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_is_opened");
}
editProfileButton.addEventListener("click", () => {
  openPopup(popupProfile)});
addPhotoButton.addEventListener("click", () => {
  openPopup(popupPhoto)});

//Закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_is_opened");  
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Функция редактирования имени профиля
function handleProfileFormSubmit (event) {
  event.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileJob.textContent = popupProfileJob.value;

  closePopup(popupProfile);
};

profileForm.addEventListener("submit", handleProfileFormSubmit);

//Фотокарточки

//Сабмит добавления фотокарточки
function handlePhotoFormSubmit (event) {
  event.preventDefault();

  renderCards({name: popupPhotoTitle.value, link: popupPhotoLink.value });
  popupPhotoTitle.value = '';
  popupPhotoLink.value  = '';

  closePopup(popupPhoto);
};

//Лайк фотокарточки
function handleButtonTypeLike (event) {
  event.target.classList.toggle("card__like-button_active");
};

//Удаление фотокарточки
function handleButtonTypeDelete (event) {
  event.target.closest(".card").remove();
}

//Открытие фотокарточки
function openPhotoPopup (event) {
  const target = event.currentTarget;
  const cardTitle = target.parentNode.querySelector('.card__title');
  const cardImage = target.querySelector('.card__image');  
  
  fullPhoto.alt = cardTitle.textContent;
  fullPhoto.src = cardImage.src;
  photoSubtitle.textContent = cardTitle.textContent;
  openPopup(popupPhotoOpened);
};

//Шаблоны
const cardTemplate = page
  .querySelector("#card-template")
  .content.querySelector(".card");
//Контейнер
const initialContainer = page.querySelector(".cards");
//Подгрузка начальных карточек
function createCard(initialItem) {
  const newCard = cardTemplate.cloneNode(true);

  const titleCard = newCard.querySelector(".card__title");
  titleCard.textContent = initialItem.name;

  const imageCard = newCard.querySelector(".card__image");
  imageCard.setAttribute("src", initialItem.link);
  
  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleButtonTypeLike);

  const deleteCard = newCard.querySelector(".card__delete-button");
  deleteCard.addEventListener("click", handleButtonTypeDelete);

  const openedPhoto = newCard.querySelector(".card__pointer");
  openedPhoto.addEventListener("click", (event) => openPhotoPopup(event));

  imageCard.alt = titleCard.textContent;

  return newCard;
};
//Рендер карточки
function renderCards(initialItem) {
  initialContainer.prepend(createCard(initialItem));
}
// Загрузка карточки
initialCards.forEach((initialItem) => {
  renderCards(initialItem);
});

photoForm.addEventListener("submit", handlePhotoFormSubmit);