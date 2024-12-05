const paternErrorMessage = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"

const showInputError = (obj, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideInputError = (obj, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (obj, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(paternErrorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(obj, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(obj, formElement, inputElement);
  }
};

const setEventListeners = (obj, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(obj, formElement, inputElement);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

export function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(obj, formElement);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(obj.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
}

export function clearValidation(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(validationConfig, form, inputElement);
    inputElement.setCustomValidity('');
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
}

