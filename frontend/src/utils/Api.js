class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.baseUrlAuth = options.baseUrlAuth
        this.headers = options.headers;
        this.headersAuth = options.headersAuth;
    }


    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    _request(url, options) {
        return fetch(this.baseUrl + url, options).then(this._getResponseData)
    }

    _requestAuth(url, options) {
        return fetch(this.baseUrlAuth + url, options).then(this._getResponseData)
    }

    register(email, password) {
        return this._requestAuth('/signup', {
            method: 'post',
            headers: this.headersAuth,
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
    }

    authorize(email, password) {
        return fetch(`${this.baseUrlAuth}/signin`, {
            method: 'POST',
            headers: this.headersAuth,
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
                return res.json()
            })
    }


    checkToken(jwt) {
        return this._requestAuth('/users/me', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
        })
    }

    getProfileInfo() {
        this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return this._request('/users/me', {
            method: 'GET',
            headers: this.headers,
        })
    }

    setUserInfo(info) {
        return this._request('/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        })
    }

    changeAvatar(info) {
        return this._request('/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: info.avatar
            })
        })
    }

    getInitialCards() {
        return this._request('/cards', {
            method: 'GET',
            headers: this.headers,
        })
    }

    addNewCard(data) {
        return this._request('/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    deleteCard(cardId) {
        return this._request(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
    }

    _addLike(cardId) {
        return this._request(`/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers,
        })
    }

    _removeLike(cardId) {
        return this._request(`/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers,
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this._removeLike(cardId);
        } else { return this._addLike(cardId); }
    }
}

const api = new Api({
    baseUrl: 'https://api.mestothebest.nomoredo.nomoredomains.xyz',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
    baseUrlAuth: 'https://api.mestothebest.nomoredo.nomoredomains.xyz',
    headersAuth: {
        "Content-Type": "application/json"
    }
})



export default api;