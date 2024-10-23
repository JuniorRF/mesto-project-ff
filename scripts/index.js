// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('li').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').style.display = 'block';

  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    deleteCard(evt.target.parentElement);
  });

  addCard(cardElement);
}

initialCards.forEach((item) => {
  createCard(item.name, item.link);
})

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
function addCard(card) {
  placesList.append(card);
}
