const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-49";
export default class Api {
  constructor(options) {
    this._headers = options.headers;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    } else return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkError);
  }

  getUserInfo() {
    return fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkError);
  }

  editUserInfo(data) {
    return fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkError);
  }

  addNewCard(data) {
    return fetch(`${baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkError);
  }

  deleteCard(cardId) {
    return fetch(`${baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkError);
  }

  editAvatar(data) {
    return fetch((`${baseUrl}/users/me/avatar`), {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: this._headers,
    }).then(this._checkError);
  }

  putLike(cardId) {
    return fetch(`${baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkError);
  }

  removeLike(cardId) {
    return fetch(`${baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkError);
  }
}
