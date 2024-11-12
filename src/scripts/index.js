const initialCards = [
  {
    name: "Архыз",
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const btnProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile  = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');

const formProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];

function imageSettings(image, name, link) {
  image.src = link;
  image.alt = name;
  return image
}

function createCard(name, link) {
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

function addCard(card) {
  placesList.prepend(card);
}

initialCards.forEach((item) => {
  addCard(createCard(item.name, item.link));
})

function popupOpen(popup) {
  popup.classList.add('popup_is-opened');
}

function popupEnd() {
  document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    popupEnd();
    window.removeEventListener('keydown', keyHandler);
  }
}

function clickCloseHandler(evt) {
  const btnClose = evt.target.classList.contains('popup__close');
  const outPopup = evt.target.classList.contains('popup');
  if (btnClose || outPopup) {
    popupEnd();
  }
}

function popupClose() {
  window.addEventListener('keydown', keyHandler);
  document.addEventListener('click', clickCloseHandler);
}

btnProfile.addEventListener('click', function(){
  formProfile.name.value = nameProfile.textContent;
  formProfile.description.value = descriptionProfile.textContent;
  popupOpen(document.querySelector('.popup_type_edit'));
  popupClose()
})

btnAddCard.addEventListener('click', function(){
  popupOpen(document.querySelector('.popup_type_new-card'));
  popupClose();
})

function setProfile(name, description) {
  nameProfile.textContent = name;
  descriptionProfile.textContent = description;
}

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const name = formProfile.elements.name.value;
  const description = formProfile.elements.description.value;
  setProfile(name, description);
  popupEnd();
});

formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let name = formNewCard.elements['place-name'].value;
  let link = formNewCard.elements.link.value;
  addCard(createCard(name, link));
  formNewCard.reset();
  popupEnd();
});

placesList.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
})

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
})
