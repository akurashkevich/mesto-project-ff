const cardTemplate = document.querySelector('#card-template').content;

export function createCard(initialCard, deleteCard) {
    const card = cardTemplate.cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardDeleteButton = card.querySelector('.card__delete-button');

    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    cardTitle.textContent = initialCard.name;

    cardDeleteButton.addEventListener('click', () => {
        const cardToDelete = cardDeleteButton.closest('.places__item');
        deleteCard(cardToDelete);
    });

    return card;
}

export function deleteCard(card) {
    card.remove();
}

export function likeCard(event) {
    if (event.target.classList.contains('card__like-button')) {
        const likeButton = event.target.closest('.card__like-button');
        likeButton.classList.toggle('card__like-button_is-active')
    }
}

