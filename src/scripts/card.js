import { deleteCard as deleteCardAPI, likeCard as likeCardAPI, deleteLikeCard, handlerError } from './api.js';


const cardTemplate = document.querySelector('#card-template').content;

export function getCountLikes(likes) {
  if (Array.isArray(likes)){
    return likes.length
  }
  return 0
};

export function createCard(
  id,
  name,
  link,
  handlerImagePopup,
  countLikes,
  myCard,
  myLike
) {
  const newCard = cardTemplate.querySelector('li').cloneNode(true);
  newCard.setAttribute('data-id', id);
  newCard.querySelector('.card__title').textContent = name;
  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', () => handlerImagePopup(link, name));

  const basketElement = newCard.querySelector('.card__delete-button')
  if (!myCard) {
    basketElement.remove()
  } else {
    basketElement.addEventListener('click', () => deleteCard(id, newCard))
  }

  const likeCard = newCard.querySelector('.card__like-button')
  const likeCount = newCard.querySelector('.count_likes')
  if (myLike) {
    likeCard.classList.add('card__like-button_is-active')
  }
  likeCard.addEventListener('click', () => HandlerLikeCard(id, likeCard, likeCount))
  
  newCard.querySelector('.count_likes').textContent = countLikes;

  return newCard;
}

const HandlerLikeCard = (cardId, likeCard, likeCount) => {
  if (likeCard.classList.contains('card__like-button_is-active')) {
    deleteLikeCard(cardId)
      .then(result => {
        likeCard.classList.remove('card__like-button_is-active')
        likeCount.textContent = getCountLikes(result.likes)
      })
  } else {
    likeCardAPI(cardId)
      .then(result => {
        likeCard.classList.add('card__like-button_is-active')
        likeCount.textContent = getCountLikes(result.likes)
      })
      .catch(handlerError)
  }
}

const deleteCard = (cardId, cardElement) => {
  deleteCardAPI(cardId)
    .then(() => {
      cardElement.remove()
    })
    .catch(handlerError)
}