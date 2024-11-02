const cardTemplate = document.querySelector('#card-template').content;

export function createCard(initialCard, deleteCardCallback, likeCardCallback, openPopupImageCallback) {
    const card = cardTemplate.cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button');

    const link = initialCard.link;
    const name = initialCard.name;

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardImage.addEventListener('click', () => openPopupImageCallback({ link, name }));

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

