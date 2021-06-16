import { Types } from "../../types/types";

const initialState = {
  loading: false,
  msgError: null
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.uiSetError:
      return {
        ...state,
        msgError: action.payload
      }
    
    case Types.uiRemoveError:
      return {
        ...state,
        msgError: null
      }

    case Types.uiStartLoading:
      return {
        ...state,
        loading: true
      };

    case Types.uiFinishLoading:
      return {
        ...state,
        loading: false
      }

    default:
      return state;
  }
}