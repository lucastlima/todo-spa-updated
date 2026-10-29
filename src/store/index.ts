import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import rootReducer from './reducers';
import type { AppAction, RootState } from './types';

const initialState = (): Partial<RootState> | undefined => {
  if ('todo-spa' in localStorage) {
    const saved = localStorage.getItem('todo-spa');
    return saved ? JSON.parse(saved) : undefined;
  } else {
    return undefined;
  }
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppAction
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppAction>;

const store = createStore(
  rootReducer,
  initialState(),
  composeWithDevTools(applyMiddleware<AppDispatch, RootState>(thunk))
);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
