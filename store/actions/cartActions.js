import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  EMPTY_CART,
  SET_COUNT
} from '../constants/userConstants'


export const addProduct = ({ thumb, name, price, count, color, size, id }) => ({
  type: 'ADD_PRODUCT',
  name,
  thumb,
  price,
  count,
  color,
  size,
  id
})

export const removeProduct = ({ color, size, id }) => ({
  type: 'REMOVE_PRODUCT',
  color,
  size,
  id
})
export const emptyCart = () => ({
  type: 'EMPTY_CART'
})
export const setCount = ({ color, size, count, id }) => ({
  type: 'SET_COUNT',
  color,
  size,
  count,
  id
})
