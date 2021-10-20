import axios from 'axios';

interface RegisterResponse {
    username: String
    user: {
        username: String,
        email: String,
    },
    token: String
}

interface LoginResponse {
    detail: String,
    user: {
        username: String,
        email: String,
    },
    token: String
}

export default {
    signUp: async (
        first: string, last: string, email: string, password: string,
    ) => {
        const { data }: { data: RegisterResponse } = await axios.post(`${process.env.REACT_APP_SERVER_API}/auth/register/`,
            { username: `${first} ${last}`, email, password },
            { withCredentials: true });
        localStorage.setItem('name', JSON.stringify(data.user.username));
        localStorage.setItem('token', JSON.stringify(data.token));
        window.location.href = '/';
    },

    signIn: async (
        email: string, password: string,
    ) => {
        const { data }: { data: LoginResponse } = await axios.post(`${process.env.REACT_APP_SERVER_API}/auth/login/`,
            { email, password },
            { withCredentials: true });

        localStorage.setItem('name', JSON.stringify(data.user.username));
        localStorage.setItem('token', JSON.stringify(data.token));
        window.location.href = '/';
    },

    logout: () => {
        localStorage.clear();
        window.location.href = '/login';
    },

    fetchName: () => {
        let name = localStorage.getItem('name') || '';
        if (name) {
            name = JSON.parse(name);
            name = `${name.split(' ')[0][0]}${name?.split(' ')[1][0]}`;
        }
        return name;
    },
};
