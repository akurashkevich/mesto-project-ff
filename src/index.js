import './pages/index.css';

import { initialCards } from './scripts/cards';
import {createCard, deleteCard} from "./scripts/card";
import {closeModal, openModal} from "./scripts/modal";

const placesList = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const editProfileForm = document.forms.editProfile;
const editNameInput = editProfileForm.elements.name;
const editJobInput = editProfileForm.elements.description;

const newCardForm = document.forms.newCard;
const newCardNameInput = newCardForm.elements.name;
const newCardLinkInput = newCardForm.elements.link;

initialCards.forEach(initialCard => {
    const cardElement = createCard(initialCard, deleteCard);
    placesList.append(cardElement);
});

profileEditButton.addEventListener('click', () => {
    openModal(popupEdit);
    editNameInput.value = profileTitle.textContent;
    editJobInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener('click', () => {
    openModal(popupNewCard);
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup__close')) {
        const popup = event.target.closest('.popup');
        if (popup) {
            closeModal(popup);
        }
    }
});

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = editNameInput.value;
    profileDescription.textContent = editJobInput.value;
}
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard({ name: newCardNameInput.value, link: newCardLinkInput.value }, deleteCard);
    placesList.prepend(cardElement);
    closeModal(popupNewCard);
    newCardNameInput.value = '';
    newCardLinkInput.value = '';
}
newCardForm.addEventListener('submit', handleNewCardFormSubmit);