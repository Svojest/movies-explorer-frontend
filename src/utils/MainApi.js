class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _sendRequest(path, options = {}) {
        let optionsWithHeaders = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        };
        optionsWithHeaders = Object.assign(options, optionsWithHeaders);

        return fetch(`${this._baseUrl}/${path}`, optionsWithHeaders)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    // Если ошибка, отклоняем промис
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => console.log(err));
    }
    // Регистрация пользователя
    register(email, name, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, password })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((res) => {
                return res;
            })
    }
    // Авторизация пользователя
    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    return data;
                } else {
                    return Promise.reject(`Ошибка: нет токена`);
                }
            })
    }
    // Проверка токена 
    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then(data => data)
    }
    // Далее функции работы с данными
    getUserInfo() {
        return this._sendRequest('users/me');
    }
    setUserInfo({ email, name }) {
        return this._sendRequest('users/me', {
            method: 'PATCH',
            body: JSON.stringify({
                email: email,
                name: name
            })
        });
    }
    getMovies() {
        return this._sendRequest('movies');
    }
    addMovie(data) {
        return this._sendRequest('movies', {
            method: 'POST',
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: data.image,
                trailerLink: data.trailerLink,
                thumbnail: data.image,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            })
        });
    }
    deleteMovie(id) {
        return this._sendRequest(`movies/${id}`, {
            method: 'DELETE'
        });
    }
}


export const mainApi = new MainApi({
    baseUrl: 'https://api.movies.svojest.nomoredomains.icu'
})