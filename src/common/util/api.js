import axios from "axios";
import { API_HOST } from "../constant";
import { message } from "antd";

/**
 * // = 는 옵셔널을 뜻함(필수값 아님)
 * @param {object} param
 * @param {'get' | 'post' =} param.method // 메소드는 get이나 post만 가능
 * @param {string} param.url
 * @param {object=} param.params
 * @param {object=} param.data
 * @param {object=} param.totalCount
 */

// API 통신
export function callApi({ method = "get", url, params, data }) {
    return axios({
        url,
        method,
        baseURL: API_HOST,
        params,
        data,
        // 사용자 인증을 위해 토큰을 쿠키로 저장해서 왔다갔다 할텐데 이때 이 옵션을 true로 줘야 동작함
        withCredentials: true,
    })
        .then((response) => {
            // API응답은 항상 resultCode, resultMessage가 있도록 할것.
            const { resultCode, resultMessage, totalCount } = response.data;
            // resultCode가 0보다 작으면 에러
            if (resultCode < 0) {
                message.error(resultMessage);
            }

            // 함수 반환값
            return {
                isSuccess: resultCode === ResultCode.Success, // 성공여부
                data: response.data.data, // 서버에서 내려준 데이터
                resultCode,
                resultMessage,
            };
        })
        .catch(() => {
            return {
                isSuccess: false,
            };
        });
}

export const ResultCode = {
    Success: 0,
};
