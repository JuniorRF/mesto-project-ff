import { deleteCard } from './api.js';


const cardTemplate = document.querySelector('#card-template').content;

export function createCard(name, link, handleImagePopup, handleLike, countLikes, id) {
  const newCard = cardTemplate.querySelector('li').cloneNode(true);
  newCard.setAttribute('data-id', id);
  newCard.querySelector('.card__title').textContent = name;
  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', () => {
    handleImagePopup(link, name);
  });

  newCard.querySelector('.card__delete-button').addEventListener('click',  (evt) => {
    // deleteCard(evt.target.parentElement);
    // evt.currentTarget.getAttribute('data-id');
    console.log(evt.target.parentElement.getAttribute('data-id'))
    deleteCard(evt.target.parentElement.getAttribute('data-id'))
    evt.target.parentElement.remove()
  });
  newCard.querySelector('.card__like-button').addEventListener('click', handleLike);

  newCard.querySelector('.count_likes').textContent = countLikes;

  return newCard;
}

// deleteCard(card) 
