import { ADD_FRIEND, REMOVE_FRIEND } from "./actionTypes";

export const addFriend = (id) => ({
  type: ADD_FRIEND,
  payload: {
    id,
  },
});

export const removeFriend = (id) => ({
  type: REMOVE_FRIEND,
  payload: { id },
});
