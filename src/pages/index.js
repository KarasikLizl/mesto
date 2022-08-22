import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  profileName,
  profileJob,
  initialContainerSelector,
  profileEditButton,
  photoAddButton,
  popupProfileSelector,  
  popupPhotoSelector,  
  popupPhotoOpenedSelector,  
  formUser,
  formAddPhoto,
  fullPhoto,
  enableValidation,
  initialCards
} from "../utils/constants.js";

const userInfo = new UserInfo({ profileName, profileJob });
//попап для редактирования профиля
const popupEditProfile = new PopupWithForm(function (params) {
  userInfo.setUserInfo(params);
}, popupProfileSelector);

popupEditProfile.setEventListeners();
profileEditButton.addEventListener("click", () => {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());

  profileFormValidator.enableValidation();
});

//попап для добавления фото
const popupAddPhoto = new PopupWithForm(function (params) {
  sectionCards.addItem(createCard(params));
}, popupPhotoSelector);

popupAddPhoto.setEventListeners();
photoAddButton.addEventListener("click", () => {
  popupAddPhoto.open();
});

//попап с фото
function openPhoto(name, link) {
  const popupOpenedPhoto = new PopupWithImage(
    {
      src: link,
      alt: name,
    },
    popupPhotoOpenedSelector
  );
  popupOpenedPhoto.setEventListeners();
  popupOpenedPhoto.open();
}

//Создание карточки
function createCard({ name, link }) {
  const data = {
    name: name,
    link: link,
  };
  const card = new Card(data, "#card-template", openPhoto);
  return card.generateCard();
}

const sectionCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      sectionCards.addItem(createCard(item));
    },
  },
  initialContainerSelector
);
sectionCards.renderItems();

const profileFormValidator = new FormValidator(enableValidation, formUser);
const photoFormValidator = new FormValidator(enableValidation, formAddPhoto);
photoFormValidator.enableValidation();
