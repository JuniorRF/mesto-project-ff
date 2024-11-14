import { initialCards } from './basecards.js';
import { createCard, addCard } from './card.js';
import { openPopup, closePopup, endPopup } from './modal.js';

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

initialCards.forEach((item) => {
  addCard(createCard(item.name, item.link));
})

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
})

btnProfile.addEventListener('click', function(){
  formProfile.name.value = nameProfile.textContent;
  formProfile.description.value = descriptionProfile.textContent;
  openPopup(popupProfile);
  closePopup(popupProfile);
})

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  nameProfile.textContent = formProfile.elements.name.value;
  descriptionProfile.textContent = formProfile.elements.description.value;
  endPopup(popupProfile);
});

btnAddCard.addEventListener('click', function(){
  openPopup(popupNewCard);
  closePopup(popupNewCard);
})

formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const name = formNewCard.elements['place-name'].value;
  const link = formNewCard.elements.link.value;
  addCard(createCard(name, link));
  formNewCard.reset();
  endPopup(popupNewCard);
});

export function openPopupImage(link, name) {
  popupImageSRC.src = link;
  popupImageSRC.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImage);
  closePopup(popupImage);
}
