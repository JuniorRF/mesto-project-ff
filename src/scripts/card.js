import { popupOpen, popupClose } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function imageSettings(image, name, link) {
  image.src = link;
  image.alt = name;
  return image
}

export function createCard(name, link) {
  const newCard = cardTemplate.querySelector('li').cloneNode(true);
  newCard.querySelector('.card__title').textContent = name;
  const cardImage = imageSettings(newCard.querySelector('.card__image'), name, link);

  cardImage.addEventListener('click', function (evt) {
    const popup = document.querySelector('.popup_type_image');
    imageSettings(popup.querySelector('.popup__image'), name, link);
    popup.querySelector('.popup__caption').textContent = name;
    popupOpen(popup);
    popupClose();
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