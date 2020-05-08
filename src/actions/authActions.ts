import * as authApi from "../api/authApi";
import {AuthUser} from "../models/AuthUserResponse";

export async function getToken(user: AuthUser) {
    return authApi.login(user)
        .then(res => {
            if (res.ok === false) {
                return {
                    ok: false,
                    username: null,
                    token: null,
                    uid: null
                }
            }

            return {
                ok: true,
                username: user.username,
                token: res.authorization,
                uid: res.uid
            }
        })
        .catch(err => {
            return {
                ok: false,
                username: null,
                token: null,
                uid: null
            }
        })
}