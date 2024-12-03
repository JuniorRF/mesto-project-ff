import { createCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation } from './validation.js';
import { startPage, editProfile, newCard, deleteCard } from './api.js';

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
};

function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

btnProfile.addEventListener('click', function(){
  formProfile.name.value = nameProfile.textContent;
  formProfile.description.value = descriptionProfile.textContent;
  openPopup(popupProfile);
});

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  editProfile(
    formProfile.elements.name.value,
    formProfile.elements.description.value,
  )
    .then(response => {
      return response.json()
    })
    .then(data => {
      nameProfile.textContent = data.name
      descriptionProfile.textContent = data.about
    })
    .catch(error => {
      console.error('Error:', error)
    });
  closePopup(popupProfile);
});

btnAddCard.addEventListener('click', function(){
  openPopup(popupNewCard);
});

formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const name = formNewCard.elements['place-name'].value;
  const link = formNewCard.elements.link.value;
  newCard(name, link)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      addCard(createCard(data.name, data.link, handleImagePopup, handleLikeCard, 0, data.id));
    })
    .catch(error => {
      console.error('Error:', error)
    });
  
  formNewCard.reset();
  closePopup(popupNewCard);
});

function addCard(card) {
  placesList.prepend(card);
};

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function getLikes(arr) {
  if (Array.isArray(arr)){
    return arr.length
  }
  return 0
}

(async function start(){
  let data = await startPage()
  let infoMe = data[0]
  // console.log(infoMe)
  nameProfile.textContent = infoMe.name;
  descriptionProfile.textContent = infoMe.about;
  let cardsData = data[1]
  cardsData.reverse().forEach((item) => {
    console.log(item._id)
    let likes = getLikes(item.likes)
    
    addCard(createCard(item.name, item.link, handleImagePopup, handleLikeCard, likes, item._id));
  });
})()

