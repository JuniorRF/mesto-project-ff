import { openPopupImage } from './index.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

export function createCard(name, link, modal=openPopupImage) {
  const newCard = cardTemplate.querySelector('li').cloneNode(true);
  newCard.querySelector('.card__title').textContent = name;
  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', () => {
    modal(link, name);
  });
  newCard.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    deleteCard(evt.target.parentElement);
  });

  return newCard;
}

function deleteCard(card) {
  card.remove();
}

export function addCard(card) {
  placesList.prepend(card);
}

placesList.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
})