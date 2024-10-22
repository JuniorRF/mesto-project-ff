// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// const deleteButton = document.querySelector('.card__delete-button')

// @todo: Функция создания карточки
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('li').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').style.display = 'block'

  // выберем кнопку удаления
  const deleteButton = cardTemplate.querySelector('.card__delete-button');

  // добавим обработчик
  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.card');
    listItem.remove();
  });

  // cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
  //   console.log(evt.target)
  //   deleteCard(evt)
  // });

  placesList.append(cardElement);
}

initialCards.forEach((item) => {
  createCard(item.name, item.link);
})

// @todo: Функция удаления карточки
// function deleteCard(card) {
//   card.target.remove()
// }

// добавим обработчик

// @todo: Вывести карточки на страницу
