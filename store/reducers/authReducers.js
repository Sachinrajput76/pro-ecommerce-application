import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ADMIN_USERS_REQUEST,
    ADMIN_USERS_SUCCESS,
    ADMIN_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,

    CLEAR_ERRORS

} from '../constants/userConstants'


export const authReducer = (state = { user: null }, action) => {
    switch (action.type) {

        case REGISTER_USER_REQUEST:
            return {
                loading: true
            }

        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case REGISTER_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


// Load user reducer
export const loadedUserReducer = (state = { loading: true, user: null }, action) => {
    switch (action.type) {

        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }

        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
