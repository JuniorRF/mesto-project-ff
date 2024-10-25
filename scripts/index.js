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
