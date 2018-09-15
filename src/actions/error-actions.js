import { ERROR_HANDLER } from './types';

export const clearError = () => (dispatch) => {
  dispatch({
    type    : ERROR_HANDLER,
    payload : '',
  });
};

export const emitError = error => (dispatch) => {
  dispatch({
    type    : ERROR_HANDLER,
    payload : error,
  });
};
