import { createCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { startPage, editProfile, newCard, deleteCard, likeCard, deleteLikeCard, changeAvatar } from './api.js';

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

const handlerError = error => {
  console.error(error)
}

function handlerImagePopup(link, name) {
  popupImageSRC.src = link;
  popupImageSRC.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
};

function handlerLikeCard(evt) {
  const like = evt.target
  const cardId = like.parentElement.parentElement.parentElement.getAttribute('data-id')
  let countLikes = like.parentElement.querySelector('.count_likes')
  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLikeCard(cardId)
      .then(result => {
        like.classList.remove('card__like-button_is-active')
        countLikes.textContent = getCountLikes(result.likes)
      })
  } else {
    likeCard(cardId)
      .then(result => {
        like.classList.add('card__like-button_is-active')
        countLikes.textContent = getCountLikes(result.likes)
      })
      .catch(handlerError)
  }
};

function handlerdeleteCard(evt) {
  deleteCard(evt.target.closest('.card').getAttribute('data-id'))
    .then(() => {
      evt.target.closest('.card').remove()
    })
    .catch(handlerError)
}

imageMe.addEventListener('click', function(){
  // clearValidation(formImageProfile, validationConfig)
  openPopup(popupImageProfile);
});

formImageProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const button = formImageProfile.querySelector('button')
  renderLoading(true, button)
  changeAvatar(formImageProfile.elements.link.value)
  .then(data => {
    imageMe.style.backgroundImage = `url('${data.avatar}')`
  })
  .catch(handlerError)
  .finally(()=>{
    renderLoading(false, button);
    formImageProfile.reset();
    closePopup(popupImageProfile);
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
  })
  .catch(handlerError)
  .finally(()=>{
    renderLoading(false, button);
    closePopup(popupProfile);
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
      addCard(createCard(data.name, data.link, handlerImagePopup, handlerLikeCard, 0, data._id, true, false, handlerdeleteCard));
    })
    .catch(handlerError)
    .finally(()=>{
      renderLoading(false, button);
      formNewCard.reset();
      closePopup(popupNewCard);
    })
});

function addCard(card) {
  placesList.prepend(card);
};

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

function getCountLikes(arr) {
  if (Array.isArray(arr)){
    return arr.length
  }
  return 0
};

function myCard(myId, cardId) {
  return myId === cardId
};

function renderLoading(isLoading, button){
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}

(async function start(){
  let data = await startPage()
  let infoMe = data[0]
  imageMe.style.backgroundImage = `url('${infoMe.avatar}')`
  nameProfile.textContent = infoMe.name;
  descriptionProfile.textContent = infoMe.about;
  let cardsData = data[1]
  cardsData.reverse().forEach((item) => {
    let likes = getCountLikes(item.likes)
    const myCardBool = myCard(infoMe._id, item.owner._id)
    const myLikeBool =  item.likes.some(like => {
      return like._id === infoMe._id
    })
    addCard(createCard(
      item.name,
      item.link,
      handlerImagePopup,
      handlerLikeCard,
      likes,
      item._id,
      myCardBool,
      myLikeBool,
      handlerdeleteCard
    ));
  });
})();
