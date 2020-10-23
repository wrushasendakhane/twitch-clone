import AuthTypes from '../types/AuthTypes';

export const trySignIn = (userId) => ({
  type: AuthTypes.SIGN_IN,
  payload: userId
})

export const trySignOut = () => ({
  type: AuthTypes.SIGN_OUT
})