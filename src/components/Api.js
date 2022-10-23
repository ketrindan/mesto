export default class Api {
  constructor (config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }


  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.status))
    })
    .catch((err) => Promise.reject(err))
  }


  getCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.status))
    })
    .catch((err) => Promise.reject(err))
  }


  setUserData(name, job) {
    return fetch(`${this._baseUrl}/users/me`,
      {method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name: name, about: job})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.status))
    })
    .catch((err) => Promise.reject(err))
  }


  addNewCard(place, link) {
    return fetch(`${this._baseUrl}/cards`,
      {method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: place, link: link})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.status))
    })
    .catch((err) => Promise.reject(err))
  }


  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.status))
    })
    .catch((err) => Promise.reject(err))
  }


  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {method: 'PUT',
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.status))
    })
    .catch((err) => Promise.reject(err))
  }


  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.status))
    })
    .catch((err) => Promise.reject(err))
  }


  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`,
    {method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({avatar: avatar})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(res.status))
    })
    .catch((err) => Promise.reject(err))
  }
}

