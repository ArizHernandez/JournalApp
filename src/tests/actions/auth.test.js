import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLoginEmailPassword, startLogout, startRegisterEmailPasswordName } from '../../actions/auth';
import { Types } from '../../types/types';
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore({});

describe('Pruebas en el auth actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });

  test('Debe de correr las acciones correctamente', () => {
    const {uid, displayName} = { uid: '1234', displayName: 'Ariz' };
    
    const loginAction = login(uid, displayName);
    expect(loginAction).toEqual({
      type: Types.login,
      payload: { uid, displayName }
    });

    const logoutAction = logout();
    expect(logoutAction).toEqual({type: Types.logout});
  })

  test('Debe de hacer el logout corretamente', async() => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({type: Types.logout});
    expect(actions[1]).toEqual({type: Types.notesLogoutCleaning});
  })
  
  test('Debe de hacer el login con email y password', async() => {
    await store.dispatch(startLoginEmailPassword('test@test.com', '123456'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({type: Types.uiStartLoading});
    expect(actions[1]).toEqual({
      type: Types.login,
      payload: {
        uid: 'w5ELE30EnLdCLrHcxniMKqNSxsq2',
        displayName: null
      }
    });
    expect(actions[2]).toEqual({type: Types.uiFinishLoading});
  })
  
  // test('Debe de hacer el register correctamente', async() => {
  //   await store.dispatch(startRegisterEmailPasswordName('test@test.com', '123456', 'test'));
  //   const actions = store.getActions();

  //   expect(actions[0]).toEqual({
  //     type: Types.uiStartLoading
  //   });
  // })
})