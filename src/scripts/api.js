const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: 'ab1dde8a-84f3-4185-b436-cda110a1ec04',
        'Content-Type': 'application/json'
    }
}

const apiRequest = (url, options = {}) => {
    return fetch(`${config.baseUrl}${url}`, {
        headers: config.headers,
        ...options
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const getUserInfo = () => apiRequest('/users/me');

export const getInitialCards = () => apiRequest('/cards');

export const editAvatar = (linkValue) =>
    apiRequest('/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify({avatar: linkValue})
    });

export const editUserInfo = (nameValue, descriptionValue) =>
    apiRequest('/users/me', {
        method: 'PATCH',
        body: JSON.stringify({name: nameValue, about: descriptionValue})
    });

export const addCard = (nameValue, linkValue) =>
    apiRequest('/cards', {
        method: 'POST',
        body: JSON.stringify({name: nameValue, link: linkValue})
    });

export const deleteCardById = (cardId) =>
    apiRequest(`/cards/${cardId}`, {method: 'DELETE'});

export const likeCardToggle = (cardId, isLiked) =>
    apiRequest(`/cards/likes/${cardId}`, {method: isLiked ? 'DELETE' : 'PUT'});