const page = document.querySelector(".page");

const profileName = page.querySelector(".profile__title");
const profileJob = page.querySelector(".profile__subtitle");

//Кнопки инициации попапов
const editProfileButton = page.querySelector(".profile__edit-button");
const addPhotoButton = page.querySelector(".profile__add-button");

//Попапы
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


//Функция закрытия popup
function popupCloseHandler(newPopup) {
  const closeBtn = newPopup.querySelector(".popup__close-button");
  closeBtn.addEventListener("click", function (event) {
    event.preventDefault();
    newPopup.classList.toggle("popup_is_opened");
  });
  return newPopup;
}
//Функция открытия popup
function popupOpenHandler(button, popupType) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    popupType.classList.toggle("popup_is_opened");
  })
};

popupOpenHandler(editProfileButton, popupProfile);
popupOpenHandler(addPhotoButton, popupPhoto);

popupCloseHandler(popupProfile);
popupCloseHandler(popupPhoto); 

//Функция редактирования имени профиля
function submitProfileHandler (event) {
  event.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileJob.textContent = popupProfileJob.value;

  popupProfile.classList.toggle("popup_is_opened");
};

profileForm.addEventListener("submit", submitProfileHandler);

//Фотокарточки

//Сабмит добавления фотокарточки
function submitPhotoHandler (event) {
  event.preventDefault();

  renderCards({name: popupPhotoTitle.value, link: popupPhotoLink.value });
  popupPhotoTitle.value = '';
  popupPhotoLink.value  = '';

  popupPhoto.classList.toggle("popup_is_opened");
};

//Лайк фотокарточки
function likeButtonHandler (event) {
  event.target.classList.toggle("card__like-button_active");
};

//Удаление фотокарточки
function deleteCardHandler (event) {
  event.target.closest(".card").remove();
}

const photoCloseBtn = popupPhotoOpened.querySelector(".popup__close-button_type_photo");
photoCloseBtn.addEventListener("click", function(event) {
  event.preventDefault();
  popupPhotoOpened.classList.toggle("popup_is_opened");
});

//Открытие фотокарточки
function openPhotoHandler (event) {
  const target = event.currentTarget;
  const cardTitle = target.parentNode.querySelector('.card__title');
  const cardImage = target.querySelector('.card__image');
  const fullPhoto = popupPhotoOpened.querySelector(".popup__big-photo");
  const photoSubtitle = popupPhotoOpened.querySelector(".popup__subtitle");
  
  fullPhoto.alt = cardTitle.textContent;
  fullPhoto.src = cardImage.src;
  photoSubtitle.textContent = cardTitle.textContent;
  popupPhotoOpened.classList.toggle("popup_is_opened");
};

//Шаблоны
const cardTemplate = page
  .querySelector("#card-template")
  .content.querySelector(".card");
//Контейнер
const initialContainer = page.querySelector(".cards");
//Подгрузка начальных карточек
function preloadCard(initialItem) {
  const newCard = cardTemplate.cloneNode(true);

  const titleCard = newCard.querySelector(".card__title");
  titleCard.textContent = initialItem.name;

  const imageCard = newCard.querySelector(".card__image");
  imageCard.setAttribute("src", initialItem.link);
  
  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeButtonHandler);

  const deleteCard = newCard.querySelector(".card__delete-button");
  deleteCard.addEventListener("click", deleteCardHandler);

  const openedPhoto = newCard.querySelector(".card__pointer");
  openedPhoto.addEventListener("click", (event) => openPhotoHandler(event));

  imageCard.alt = titleCard.textContent;

  return newCard;
};
//Рендер карточки
function renderCards(initialItem) {
  initialContainer.prepend(preloadCard(initialItem));
}
// Загрузка карточки
initialCards.forEach((initialItem) => {
  renderCards(initialItem);
});

photoForm.addEventListener("submit", submitPhotoHandler);