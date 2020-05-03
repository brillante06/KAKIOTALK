import { put, takeEvery, call } from 'redux-saga/effects';
import {
  loginRequest,
  getLoginSuccess,
  getLoginFailure,
  LOGIN_REQUEST,
} from 'modules/login/action';
import axios from 'axios';
import request from 'common/request';
import { loginInfo } from 'types/index';

function* getLoginSaga(payload: any) {
  try {
    const response = yield request.getLogin(
      payload.email,
      payload.name,
      payload.googleId,
      payload.googleAccessToken,
    );
    yield put(getLoginSuccess(response.data.data));
  } catch (e) {
    yield put(getLoginFailure(e));
  }
}

export default function* loginSaga() {
  yield takeEvery(LOGIN_REQUEST, getLoginSaga);
}
