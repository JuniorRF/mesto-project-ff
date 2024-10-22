// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
// console.log(initialCards);
const placesList = document.querySelector('.places__list');
// console.log(placesList);


// @todo: Функция создания карточки
function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardElement)
  console.log(cardElement.querySelector('h2'))
  // console.log(cardElement.querySelector('.card__image'))
  // cardElement.querySelector('.card__title').textContent = name;
  // cardElement.querySelector('.card__image').src = link;
  // placesList.append(cardElement);
}

initialCards.forEach((item) => {
  createCard(item.name, item.link);
})

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
