import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./initialCards.js";

const page = document.querySelector(".page");

const profileName = page.querySelector(".profile__title");
const profileJob = page.querySelector(".profile__subtitle");
const initialContainer = page.querySelector(".cards");
//Кнопки инициации и закрытия попапов
const profileEditButton = page.querySelector(".profile__edit-button");
const photoAddButton = page.querySelector(".profile__add-button");
//Клавиши
const escapeKey = "Escape";

//Попапы
const popupProfile = page.querySelector(".popup_profile");
const popupPhoto = page.querySelector(".popup_photo_add");
const popupPhotoOpened = page.querySelector(".popup_photo_opened");

// Инпуты, форма и кнопки попапа для профиля
const formUser = popupProfile.querySelector(".form_profile");
const popupProfileName = popupProfile.querySelector(
  ".form__input_field_username"
);
const popupProfileJob = popupProfile.querySelector(".form__input_field_job");

// Инпуты, форма и кнопки попапа для фотокарточек
const formAddPhoto = popupPhoto.querySelector(".form_photo");
const popupPhotoTitle = popupPhoto.querySelector(".form__input_field_title");
const popupPhotoLink = popupPhoto.querySelector(".form__input_field_photo");

// Кнопки попапа для открытия фотокарточек
const fullPhoto = popupPhotoOpened.querySelector(".popup__big-photo");
const photoSubtitle = popupPhotoOpened.querySelector(".popup__subtitle");

//Открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_is_opened");
  document.addEventListener("keydown", closeOnEsc);
  popup.addEventListener("mousedown", closeOnOverlayClick);
}

profileEditButton.addEventListener("click", () => {
  popupProfileName.value = profileName.textContent;
  popupProfileJob.value = profileJob.textContent;
  openPopup(popupProfile);
  profileFormValidator.resetValidation();
});
photoAddButton.addEventListener("click", () => {
  openPopup(popupPhoto);
  photoFormValidator.resetValidation();
});

//Закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_is_opened");
  document.removeEventListener("keydown", closeOnEsc);
  popup.removeEventListener("mousedown", closeOnOverlayClick);
}

//Закрытие на esc
function closeOnEsc(evt) {
  if (evt.key === escapeKey) {
    const openedItem = document.querySelector(".popup_is_opened");
    closePopup(openedItem);
  }
}

//Закрытие на оверлэй и крестик
function closeOnOverlayClick(evt) {
  if (!evt.target.classList.contains("popup__container")) {
    closePopup(evt.target);
  }
  if (evt.target.classList.contains("popup__close-button")) {
    const openedItem = document.querySelector(".popup_is_opened");
    closePopup(openedItem);
  }
}

//Функция редактирования имени профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileJob.textContent = popupProfileJob.value;
  
  closePopup(popupProfile);
}

formUser.addEventListener("submit", handleProfileFormSubmit);

//Фотокарточки
//Сабмит добавления фотокарточки
function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(popupPhotoTitle.value, popupPhotoLink.value);
  initialContainer.prepend(newCard);
  formAddPhoto.reset();

  closePopup(popupPhoto);
}

//Создание карточки
function createCard(title, url) {
  const data = {
    name: title,
    link: url,
  };
  const card = new Card(data, "#card-template", openPhotoPopup);
  return card.generateCard();
}

//Открытие фотокарточки
export function openPhotoPopup(name, link) {
  fullPhoto.setAttribute("src", link);
  fullPhoto.setAttribute("alt", name);
  photoSubtitle.textContent = name.textContent;

  openPopup(popupPhotoOpened);
}

// Загрузка карточки
initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  initialContainer.prepend(card);
});

formAddPhoto.addEventListener("submit", handlePhotoFormSubmit);

const enableValidation = {
  inputElement: ".form__input",
  buttonElement: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_invalid",
  inputErrorClass: "form__input_type_error",
  errorElement: "form__input-error_active",
};

const profileFormValidator = new FormValidator(enableValidation, formUser);
profileFormValidator.enableValidation();

const photoFormValidator = new FormValidator(enableValidation, formAddPhoto);
photoFormValidator.enableValidation();