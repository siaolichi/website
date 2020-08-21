import createDataContext from './createDataContext';

const setLoaded = (dispatch) => async () => {
  dispatch({ type: 'loaded' });
};
const startLoading = (dispatch) => async () => {
  dispatch({ type: 'startLoading' });
};

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case 'loaded':
      return true;
    case 'startLoading':
    default:
      return false;
  }
};

export const { Context, Provider } = createDataContext(
  reducer,
  { setLoaded, startLoading },
  false
);
