import {
    createReducer,
    createSetValueAction,
    setValueReducer,
} from '../../common/redux-helper';

export const Types = {
    SetValue: 'search/SetValue',
    FetchAutoComplete: 'search/FetchAutoComplete', // API 통신
    FetchAllHistory: 'search/FetchAllHistory',
};

export const actions = {
    setValue: createSetValueAction(Types.SetValue),
    fetchAutoComplete: keyword => ({
        type: Types.FetchAutoComplete,
        keyword,
    }),
    fetchAllHistory: () => ({ type: Types.FetchAllHistory }), // 전체 사용자 히스토리 가져오기
    // fetchAllHistory: () => ({ type: Types.FetchAllHistory, [FETCH_PAGE]:0 }),  // 페이지 초기화
};

const INITIAL_STATE = {
    keyword: '',
    autoCompletes: [],
    history: [],
};
const reducer = createReducer(INITIAL_STATE, {
    [Types.SetValue]: setValueReducer,
});
export default reducer;
