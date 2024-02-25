import { createReducer, createSetValueAction, setValueReducer } from "../../common/redux-helper";
import { FETCH_KEY } from "../../common/redux-helper";
import { NOT_IMMUTABLE } from "../../common/redux-helper";

export const Types = {
    SetValue: 'user/setValue',
    FetchUser: 'user/FetchUser',
    FetchUpdateUser: 'user/FetchUpdateUser',
    FetchUserHistory: 'user/FetchUserHistory',
    AddHistory: 'user/AddHistory',
    Initialize: 'user/Initialize', // 페이지 이동시 유저정보 지우기
};

export const actions = {
    setValue: createSetValueAction(Types.SetValue),
    fetchUser: name => ({ type: Types.FetchUser, name }),
    fetchUpdateUser: ({ user, key, value, fetchKey }) => ({
        type: Types.FetchUpdateUser,
        user,
        key,
        value,
        [FETCH_KEY]: fetchKey
    }),
    fetchUserHistory: name => ({ type: Types.FetchUserHistory, name }),
    addHistory: history => ({ type: Types.AddHistory, history }),
    initialize: history => ({ type: Types.Initialize, [NOT_IMMUTABLE]: true }),
}

const INITIAL_STATE = {
    user: undefined,
    userHistory: [],
};

const reducer = createReducer(INITIAL_STATE, {
    [Types.SetValue]: setValueReducer,
    [Types.AddHistory]: (state, action) =>
        // 수정된 히스토리 추가
        (state.userHistory = [action.history, ...state.userHistory]),
    [Types.Initialize]: () => INITIAL_STATE // 불편객체로 관리 안했을 때는 이렇게만 써주면 됨
    // 이뮤터블하게 관리됐을 때는 아래와 같이 하나씩 작성해줘야 함
    // [Types.Initialize]: () => { 
    //     state.user = undefined,
    //     state.userHistory = [];

    // }
});
export default reducer;