export const checkResponse = (res) => { //Функция проверяет ответ от сервера
	if(res.ok) {
		return res.json() //если ответ есть возвращаем промис джкйсон
	}
	else {
		throw new Error("Ошибка сети", res.status); //если нет выбрасываем ошибку
	}
}

  export const request = (url, options) => { // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(checkResponse)
  }

  export const apiErrorHandler = (error) => {
  console.error("Произошла ошибка:", error);
}