const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28/',
  headers: {
    authorization: '683f0ca7-4c94-44bb-b57a-83b864273a26',
    'Content-Type': 'application/json'
  }
}

function getInfoMe() {
  return fetch(config.baseUrl + 'users/me', {headers: config.headers})
  .then(res => res.json())
  .then(result => result)
}

function getCards() {
  return fetch(config.baseUrl + 'cards', {headers: config.headers})
  .then(res => res.json())
  .then(result => result)
}

export function startPage() {
    const data = Promise.all([getInfoMe(), getCards()]);
    return data
}

export function editProfile(name, about) {
  return fetch(config.baseUrl + 'users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
}

export function newCard(name, link) {
  return fetch(config.baseUrl + 'cards ', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}

export function deleteCard(id) {
  return fetch(config.baseUrl + 'cards/' + id, {
    method: 'DELETE',
    headers: config.headers,
  })
}

export function likeCard(cardId) {
  return fetch(config.baseUrl + 'cards/likes/' + cardId, {
    method: 'PUT',
    headers: config.headers
  })
}

export function deleteLikeCard(cardId) {
  return fetch(config.baseUrl + 'cards/likes/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  })
}

export function changeAvatar(avatar) {
  return fetch(config.baseUrl + 'users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  })
}