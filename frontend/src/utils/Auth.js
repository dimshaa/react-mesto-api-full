import { authData } from "./constants.js";

class Auth {
  constructor({ baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers
  };

  _handleResponse = (res) => {
    return (
      res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}: ${res.statusText}`)
      );
  }

  register = ({ password, email }) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(res => this._handleResponse(res));
  };

  authorize = ({ password, email }) => {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(res => this._handleResponse(res));
  };

  // checkToken = (token) => {
  //   return fetch(`${this._url}/users/me`, {
  //     headers: {
  //       ...this._headers,
  //       'Authorization' : `Bearer ${token}`
  //     }
  //   })
  //   .then(res => this._handleResponse(res));
  // };
}

const auth = new Auth(authData);

export default auth;
