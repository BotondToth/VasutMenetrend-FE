import axios from 'axios';
import {AuthUser, RegisterUser} from "../models/AuthUserResponse";


export const login = (user: AuthUser): Promise<any> => {
    return axios.post<AuthUser>('/login', user).then(res => res.headers).catch(err => { return {ok: false}; });
};

export const register = (user: RegisterUser): Promise<number> => {
    return axios.post<AuthUser>('/register', user).then(res => res.status);
};