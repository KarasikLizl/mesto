import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const page = document.querySelector(".page");

const profileName = page.querySelector(".profile__title");
const profileJob = page.querySelector(".profile__subtitle");
const initialContainer = page.querySelector('.cards');
//Кнопки инициации и закрытия попапов
const editProfileButton = page.querySelector(".profile__edit-button");
const addPhotoButton = page.querySelector(".profile__add-button");
//Клавиши
const escapeKey = 'Escape';

//Попапы
const popupProfile = page.querySelector(".popup_profile");
const popupPhoto = page.querySelector(".popup_photo_add");
const popupPhotoOpened = page.querySelector(".popup_photo_opened");

// Инпуты, форма и кнопки попапа для профиля
const formUser = popupProfile.querySelector(".form_profile");
const popupProfileName = popupProfile.querySelector(".form__input_field_username");
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
  popup.classList.add('popup_is_opened');
  document.addEventListener('keydown', closeOnEsc);
  popup.addEventListener('mousedown', closeOnOverlayClick);
  disableButton(popup);
}

function disableButton() {
    const openedItem = document.querySelector('.popup_is_opened');
    const activeButton = openedItem.querySelector('.form__submit-button')
    if (activeButton) {
      activeButton.classList.add('form__submit-button_invalid');
      activeButton.setAttribute('disabled', true);
    }
}

editProfileButton.addEventListener('click', () => {
  openPopup(popupProfile)});
addPhotoButton.addEventListener('click', () => {
  openPopup(popupPhoto)});

//Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_is_opened');
  document.removeEventListener('keydown', closeOnEsc);
  popup.removeEventListener('mousedown', closeOnOverlayClick);
}

//Закрытие на esc
function closeOnEsc(evt) {  
  if (evt.key === escapeKey) {
    const openedItem = document.querySelector('.popup_is_opened'); 
    closePopup(openedItem)
  }
}

//Закрытие на оверлэй и крестик
function closeOnOverlayClick(evt) { 
  if (!(evt.target.classList.contains('popup__container'))) {
    closePopup(evt.target)
  }    
  if (evt.target.classList.contains('popup__close-button')) {
    const openedItem = document.querySelector('.popup_is_opened');
    closePopup(openedItem);
  }
}

//Функция редактирования имени профиля
function handleProfileFormSubmit () {
  profileName.textContent = popupProfileName.value;
  profileJob.textContent = popupProfileJob.value;
  closePopup(popupProfile);
};

formUser.addEventListener('submit', handleProfileFormSubmit);

//Фотокарточки
//Сабмит добавления фотокарточки
function handlePhotoFormSubmit () {
  renderCard({name: popupPhotoTitle.value, link: popupPhotoLink.value });
  popupPhotoTitle.value = '';
  popupPhotoLink.value  = '';

  closePopup(popupPhoto);
};

//Открытие фотокарточки
export function openPhotoPopup (event) {
  const cardTitle = event.querySelector('.card__title');
  const cardImage = event.querySelector('.card__image');  
  
  fullPhoto.alt = cardTitle.textContent;
  fullPhoto.src = cardImage.src;
  photoSubtitle.textContent = cardTitle.textContent;
  openPopup(popupPhotoOpened);
};

// Загрузка карточки
initialCards.forEach((item) => {
  const card = new Card(item, '#card-template', openPhotoPopup)
  const cardElement = card.generateCard();
  initialContainer.prepend(cardElement);
});

formAddPhoto.addEventListener('submit', handlePhotoFormSubmit);


const enableValidation = {
  inputElement: '.form__input',
  buttonElement: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_invalid',
  inputErrorClass: 'form__input_type_error', 
  errorElement: 'form__input-error_active',
}; 

const profileFormValidator = new FormValidator(enableValidation, formUser);
profileFormValidator.enableValidation();
const photoFormValidator = new FormValidator(enableValidation, formAddPhoto);
photoFormValidator.enableValidation();