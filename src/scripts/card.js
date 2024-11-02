const cardTemplate = document.querySelector('#card-template').content;

export function createCard(initialCard, deleteCardCallback = deleteCard, likeCardCallback = likeCard) {
    const card = cardTemplate.cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button');

    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    cardTitle.textContent = initialCard.name;

    cardLikeButton.addEventListener('click', () => {
        likeCardCallback(cardLikeButton);
    })

    cardDeleteButton.addEventListener('click', () => {
        const cardToDelete = cardDeleteButton.closest('.places__item');
        deleteCardCallback(cardToDelete);
    });

    return card;
}

export function deleteCard(card) {
    card.remove();
}

export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active')
}

