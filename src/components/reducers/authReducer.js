import { Types } from "../../types/types";
/*
  {
    uid: 321321321,
    name: 'Ariz',
  }
*/

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName
      } 
    case Types.logout:
      return { };
    default:
      return state;
  }
}