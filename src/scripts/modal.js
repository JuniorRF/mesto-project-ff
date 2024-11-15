let linkKeyHandler = null;
let linkclickCloseHandler = null;

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  linkKeyHandler = (evt) => keyHandler(evt, popup);
  linkclickCloseHandler = (evt) => clickCloseHandler(evt, popup);
  window.addEventListener('keydown', linkKeyHandler);
  document.addEventListener('click', linkclickCloseHandler);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  finishListening()
}

function finishListening() {
  window.removeEventListener('keydown', linkKeyHandler);
  document.removeEventListener('click', linkclickCloseHandler);
  linkKeyHandler = null;
  linkclickCloseHandler = null;
}

function keyHandler(evt, popup) {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

function clickCloseHandler(evt, popup) {
  const btnClose = evt.target.classList.contains('popup__close');
  const outPopup = evt.target.classList.contains('popup');
  if (btnClose || outPopup) {
    closePopup(popup);
  }
}
