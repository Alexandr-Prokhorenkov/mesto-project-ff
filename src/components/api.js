import {request} from './utils.js'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
  headers: {
    authorization: '88e42ded-a0c1-4cfd-93a6-8390ce177700',
    'Content-Type': 'application/json',
  },
};

const getUser = () => { //функция возвращающая с сервера данные пользователя
  return request(`${config.baseUrl}/users/me`, {headers: config.headers});
}

const getCards = () => { //функция возвращающая с сервера данные карточек
  return request(`${config.baseUrl}/cards`, {headers: config.headers})
}

export const loadData = () => { // Функция инициализирующую наши два запроса к серверу
  return Promise.all([getUser(), getCards()]);
};

export const saveProfileData = (name, description) => { //Функция записи на сервер данных пользователя
  return request(`${config.baseUrl}/users/me`, { // Отправляем запрос на сервер с отредактированными данными профиля
      method: "PATCH", 
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    })
};

export const saveProfileAvatar = (avatarlink) => { //Функция сохранения аватарки на сервере
  return request(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH", 
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarlink,
      }),
    })
  };

export const saveCardToServer = (cardObj) => { //функция сохранения карточки на сервере
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardObj.name,
      link: cardObj.link,
    }),
  })
};

export const deleteCardFromServer = (cardId) => { //функция удаления карточки с сервера
  return request(`${config.baseUrl}/cards/${cardId}`,{
  method: "DELETE",
  headers: config.headers,
  })
}

export const likeCard = (cardId) => { //функция лайка карточки
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
};

export const unlikeCard = (cardId) => { //функция отмены лайка
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
};
