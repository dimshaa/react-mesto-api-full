import { credentials } from './constants.js';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._cohortId = options.cohortId;
    this._token = options.token;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      },
      credentials: 'include',
    })
      .then(res => this._handleResponse(res));
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._handleResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
      credentials: 'include',
    })
      .then((res) => this._handleResponse(res));
  }

  uploadCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._handleResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then(res => this._handleResponse(res));
  }

  likeCard(cardId, hasLike) {
    let method;

    if (hasLike) {
      method = 'DELETE';
    } else {
      method = 'PUT';
    }

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then(res => this._handleResponse(res));
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(res => this._handleResponse(res));
  }
}

const api = new Api(credentials);

export default api;
