import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

import {
  initialContainerSelector,
  profileEditButton,
  photoAddButton,
  popupProfileSelector,
  popupPhotoSelector,
  popupPhotoOpenedSelector,
  formUser,
  formAddPhoto,
  objectValidation
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49",
  headers: {
    authorization: "a3ec4c90-fa20-46bf-aded-3c42f7d71250",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo();
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
		  about: data.about
    });
  })
  .catch((err) => {
    console.log(err);
  });

//попап для редактирования профиля
const popupEditProfile = new PopupWithForm(function (params) {
  userInfo.setUserInfo(params);
  return api.editUserInfo({ 
    name: params.name, 
    about: params.about 
  }).catch((err) => {
      console.log(err);
    });
}, popupProfileSelector);

popupEditProfile.setEventListeners();
profileEditButton.addEventListener("click", () => {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  profileFormValidator.resetValidation();
});

//попап для добавления фото
const popupAddPhoto = new PopupWithForm(function (params) {
  return api.addNewCard({
    name: params.name, 
    link: params.link
  }).then((data)=> {
    const newCard = createCard(data);
    sectionCards.addNewItem(newCard);
  })
  .catch((err) => {
      console.log(err);
    });
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

//Получение списка карточек с добавлением их на страницу
const sectionCards = new Section(
  {
    items: [],
    renderer: (item) => {
      sectionCards.addItems(createCard(item));
    },
  },
  initialContainerSelector
);

api
  .getInitialCards()
  .then((data) => {
    sectionCards.setItems(data);
    sectionCards.renderItems();
  })
  .catch((err) => {
    console.log(err.status);
  });

//Создание карточки
function createCard({ name, link }) {
  const data = {
    name: name,
    link: link,
  };
  const card = new Card(data, "#card-template", openPhoto);
  return card.generateCard();
}

const profileFormValidator = new FormValidator(objectValidation, formUser);
profileFormValidator.enableValidation();
const photoFormValidator = new FormValidator(objectValidation, formAddPhoto);
photoFormValidator.enableValidation();
