import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

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
  objectValidation,
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
  profileFormValidator.resetValidation();
});

//попап для добавления фото
const popupAddPhoto = new PopupWithForm(function (params) {
  sectionCards.addItem(createCard(params));
}, popupPhotoSelector);

popupAddPhoto.setEventListeners();
photoAddButton.addEventListener("click", () => {
  popupAddPhoto.open();
  photoFormValidator.resetValidation();
});

//попап с фото
const popupOpenedPhoto = new PopupWithImage(popupPhotoOpenedSelector);
popupOpenedPhoto.setEventListeners();

function openPhoto(name, link) { 
  popupOpenedPhoto.open({
    src: link,
    alt: name,
  });
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

const profileFormValidator = new FormValidator(objectValidation, formUser);
profileFormValidator.enableValidation();
const photoFormValidator = new FormValidator(objectValidation, formAddPhoto);
photoFormValidator.enableValidation();

