import { createCard, getCountLikes } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { startPage, editProfile, newCard, changeAvatar, handlerError } from './api.js';

const popups = document.querySelectorAll('.popup');

const btnProfile = document.querySelector('.profile__edit-button');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile  = document.querySelector('.profile__description');
const popupProfile = document.querySelector('.popup_type_edit');
const formProfile = document.forms['edit-profile'];

const imageMe = document.querySelector('.profile__image');
const popupImageProfile = document.querySelector('.popup_image_me');
const formImageProfile = document.forms['image-profile'];

const btnAddCard = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = document.forms['new-place'];

const popupImage = document.querySelector('.popup_type_image');
const popupImageSRC = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

const placesList = document.querySelector('.places__list');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);

function handlerImagePopup(link, name) {
  popupImageSRC.src = link;
  popupImageSRC.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
};

imageMe.addEventListener('click', function(){
  clearValidation(formImageProfile, validationConfig)
  openPopup(popupImageProfile);
});

formImageProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const button = formImageProfile.querySelector('button')
  renderLoading(true, button)
  changeAvatar(formImageProfile.elements.link.value)
  .then(data => {
    imageMe.style.backgroundImage = `url('${data.avatar}')`
    closePopup(popupImageProfile);
  })
  .catch(handlerError)
  .finally(()=>{
    renderLoading(false, button);
    formImageProfile.reset();
  })
});

btnProfile.addEventListener('click', function(){
  formProfile.name.value = nameProfile.textContent;
  formProfile.description.value = descriptionProfile.textContent;
  clearValidation(formProfile, validationConfig)
  openPopup(popupProfile);
});

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const button = formProfile.querySelector('button')
  renderLoading(true, button)
  editProfile(
    formProfile.elements.name.value,
    formProfile.elements.description.value
  )
  .then(data => {
    nameProfile.textContent = data.name;
    descriptionProfile.textContent = data.about;
    closePopup(popupProfile);
  })
  .catch(handlerError)
  .finally(()=>{
    renderLoading(false, button);
  })
});

btnAddCard.addEventListener('click', function(){
  clearValidation(popupNewCard, validationConfig)
  openPopup(popupNewCard);
});

formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const name = formNewCard.elements['place-name'].value;
  const link = formNewCard.elements.link.value;
  const button = formNewCard.querySelector('button')
  renderLoading(true, button)
  newCard(name, link)
    .then(data => {
      addCard(createCard(data._id, data.name, data.link, handlerImagePopup, 0, true, false)); 
      closePopup(popupNewCard);
      formNewCard.reset();
    })
    .catch(handlerError)
    .finally(()=>{
      renderLoading(false, button);
    })
});

function addCard(card) {
  placesList.prepend(card);
};

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

function renderLoading(isLoading, button){
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}

try{(async function start(){
  const [infoMe, cardsData] = await startPage()
  imageMe.style.backgroundImage = `url('${infoMe.avatar}')`
  nameProfile.textContent = infoMe.name;
  descriptionProfile.textContent = infoMe.about;
  cardsData.reverse().forEach((card) => {
    addCard(createCard(
      card._id,
      card.name,
      card.link,
      handlerImagePopup,
      getCountLikes(card.likes),
      infoMe._id === card.owner._id,
      card.likes.some(like => like._id === infoMe._id)
    ))
  })
})()} catch(error) {
  console.log(error)
  alert('Не загрузилась информация, обновите страницу или попробуйте позже.')
}
