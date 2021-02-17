import { REGISTER_USER } from "../actionTypes";

const initialState = {
    user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {...state, user: action.payload};
    default:
      return state;
  }
};

export default reducer;
