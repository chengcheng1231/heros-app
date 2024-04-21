import { all, put, takeLatest } from 'redux-saga/effects';
import apiClient from '../../shared/api/api.config';
import { IAction } from '../actionTypes';
import {
  FETCH_HEROS_LIST,
  FETCH_HEROS_LIST_ERROR,
  FETCH_HEROS_LIST_SUCCESS,
  FETCH_HERO_PROFILE,
  FETCH_HERO_PROFILE_ERROR,
  FETCH_HERO_PROFILE_SUCCESS,
} from '../actions/heros';

export function* baseSaga(action: IAction) {
  console.log('baseSaga', action);
  try {
    return 'success';
  } catch (error) {}
}

export function* fetchHerosListSaga() {
  const { response, error } = yield apiClient.get('https://hahow-recruit.herokuapp.com/heroes');
  if (response) {
    yield put({ type: FETCH_HEROS_LIST_SUCCESS, payload: response });
  }

  if (error) {
    yield put({ type: FETCH_HEROS_LIST_ERROR, payload: error });
  }
}

export function* fetchHeroProfileSaga(action: IAction) {
  const { heroId } = action.payload;
  const { response, error } = yield apiClient.get(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`);
  if (response) {
    yield put({ type: FETCH_HERO_PROFILE_SUCCESS, payload: response });
  }

  if (error) {
    yield put({ type: FETCH_HERO_PROFILE_ERROR, payload: error });
  }
}

export function* herosSaga() {
  yield all([takeLatest(FETCH_HEROS_LIST, fetchHerosListSaga), takeLatest(FETCH_HERO_PROFILE, fetchHeroProfileSaga)]);
}