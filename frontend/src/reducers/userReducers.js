import { CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, RESET_CHANGE_PASSWORD, SEND_EMAIL_FAIL, SEND_EMAIL_FOR_OTP_FAIL, SEND_EMAIL_FOR_OTP_REQUEST, SEND_EMAIL_FOR_OTP_SUCCESS, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }

}

export const userDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true };
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
}


export const userListReducer = (state = { userList: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, userList: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const emailReducer = (state = { message: {} }, action) => {
    switch (action.type) {
        case SEND_EMAIL_REQUEST:
            return { loading: true };
        case SEND_EMAIL_SUCCESS:
            return { loading: false, message: action.payload };
        case SEND_EMAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const sendOtpReducer = (state = { status: {} }, action) => {
    switch (action.type) {
        case SEND_EMAIL_FOR_OTP_REQUEST:
            return { loading: true };
        case SEND_EMAIL_FOR_OTP_SUCCESS:
            return { loading: false, status: action.payload };
        case SEND_EMAIL_FOR_OTP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const changePaswordReducer = (state = { changePasswordStatus: {} }, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_REQUEST:
            return { loading: true };
        case CHANGE_PASSWORD_SUCCESS:
            return { loading: false, changePasswordStatus: action.payload };
        case CHANGE_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case RESET_CHANGE_PASSWORD:
            return {};
        default:
            return state;
    }
}