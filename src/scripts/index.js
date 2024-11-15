import { initialCards } from './basecards.js';
import { createCard } from './card.js';
import { openPopup, closePopup } from './modal.js';

const popups = document.querySelectorAll('.popup');

const btnProfile = document.querySelector('.profile__edit-button');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile  = document.querySelector('.profile__description');
const popupProfile = document.querySelector('.popup_type_edit');
const formProfile = document.forms['edit-profile'];

const btnAddCard = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = document.forms['new-place'];

const popupImage = document.querySelector('.popup_type_image');
const popupImageSRC = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const placesList = document.querySelector('.places__list');


function handleImagePopup(link, name) {
  popupImageSRC.src = link;
  popupImageSRC.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImage);
}

function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

btnProfile.addEventListener('click', function(){
  formProfile.name.value = nameProfile.textContent;
  formProfile.description.value = descriptionProfile.textContent;
  openPopup(popupProfile);
})

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  nameProfile.textContent = formProfile.elements.name.value;
  descriptionProfile.textContent = formProfile.elements.description.value;
  closePopup(popupProfile);
});

btnAddCard.addEventListener('click', function(){
  openPopup(popupNewCard);
})

formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const name = formNewCard.elements['place-name'].value;
  const link = formNewCard.elements.link.value;
  addCard(createCard(name, link, handleImagePopup, handleLikeCard));
  formNewCard.reset();
  closePopup(popupNewCard);
});

function addCard(card) {
  placesList.prepend(card);
}

initialCards.forEach((item) => {
  addCard(createCard(item.name, item.link, handleImagePopup, handleLikeCard));
})

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
})
