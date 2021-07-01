const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(() => {
      onFail('Не удалось получить данные с сервера. Попробуйте ещё раз.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
