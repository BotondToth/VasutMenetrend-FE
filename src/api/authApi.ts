import axios from 'axios';
import {AuthUser} from "../models/AuthUserResponse";


export const login = (user: AuthUser): Promise<any> => {
    return axios.post<AuthUser>('/login', user).then(res => res.headers);
};

export const register = (user: AuthUser): Promise<number> => {
    return axios.post<AuthUser>('/register', user).then(res => res.status);
};