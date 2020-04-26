const DIALOG_ACTION_OPEN = "DIALOG_ACTION_OPEN";
const DIALOG_ACTION_CLOSE = "DIALOG_ACTION_CLOSE";

export const DIALOG_LOGIN = "loginOpen";
export const DIALOG_REGISTER = "registerOpen";

let initialState = {
    loginOpen: false,
    registerOpen: false
};

export const openDialog = (dialog) => {
    return {
        type: DIALOG_ACTION_OPEN,
        dialog: dialog
    };
}

export const closeDialog = (dialog) => {
    return {
        type: DIALOG_ACTION_CLOSE,
        dialog: dialog
    };
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DIALOG_ACTION_OPEN:
            {
                let newState = state;
                newState[action.dialog] = true;
                return {...newState};
            }
        case DIALOG_ACTION_CLOSE:
            {
                let newState = state;
                newState[action.dialog] = false;
                return {...newState};
            }
    }

    return state;
};
