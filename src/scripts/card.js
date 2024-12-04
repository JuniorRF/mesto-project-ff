import { deleteCard } from './api.js';


const cardTemplate = document.querySelector('#card-template').content;

export function createCard(name, link, handleImagePopup, handleLike, countLikes, id, myCard, myLike) {
  const newCard = cardTemplate.querySelector('li').cloneNode(true);
  newCard.setAttribute('data-id', id);
  newCard.querySelector('.card__title').textContent = name;
  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', () => {
    handleImagePopup(link, name);
  });

  const basketElement = newCard.querySelector('.card__delete-button')
  if (myCard) {
    basketElement.addEventListener('click',  (evt) => {
      deleteCard(evt.target.parentElement.getAttribute('data-id'))
      evt.target.parentElement.remove()})
  } else {
    basketElement.remove()
  }

  const likeCard = newCard.querySelector('.card__like-button')
  if (myLike) {
    likeCard.classList.add('card__like-button_is-active')
  }
  likeCard.addEventListener('click', handleLike);
  
  newCard.querySelector('.count_likes').textContent = countLikes;

  return newCard;
}

