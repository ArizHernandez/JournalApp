import { authReducer } from '../../../components/reducers/authReducer';
import { Types } from '../../../types/types';

describe('Pruebas en el authReducer', () => {
  test('Debe de registrar al usuario', () => {
    const reducer = authReducer({},{
      type: Types.login,
      payload: {
        uid: 'VAKJ124V7A7SH3',
        displayName: 'Test'
      }
    });

    expect(reducer).toEqual({uid: 'VAKJ124V7A7SH3', name: "Test"});
  })
  
  test('Debe de hacer el logout del usuario', () => {
    const reducer = authReducer({uid: 'VAKJ124V7A7SH3', name: "Test"},{
      type: Types.logout
    });

    expect(reducer).toEqual({});
  })
  
})
