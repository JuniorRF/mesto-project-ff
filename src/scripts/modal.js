import { createCard, addCard } from './card.js';

const btnProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile  = document.querySelector('.profile__description');
const formProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];

export function popupOpen(popup) {
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
  
  export function popupClose() {
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