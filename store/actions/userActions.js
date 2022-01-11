
import {
  TOGGLE_FAV_PRODUCT,
  SET_USER_LOGGED,
  CHANGE_DETAIL_PIC, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL

} from '../constants/userConstants'


export const toggleFavProduct = ({ id }) => ({
  type: TOGGLE_FAV_PRODUCT,
  id
})

export const setUserLogged = ({ user }) => ({
  type: SET_USER_LOGGED,
  user
})
export const changeDetailPic = ({ id, variant }) => ({
  type: CHANGE_DETAIL_PIC,
  id,
  variant
})