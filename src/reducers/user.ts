const USER_LOGIN = "USER_LOGIN";
const USER_LOGOUT = "USER_LOGOUT";

let initialState = {
    token: null,
    username: null,
    uid: null
};

export const onUserLogin = (uname, token, uid) => {
    return {
        type: USER_LOGIN,
        data: {
            username: uname,
            token: token,
            uid: uid
        }
    };
}

export const onUserLogout = () => {
    return {
        type: USER_LOGOUT
    };
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            {
                return {
                    username: action.data.username,
                    token: action.data.token,
                    uid: action.data.uid
                }
            }
        case USER_LOGOUT:
            {
                return {
                    token: null,
                    username: null,
                    uid: null
                }
            }
    }

    return state;
};
