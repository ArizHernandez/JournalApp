import { uiReducer } from "../../../components/reducers/uiReducer";
import { Types } from "../../../types/types";

describe('Pruebas en el uiReducer', () => {
  const initialState = {
    loading: false,
    msgError: null
  };

  test('Debe de mostrar mensaje de error', () => {
    const reducer = uiReducer(initialState, {
      type: Types.uiSetError,
      payload: 'Mensaje de error'
    });

    expect(reducer.msgError).toBe('Mensaje de error');
  })

  test('Debe de eliminar el mensaje de error', () => {
    const reducer = uiReducer({loading: false, msgError: 'Mensaje de error'}, {
      type: Types.uiRemoveError
    });

    expect(reducer.msgError).toBe(null);
  })
  
  test('Debe de mostrar el estado en loading', () => {
    const reducer = uiReducer(initialState, {
      type: Types.uiStartLoading
    });

    expect(reducer.loading).toBe(true);
  })
  
  test('Debe de cambiar el estado de loading a false', () => {
    const reducer = uiReducer(initialState, {
      type: Types.uiFinishLoading
    });

    expect(reducer.loading).toBe(false);
  })
})
