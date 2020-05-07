const DIALOG_ACTION_OPEN = "DIALOG_ACTION_OPEN";
const DIALOG_ACTION_CLOSE = "DIALOG_ACTION_CLOSE";

export const DIALOG_LOGIN = "login";
export const DIALOG_REGISTER = "register";
export const DIALOG_TICKETING = "ticket";

let initialState = {
    loginOpen: false,
    registerOpen: false,

    ticketOpen: false,
    ticketData: null
};

export const openDialog = (dialog, data: any = null) => {
    return {
        type: DIALOG_ACTION_OPEN,
        dialog: dialog,
        data: data
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
                newState[action.dialog + "Open"] = true;
                if (action.data != null) {
                    newState[action.dialog + "Data"] = action.data;
                }
                return {...newState};
            }
        case DIALOG_ACTION_CLOSE:
            {
                let newState = state;
                newState[action.dialog + "Open"] = false;
                return {...newState};
            }
    }

    return state;
};
