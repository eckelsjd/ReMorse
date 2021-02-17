import { ADD_FRIEND, REMOVE_FRIEND, REGISTER_USER } from "./actionTypes";

export const addFriend = (id) => ({
  type: ADD_FRIEND,
  payload: { id },
});

export const removeFriend = (id) => ({
  type: REMOVE_FRIEND,
  payload: { id },
});

export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData,
});
