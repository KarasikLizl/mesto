(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._handleCardClic=r,this._element=document.querySelector(n).content.querySelector(".card").cloneNode(!0),this._cardLikeBtn=this._element.querySelector(".card__like-button"),this._cardTitle=this._element.querySelector(".card__title"),this._cardImage=this._element.querySelector(".card__image"),this._cardDeleteBtn=this._element.querySelector(".card__delete-button"),this._cardPointer=this._element.querySelector(".card__pointer")}var n,r;return n=t,(r=[{key:"generateCard",value:function(){return this._cardTitle.textContent=this._name,this._cardImage.src=this._link,this._cardImage.alt=this._name,this._setEventListeres(),this._element}},{key:"_setEventListeres",value:function(){var e=this;this._cardLikeBtn.addEventListener("click",(function(){return e._handleCardLike()})),this._cardDeleteBtn.addEventListener("click",(function(){return e._handleCardDelete()})),this._cardPointer.addEventListener("click",(function(){return e._handleCardOpen()}))}},{key:"_handleCardLike",value:function(){this._cardLikeBtn.classList.toggle("card__like-button_active")}},{key:"_handleCardDelete",value:function(){this._element.remove(),this._element=null}},{key:"_handleCardOpen",value:function(){this._handleCardClic(this._name,this._link)}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._settings=t,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._settings.inputElement)),this._buttonElement=this._formElement.querySelector(this._settings.buttonElement)}var t,r;return t=e,(r=[{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._settings.inputErrorClass),n.textContent=t,n.classList.add(this._settings.errorElement)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._settings.inputErrorClass),t.classList.remove(this._settings.errorElement),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._settings.inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)):(this._buttonElement.classList.remove(this._settings.inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"disableButton",value:function(){this._buttonElement.classList.add("form__submit-button_invalid"),this._buttonElement.setAttribute("disabled",!0)}},{key:"resetValidation",value:function(){var e=this;this.disableButton(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._renderedItems.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupSelector=document.querySelector(t),this._closeButton=this._popupSelector.querySelector(".popup__close-button"),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupSelector.classList.add("popup_is_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupSelector.classList.remove("popup_is_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleCloseBtnClick",value:function(){this.close()}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target.classList.contains("popup_is_opened")&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupSelector.addEventListener("mousedown",(function(t){return e._handleOverlayClose(t)})),this._closeButton.addEventListener("click",(function(t){return e._handleCloseBtnClick(t)}))}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),a=document.querySelector(".profile__title"),l=document.querySelector(".profile__subtitle"),c=document.querySelector(".profile__edit-button"),p=document.querySelector(".profile__add-button"),f=".popup_profile",d=document.querySelector(f),h=".popup_photo_add",y=document.querySelector(h),_=".popup_photo_opened",v=document.querySelector(_),b=d.querySelector(".form_profile"),m=y.querySelector(".form_photo"),k=v.querySelector(".popup__big-photo"),E=v.querySelector(".popup__subtitle"),g={inputElement:".form__input",buttonElement:".form__submit-button",inactiveButtonClass:"form__submit-button_invalid",inputErrorClass:"form__input_type_error",errorElement:"form__input-error_active"};function w(e){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(){return O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=C(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},O.apply(this,arguments)}function C(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}function L(e,t){return L=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},L(e,t)}function j(e,t){if(t&&("object"===w(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}var I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&L(e,t)}(s,e);var t,n,r,o,i=(r=s,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(r);if(o){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return j(this,e)});function s(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),i.call(this,e)}return t=s,(n=[{key:"open",value:function(e){var t=e.src,n=e.alt;this._src=t,this._alt=n,k.setAttribute("src",this._src),k.setAttribute("alt",this._alt),E.textContent=this._alt,O(P(s.prototype),"open",this).call(this)}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),s}(u);function q(e){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q(e)}function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function x(){return x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=R(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},x.apply(this,arguments)}function R(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=D(e)););return e}function T(e,t){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},T(e,t)}function V(e,t){if(t&&("object"===q(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function D(e){return D=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},D(e)}var A=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&T(e,t)}(s,e);var t,n,r,o,i=(r=s,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=D(r);if(o){var n=D(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return V(this,e)});function s(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(n=i.call(this,t))._handleFormSubmit=e,n._popupForm=n._popupSelector.querySelector(".form"),n._popupBtn=n._popupSelector.querySelector(".form__submit-button"),n._inputList=n._popupSelector.querySelectorAll(".form__input"),n}return t=s,(n=[{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){return t.value=e[t.name]}))}},{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){return e[t.name]=t.value})),e}},{key:"close",value:function(){this._popupForm.reset(),x(D(s.prototype),"close",this).call(this)}},{key:"setEventListeners",value:function(){var e=this;this._popupForm.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues()),e.close()})),x(D(s.prototype),"setEventListeners",this).call(this)}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),s}(u);function F(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var U=function(){function e(t){var n=t.profileName,r=t.profileJob;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._title=n,this._subtitle=r}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{title:this._title.textContent,subtitle:this._subtitle.textContent}}},{key:"setUserInfo",value:function(e){var t=e.title,n=e.subtitle;this._title.textContent=t,this._subtitle.textContent=n}}])&&F(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),N=new U({profileName:a,profileJob:l}),J=new A((function(e){N.setUserInfo(e)}),f);J.setEventListeners(),c.addEventListener("click",(function(){J.open(),J.setInputValues(N.getUserInfo()),Q.resetValidation()}));var z=new A((function(e){K.addItem(H(e))}),h);z.setEventListeners(),p.addEventListener("click",(function(){z.open(),W.resetValidation()}));var M=new I(_);function G(e,t){M.open({src:t,alt:e})}function H(e){var n=e.name,r=e.link;return new t({name:n,link:r},"#card-template",G).generateCard()}M.setEventListeners();var K=new i({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){K.addItem(H(e))}},".cards");K.renderItems();var Q=new r(g,b);Q.enableValidation();var W=new r(g,m);W.enableValidation()})();
//# sourceMappingURL=index.js.map