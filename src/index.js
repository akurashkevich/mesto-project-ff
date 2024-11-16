import './pages/index.css';
import {createCard, deleteCard, likeCard} from "./scripts/card";
import {closeModal, onOverlayClick, openModal} from "./scripts/modal";
import {clearValidation, enableValidation} from "./scripts/validation";
import {addCard, editAvatar, editUserInfo, getInitialCards, getUserInfo} from "./scripts/api";

const placesList = document.querySelector('.places__list');

const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileImageOverlay = document.querySelector('.profile__image-overlay');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const editAvatarCloseButton = popupEditAvatar.querySelector('.popup__close');
const editAvatarForm = document.forms.editProfileImage;
const editAvatarLinkInput = editAvatarForm.elements.link;

const editCloseButton = popupEdit.querySelector('.popup__close');
const editProfileForm = document.forms.editProfile;
const editNameInput = editProfileForm.elements.name;
const editDescriptionInput = editProfileForm.elements.description;

const newCardCloseButton = popupNewCard.querySelector('.popup__close');
const newCardForm = document.forms.newCard;
const newCardNameInput = newCardForm.elements.name;
const newCardLinkInput = newCardForm.elements.link;

const imageCloseButton = popupImage.querySelector('.popup__close');
const image = popupImage.querySelector('.popup__image');
const imageCaption = popupImage.querySelector('.popup__caption');

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cardsData]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url('${userData.avatar}')`;

        cardsData.forEach((cardData) => {
            const cardElement = createCard(cardData, userData._id, deleteCard, likeCard, openPopupImage);
            placesList.append(cardElement);
        })
    })
    .catch((err) => {
        console.log(err);
    });

profileImageOverlay.addEventListener('click', () => {
    clearValidation(popupEditAvatar);
    openModal(popupEditAvatar);
});
enableValidation(popupEditAvatar);

profileEditButton.addEventListener('click', () => {
    openModal(popupEdit);
    editNameInput.value = profileTitle.textContent;
    editDescriptionInput.value = profileDescription.textContent;
    clearValidation(editProfileForm);
});
enableValidation(popupEdit);

profileAddButton.addEventListener('click', () => {
    clearValidation(popupNewCard);
    openModal(popupNewCard);
});
enableValidation(popupNewCard);

function closeButtonListener(button, popup) {
    button.addEventListener('click', () => {
        closeModal(popup);
    });
}

closeButtonListener(editAvatarCloseButton, popupEditAvatar);
closeButtonListener(editCloseButton, popupEdit);
closeButtonListener(newCardCloseButton, popupNewCard);
closeButtonListener(imageCloseButton, popupImage);

popupEditAvatar.addEventListener('mousedown', onOverlayClick);
popupEdit.addEventListener('mousedown', onOverlayClick);
popupNewCard.addEventListener('mousedown', onOverlayClick);
popupImage.addEventListener('mousedown', onOverlayClick);

function handleFormSubmit(evt, submitHandler) {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    submitHandler()
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            submitButton.textContent = initialText;
        });
}

editAvatarForm.addEventListener('submit', (evt) =>
    handleFormSubmit(evt, () =>
        editAvatar(editAvatarLinkInput.value).then((result) => {
            profileImage.style.backgroundImage = `url('${result.avatar}')`;
            closeModal(popupEditAvatar);
            editAvatarForm.reset();
        })
    )
);

editProfileForm.addEventListener('submit', (evt) =>
    handleFormSubmit(evt, () =>
        editUserInfo(editNameInput.value, editDescriptionInput.value).then((userData) => {
            profileTitle.textContent = userData.name;
            profileDescription.textContent = userData.about;
            closeModal(popupEdit);
        })
    )
);

newCardForm.addEventListener('submit', (evt) =>
    handleFormSubmit(evt, () =>
        addCard(newCardNameInput.value, newCardLinkInput.value).then((cardData) => {
            const cardElement = createCard(cardData, cardData.owner._id, deleteCard, likeCard, openPopupImage);
            placesList.prepend(cardElement);
            closeModal(popupNewCard);
            newCardForm.reset();
        })
    )
);

function openPopupImage({link, name}) {
    openModal(popupImage);
    image.setAttribute('src', link);
    image.setAttribute('alt', name);
    imageCaption.textContent = name;
}

