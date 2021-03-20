const setToken = (token) => {
    return window.localStorage.setItem('token', token);
}

const getToken = () => {
    return window.localStorage.getItem('token');
}

const removeToken = () => {
    return window.localStorage.removeItem('token');
}

export {setToken, getToken, removeToken};