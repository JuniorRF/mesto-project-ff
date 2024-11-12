const initialCards = [
  {
    name: "Архыз",
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');



function createCard(name, link) {
  const newCard = cardTemplate.querySelector('li').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  newCard.querySelector('.card__title').textContent = name;

  newCard.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    deleteCard(evt.target.parentElement);
  });

  return newCard;
}

function deleteCard(card) {
  card.remove();
}

function addCard(card) {
  placesList.append(card);
}

initialCards.forEach((item) => {
  addCard(createCard(item.name, item.link));
})
