import { all, put, call, takeEvery, takeLeading } from 'redux-saga/effects';
import { actions, Types } from './index';
import { callApi } from '../../common/util/api';
import { makeFetchSaga } from '../../common/util/fetch';

function* fetchAutoComplete({ keyword }) {
    const { isSuccess, data } = yield call(callApi, {
        url: '/user/search',
        params: { keyword },
    });

    if (isSuccess && data) {
        yield put(actions.setValue('autoCompletes', data));
    }
}

function* fetchAllHistory() {
    const { isSuccess, data } = yield call(callApi, {
        url: '/history',
    });

    if (isSuccess && data) {
        yield put(actions.setValue('history', data));
    }
}

/* function* fetchAllHistory(, page) { // 페이지 번호는 자동으로 하나씩 증가
    const { isSuccess, data } = yield call(callApi, {
        url: '/history',
        params: {page}
    });

    if (isSuccess && data) {
        yield put(actions.setValue('history', data));
    }
} */

export default function* () {
    yield all([
        takeEvery(
            Types.FetchAutoComplete,
            makeFetchSaga({ fetchSaga: fetchAutoComplete, canCache: true }),
        ),
        takeLeading(
            Types.FetchAllHistory,
            makeFetchSaga({ fetchSaga: fetchAllHistory, canCache: false }),
        ),
    ]);
}
