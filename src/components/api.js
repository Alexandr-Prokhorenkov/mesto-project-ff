export const loadData = () => {
  // Создаем промисы для запросов к серверу

  const userPromise = fetch(
    "https://nomoreparties.co/v1/wff-cohort-11/users/me",
    {
      headers: {
        authorization: "88e42ded-a0c1-4cfd-93a6-8390ce177700",
      },
    }
  ).then((res) => res.json());

  const cardsPromise = fetch(
    "https://nomoreparties.co/v1/wff-cohort-11/cards",
    {
      headers: {
        authorization: "88e42ded-a0c1-4cfd-93a6-8390ce177700",
      },
    }
  ).then((res) => res.json());

  // Возвращаем промис с двумя запросами
  return Promise.all([userPromise, cardsPromise]);
};

export const userDate = (userObject, image, description, title) => {
  image.style.backgroundImage = `url('${userObject.avatar}')`;
  description.textContent = userObject.about;
  title.textContent = userObject.name;
};

export const loadingsCards = (
  cardsArray,
  likecallback,
  deleteCallBack,
  openImagecallback,
  containercallback,
  creatcallback,
  callbackId
) => {
  //функция создания карточек
  cardsArray.forEach((element) => {
    if (element.owner._id !== callbackId) {
      const cardItemUsers = creatcallback(
        element,
        null,
        likecallback,
        openImagecallback
      );
      const deleteBtn = cardItemUsers.querySelector(".card__delete-button");
      deleteBtn.style.display = "none";
      containercallback.append(cardItemUsers);
    } else {
      const cardItemMy = creatcallback(
        element,
        deleteCallBack,
        likecallback,
        openImagecallback,
        element._id
      );
      containercallback.append(cardItemMy);
    }
  });
};

function renderCard(
  element,
  deleteCallBack,
  likecallback,
  openImagecallback,
  containercallback,
  createCardcallback
) {
  const cardItemMy = createCardcallback(
    element,
    deleteCallBack,
    likecallback,
    openImagecallback,
    element._id
  );
  containercallback.prepend(cardItemMy);
}

export const saveProfileData = (name, description) => {
  return new Promise((resolve, reject) => {
    fetch("https://nomoreparties.co/v1/wff-cohort-11/users/me", {
      // Отправляем запрос на сервер с отредактированными данными профиля
      method: "PATCH", // Используем метод PATCH для записи данных
      headers: {
        authorization: "88e42ded-a0c1-4cfd-93a6-8390ce177700",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Ошибка сети");
      })
      .then((data) => {
        // Обработка успешного ответа от сервера
        console.log("Данные профиля успешно обновлены:", data);
        resolve(data);
      })
      .catch((error) => {
        // Обработка ошибок
        console.error("Произошла ошибка:", error);
        reject(error);
      });
  });
};

export const saveProfileAvatar = (avatarlink) => {
  return new Promise((resolve, reject) => {
    fetch("https://nomoreparties.co/v1/wff-cohort-11/users/me/avatar", {
      // Отправляем запрос на сервер с отредактированными данными профиля
      method: "PATCH", // Используем метод PATCH для записи данных
      headers: {
        authorization: "88e42ded-a0c1-4cfd-93a6-8390ce177700",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarlink,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Ошибка сети");
      })
      .then((data) => {
        // Обработка успешного ответа от сервера
        console.log("Аватар успешно обновлен:", data);
        resolve(data);
      })
      .catch((error) => {
        // Обработка ошибок
        console.error("Произошла ошибка:", error);
        reject(error);
      });
  });
};

export const saveCardToServer = (
  cardObj,
  deleteCallBack,
  likecallback,
  openImagecallback,
  containercallback,
  createCardcallback
) => {
  return new Promise((resolve, reject) => {
    fetch("https://nomoreparties.co/v1/wff-cohort-11/cards", {
      // Отправляем запрос на сервер с данными новой карточки
      method: "POST",
      headers: {
        Authorization: "88e42ded-a0c1-4cfd-93a6-8390ce177700",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardObj.name,
        link: cardObj.link,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Ошибка сети");
      })
      .then((data) => {
        console.log("Карточка успешно добавлена:", data);
        renderCard(
          data,
          deleteCallBack,
          likecallback,
          openImagecallback,
          containercallback,
          createCardcallback
        );
        resolve(data); // Резолвим промис с данными карточки
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
        reject(error); // Реджектим промис с ошибкой
      });
  });
};

export const deleteCardFromServer = (cardId) => {
  fetch(`https://nomoreparties.co/v1/wff-cohort-11/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: "88e42ded-a0c1-4cfd-93a6-8390ce177700",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Карточка удалена");
      } else {
        console.log("Что то пошло не так", response.status);
      }
    })
    .catch((error) => {
      console.error("Ошибка при выполнении запроса:", error);
    });
};

export function renderLike(cardElement, likesCount) {
  const quantityLikes = cardElement.querySelector(".quantity-likes"); // Находим элемент, отображающий количество лайков
  if (quantityLikes) {
    quantityLikes.textContent = likesCount.toString(); // Обновляем текстовое содержимое элемента с количеством лайков
  }
}

export const likeCard = (cardId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://nomoreparties.co/v1/wff-cohort-11/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        Authorization: "88e42ded-a0c1-4cfd-93a6-8390ce177700",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("like поставлен");
          resolve(response); // Резолвим промис с объектом response
        } else {
          console.log("Что-то пошло не так", response.status);
          reject(response.status); // Реджектим промис с статусом ошибки
        }
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
        reject(error); // Реджектим промис с ошибкой
      });
  });
};

export const unlikeCard = (cardId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://nomoreparties.co/v1/wff-cohort-11/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: "88e42ded-a0c1-4cfd-93a6-8390ce177700",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("like удалён");
          resolve(response); // Резолвим промис с объектом response
        } else {
          console.log("Что-то пошло не так", response.status);
          reject(response.status); // Реджектим промис с статусом ошибки
        }
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
        reject(error); // Реджектим промис с ошибкой
      });
  });
};
