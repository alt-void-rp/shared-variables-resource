import { createLocalUser } from './user/localUser.js';

let user_autheficated = false;

export function userIsAuth() {
    return user_autheficated;
}

/**
 * 
 * @param {boolean} state 
 */
export function setUserAuthState(state) {
    user_autheficated = state;
}

export const FRONTEND_URL = 'https://resources.void-rp.ru:3000';
export const API_URL = 'https://api.void-rp.ru';

export const localUser = createLocalUser();