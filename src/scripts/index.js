import { initialCards } from './basecards.js';
import { createCard, addCard } from './card.js';
import "./modal.js";

const popups = document.querySelectorAll('.popup');

initialCards.forEach((item) => {
  addCard(createCard(item.name, item.link));
})

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
})
