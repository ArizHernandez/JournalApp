import { Types } from '../../types/types';

describe('Pruebas a test', () => {
  test('Deben de ser el mismo objeto', () => {
    expect(Types).toEqual({
      login :                '[Auth] Login',
      logout:                '[Auth] Logout',
      uiSetError:            '[UI] Set Error',
      uiRemoveError:         '[UI] Remove Error',
      uiStartLoading:        '[UI] Start Loading',
      uiFinishLoading:       '[UI] Finish Loading',
      notesAddNew:           '[Notes] New Note',
      notesActive:           '[Notes] Set Active Note',
      notesLoad:             '[Notes] Load Notes',
      notesUpdated:          '[Notes] Update Note',
      notesFileUrl:          '[Notes] Update Image URL',
      notesDeleted:          '[Notes] Delete Note',
      notesLogoutCleaning:   '[Notes] Clear Notes',
    });
  })
  
})
