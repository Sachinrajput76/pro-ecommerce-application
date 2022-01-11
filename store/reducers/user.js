import { HYDRATE } from 'next-redux-wrapper';
import { remove } from 'lodash';
import {
  TOGGLE_FAV_PRODUCT,
  SET_USER_LOGGED,
  CHANGE_DETAIL_PIC

} from '../constants/userConstants'
const initialState = {
  user: {
    name: 'Lucas Pulliese',
  },
  favProducts: [],
  variant: "blackVariant"
}


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAV_PRODUCT:
      const index = state.favProducts.includes(action.id);

      if (!index) {
        state.favProducts.push(action.id);

        return {
          ...state,
          favProducts: state.favProducts
        };
      }

      remove(state.favProducts, id => id === action.id);

      return {
        ...state,
        favProducts: state.favProducts
      };



    case CHANGE_DETAIL_PIC:
      let variant = state.variants[action.variant]
      return {
        ...state,
        variant: variant
      };



    case SET_USER_LOGGED:
      const user = action.user;

      if (!index) {
        state.favProducts.push(action.id);

        return {
          ...state,
          favProducts: state.favProducts
        };
      }

      remove(state.favProducts, id => id === action.id);

      return {
        ...state,
        favProducts: state.favProducts
      };

    default:
      return state;
  }
}

export default userReducer;