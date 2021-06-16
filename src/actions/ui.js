import { Types } from "../types/types";

export const setError = (msgError) => ({
  type: Types.uiSetError,
  payload: msgError
})

export const removeError = () => ({
  type: Types.uiRemoveError
})

export const startLoading = () => ({
  type: Types.uiStartLoading
})

export const finishLoading = () => ({
  type: Types.uiFinishLoading
})