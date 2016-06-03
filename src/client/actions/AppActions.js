import {ActionConstants} from '../constants';
import AppDispatcher from '../dispatchers/appDispatcher';

export const toggleSidebar = () => {
  return (dispatch) => {
    dispatch({
      type: ActionConstants.TOGGLE_SIDEBAR
    });
  };
};
