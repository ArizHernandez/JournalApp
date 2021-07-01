import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startUploadFile } from '../../actions/notes';
import { fileUpload } from '../../helpers/fileUpload';
import { Types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    uid: 'TEST12',
    name: 'Test User'
  },
  notes: {
    active: {
      id: 'yq0Y16Gc1WIBFhEte7TA',
      title: 'Test, message',
      body: 'Test, body'
    }
  }
}

let store = mockStore(initialState);

describe('Pruebas en el note action, sin el docblock', () => {
  beforeAll(() => {
    store = mockStore(initialState);
  })

  test('Debe de subir el url de la imagen', async() => {
    fileUpload.mockReturnValueOnce('https://google.com/image.jpg');
    const file = new File([], 'image.png');
    
    await store.dispatch(startUploadFile(file));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: Types.notesUpdated,
      payload: {
        id: 'yq0Y16Gc1WIBFhEte7TA',
        note: {
          id:       'yq0Y16Gc1WIBFhEte7TA',
          title:    'Test, message',
          body:     'Test, body',
          imageUrl: 'https://google.com/image.jpg',
          date:     expect.any(Number)
        }
      }
    });
  })
})