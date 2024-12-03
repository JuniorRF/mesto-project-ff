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

export function startCard() {
    const data = Promise.all([getInfoMe(), getCards()]);

    console.log('User Data:', data);
    return data
}

export function editProfile(name, about) {
  fetch(config.baseUrl + 'users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log('Response data:', data);
    return data
  })
  .catch(error => {
    console.error('Error:', error);
  });
}