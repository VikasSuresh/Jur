import axios from 'axios';

import {
    makeObservable, observable, action, computed,
} from 'mobx';

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

class User {
    user = {
        name: '',
        email: '',
        password: '',
        check: false,
        show: true,
        err: [''],
    };

    constructor() {
        makeObservable(this, {
            user: observable,
            setEmail: action,
            setPassword: action,
            setCheck: action,
            setShow: action,
            errorHandler: action,
            setError: action,
            fetchName: computed,
        });
    }

    async setEmail(email: string) {
        this.user.email = email;
    }

    async setPassword(password: string) {
        this.user.password = password;
    }

    async setCheck(check:any) {
        this.user.check = check;
    }

    async setShow() {
        this.user.show = !this.user.show;
    }

    async errorHandler(e:any) {
        if (e.target.value === '') {
            this.user.err = [...this.user.err, e.target.id];
        } else {
            this.user.err = this.user.err.filter((el) => el !== e.target.id);
        }
    }

    async setError(error: string) {
        this.user.err = [...this.user.err, error];
    }

    async signUp(first: string, last: string, email: string, password: string) {
        const { data }: { data: RegisterResponse } = await axios.post(`${process.env.REACT_APP_SERVER_API}/auth/register/`,
            { username: `${first} ${last}`, email, password },
            { withCredentials: true });
        localStorage.setItem('name', JSON.stringify(data.user.username));
        localStorage.setItem('token', JSON.stringify(data.token));
        window.location.href = '/';

        this.user.name = '';
    }

    async signIn(email: string, password: string) {
        const { data }: { data: LoginResponse } = await axios.post(`${process.env.REACT_APP_SERVER_API}/auth/login/`,
            { email, password },
            { withCredentials: true });

        localStorage.setItem('name', JSON.stringify(data.user.username));
        localStorage.setItem('token', JSON.stringify(data.token));
        window.location.href = '/';

        this.user.name = '';
    }

    async logout() {
        localStorage.clear();
        window.location.href = '/login';

        this.user.name = '';
    }

    get fetchName() {
        let name = localStorage.getItem('name') || '';
        if (name) {
            name = JSON.parse(name);
            name = `${name.split(' ')[0][0]}${name?.split(' ')[1][0]}`;
        }
        this.user.name = name;
        return name;
    }
}

export default new User();
