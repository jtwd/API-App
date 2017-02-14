import { setCurrentUser } from './auth-actions';
import { SET_CURRENT_USER } from '../../actionTypes';


describe('auth actions: setCurrentUser', () => {

  it('should create an action to set current user', () => {
    const user = 'ehjkwyrhi9y34298y23987489237d39u398eu8fdef03eir093i0i';
    const expectedAction = {
      type: SET_CURRENT_USER,
      user
    }
    expect(setCurrentUser(user)).toEqual(expectedAction)
  });

});
