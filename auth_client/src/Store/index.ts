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
        first: '',
        last: '',
        name: '',
        email: '',
        password: '',
        verify: '',
        check: false,
        showPassword: true,
        showVerify: true,
        err: [''],
    };

    constructor() {
        makeObservable(this, {
            user: observable,
            setFirst: action,
            setLast: action,
            setEmail: action,
            setPassword: action,
            setVerify: action,
            setCheck: action,
            setShow: action,
            setShowVerify: action,
            errorHandler: action,
            setError: action,
            fetchName: computed,
        });
    }

    async setFirst(first: string) {
        this.user.first = first;
    }

    async setLast(last: string) {
        this.user.last = last;
    }

    async setEmail(email: string) {
        this.user.email = email;
    }

    async setPassword(password: string) {
        this.user.password = password;
    }

    async setVerify(verify: string) {
        this.user.verify = verify;
    }

    async setCheck(check:any) {
        this.user.check = check;
    }

    async setShow() {
        this.user.showPassword = !this.user.showPassword;
    }

    async setShowVerify() {
        this.user.showVerify = !this.user.showVerify;
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
