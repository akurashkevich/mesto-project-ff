import './pages/index.css';

import {initialCards} from './scripts/cards';
import {createCard, deleteCard, likeCard} from "./scripts/card";
import {closeModal, onOverlayClick, openModal} from "./scripts/modal";
import {clearValidation, enableValidation} from "./scripts/validation";

const placesList = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const editCloseButton = popupEdit.querySelector('.popup__close');
const editProfileForm = document.forms.editProfile;
const editNameInput = editProfileForm.elements.name;
const editJobInput = editProfileForm.elements.description;

const newCardCloseButton = popupNewCard.querySelector('.popup__close');
const newCardForm = document.forms.newCard;
const newCardNameInput = newCardForm.elements.name;
const newCardLinkInput = newCardForm.elements.link;

const imageCloseButton = popupImage.querySelector('.popup__close');
const image = popupImage.querySelector('.popup__image');
const imageCaption = popupImage.querySelector('.popup__caption');

initialCards.forEach(initialCard => {
    const cardElement = createCard(initialCard, deleteCard, likeCard, openPopupImage);
    placesList.append(cardElement);
});

profileEditButton.addEventListener('click', () => {
    openModal(popupEdit);
    editNameInput.value = profileTitle.textContent;
    editJobInput.value = profileDescription.textContent;
    enableValidation(popupEdit);
    clearValidation(editProfileForm);
});

profileAddButton.addEventListener('click', () => {
    openModal(popupNewCard);
    enableValidation(popupNewCard);
});

function closeButtonListener(button, popup) {
    button.addEventListener('click', () => {
        closeModal(popup);
    });
}

closeButtonListener(editCloseButton, popupEdit);
closeButtonListener(newCardCloseButton, popupNewCard);
closeButtonListener(imageCloseButton, popupImage);

popupEdit.addEventListener('mousedown', onOverlayClick);
popupNewCard.addEventListener('mousedown', onOverlayClick);
popupImage.addEventListener('mousedown', onOverlayClick);

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = editNameInput.value;
    profileDescription.textContent = editJobInput.value;
    closeModal(popupEdit);
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard({
        name: newCardNameInput.value,
        link: newCardLinkInput.value
    }, deleteCard, likeCard, openPopupImage);
    placesList.prepend(cardElement);
    closeModal(popupNewCard);
    newCardForm.reset();
}

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

function openPopupImage({link, name}) {
    openModal(popupImage);
    image.setAttribute('src', link);
    image.setAttribute('alt', name);
    imageCaption.textContent = name;
}