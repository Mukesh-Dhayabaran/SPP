    export const storeUserData = (data) => {
        localStorage.setItem('user',data);
    }

    export const removeUserData = () => {
        localStorage.removeItem('user');
    }

    export const getUserData = () => {
        return localStorage.getItem('user');
    }