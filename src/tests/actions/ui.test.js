import { finishLoading, removeError, setError, startLoading } from "../../actions/ui"
import { Types } from "../../types/types";

describe('Prueba en el ui actions', () => {
 
  test('Todas las acciones deben de funcionar', () => {
    const message = 'Error test'; 
    const setErrorAction = setError(message);
    expect(setErrorAction).toEqual({
      type: Types.uiSetError,
      payload: message
    });

    const removeErrorAction = removeError();
    expect(removeErrorAction).toEqual({
      type: Types.uiRemoveError
    });

    const startLoadingAction = startLoading();
    expect(startLoadingAction).toEqual({
      type: Types.uiStartLoading
    });

    const finishLoadingAction = finishLoading();
    expect(finishLoadingAction).toEqual({
      type: Types.uiFinishLoading
    });
  })
  
})
