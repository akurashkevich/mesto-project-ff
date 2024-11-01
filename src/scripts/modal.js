function onOverlayClick(event) {
    if (event.target === event.currentTarget) {
        closeModal(event.currentTarget);
    }
}

function onEscapeKeyDown(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        if (popup) {
            closeModal(popup);
        }
    }
}

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onEscapeKeyDown);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onEscapeKeyDown);
}