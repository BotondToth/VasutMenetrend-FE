import * as authApi from "../api/authApi";
import {AuthUser} from "../models/AuthUserResponse";

export async function getToken(user: AuthUser) {
    return authApi.login(user)
        .then(res => {
            localStorage.setItem('token', res.authorization);
            return res.status;
        })
}