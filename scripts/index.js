// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link) {
  const newCard = cardTemplate.querySelector('li').cloneNode(true);
  newCard.querySelector('.card__title').textContent = name;
  newCard.querySelector('.card__image').src = link;
  newCard.querySelector('.card__image').style.display = 'block';

  newCard.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    deleteCard(evt.target.parentElement);
  });

  return newCard;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
function addCard(card) {
  placesList.append(card);
}

initialCards.forEach((item) => {
  addCard(createCard(item.name, item.link));
})
