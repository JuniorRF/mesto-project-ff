const cardTemplate = document.querySelector('#card-template').content;

export function createCard(name, link, handleImagePopup, handleLike) {
  const newCard = cardTemplate.querySelector('li').cloneNode(true);
  newCard.querySelector('.card__title').textContent = name;
  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', () => {
    handleImagePopup(link, name);
  });

  newCard.querySelector('.card__delete-button').addEventListener('click',  (evt) => {
    deleteCard(evt.target.parentElement);
  });

  newCard.querySelector('.card__like-button').addEventListener('click', handleLike);

  return newCard;
}

function deleteCard(card) {
  card.remove();
}
