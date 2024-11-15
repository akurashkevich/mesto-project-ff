import {deleteCardById, likeCardToggle} from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, profileId, deleteCardCallback, likeCardCallback, openPopupImageCallback) {
    const card = cardTemplate.cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardLikeCounter = card.querySelector('.card__like-count');
    const cardDeleteButton = card.querySelector('.card__delete-button');

    const link = cardData.link;
    const name = cardData.name;
    const likes = cardData.likes.length;
    const cardId = cardData._id;

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    cardLikeCounter.textContent = likes;

    cardImage.addEventListener('click', () => openPopupImageCallback({link, name}));

    const isLiked = cardData.likes.some((like) => like._id === profileId);
    if (isLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    cardLikeButton.addEventListener('click', () => {
        likeCardCallback(cardLikeButton, cardLikeCounter, cardId);
    })

    cardDeleteButton.addEventListener('click', () => {
        deleteCardById(cardData._id)
            .then(() => {
                const cardToDelete = cardDeleteButton.closest('.places__item');
                deleteCardCallback(cardToDelete);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    if (cardData.owner._id !== profileId) {
        cardDeleteButton.classList.add('card__delete-button_inactive');
    }

    return card;
}

export function deleteCard(card) {
    card.remove();
}

export function likeCard(likeButton, likeCounter, cardId) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    likeCardToggle(cardId, isLiked)
        .then((cardData) => {
            likeButton.classList.toggle('card__like-button_is-active')
            likeCounter.textContent = cardData.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}

