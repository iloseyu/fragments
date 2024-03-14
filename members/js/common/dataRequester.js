
/**
 * HTTP 요청을 보내는 비동기 함수.
 * GET 요청일 경우 본문을 포함하지 않으며, FormData 인스턴스가 아닌 경우 요청 헤더에 'Content-Type': 'application/json'을 추가한다.
 * JSON 데이터는 문자열로 변환되어 요청 본문에 포함된다.
 * 요청이 성공하면 응답을 리턴
 *
 * @param {string} method - HTTP 요청 메소드 ('GET', 'POST', 'PUT', 'DELETE' 등).
 * @param {string} url - 요청을 보낼 서버의 URL.
 * @param {FormData|Object|null} data - 서버로 보낼 데이터. FormData 인스턴스이거나, JSON 객체가 될 수 있음.
 * @param {String} csrfToken csrf 토큰
 * @returns {Promise<any|Error>} - 응답 데이터의 Promise 또는 에러 발생 시 Error 객체의 Promise.
 */
const requester = async (method, url, data = null, contentType, xCsrfToken, authorization) => {
	const isFormData = data instanceof FormData;

    const headers = {};

	if(contentType){
	    headers["Content-Type"] = contentType;
	}

	if(xCsrfToken){
	    headers["X-CSRF-TOKEN"] = xCsrfToken;
	}

	if(authorization){
        headers["Authorization"] = authorization;
    }

	let body;

	if (method !== 'GET') {
		body = isFormData ? data : JSON.stringify(data);
	}

	const response = await fetch(url, {
		method: method,
		headers: headers,
		body: method !== 'GET' ? body : undefined
	});

	try {
		return response;
	} catch (error) {
		return new Error(error);
	}
}

/**
 * 서버로부터 데이터를 비동기적으로 GET 방식으로 요청하는 함수.
 * 요청이 성공하면 응답 데이터를 파싱하여 반환하고, 실패하면 Error 객체를 반환한다.
 *
 * @param {URL|string} url - GET 요청을 보낼 서버의 URL.
 * @returns {Promise<any|Error|undefined>} - 응답 데이터 또는 에러 객체의 프라미스.
 */
const get = async url => requester('GET', url);

/**
 * 서버로 데이터를 비동기적으로 POST 방식으로 전송하는 함수.
 * 요청이 성공하면 응답 데이터를 파싱하여 반환하고, 실패하면 Error 객체를 반환한다.
 *
 * @param {string} url - POST 요청을 보낼 서버의 URL.
 * @param {Object|FormData} data - 서버로 보낼 데이터 객체 또는 FormData.
 * @returns {Promise<any|Error|undefined>} - 응답 데이터 또는 에러 객체의 프라미스.
 */
const post = (url, data) => requester('POST', url, data);

/**
 * 서버에 저장된 데이터를 비동기적으로 PUT 방식으로 업데이트하는 함수.
 * 요청이 성공하면 응답 데이터를 파싱하여 반환하고, 실패하면 Error 객체를 반환한다.
 *
 * @param {string} url - PUT 요청을 보낼 서버의 URL.
 * @param {Object|FormData} data - 서버에 업데이트할 데이터 객체 또는 FormData.
 * @returns {Promise<any|Error|undefined>} - 응답 데이터 또는 에러 객체의 프라미스.
 */
const put = (url, data) => requester('PUT', url, data);

/**
 * 서버에 저장된 데이터를 비동기적으로 PATCH 방식으로 업데이트하는 함수.
 * 요청이 성공하면 응답 데이터를 파싱하여 반환하고, 실패하면 Error 객체를 반환한다.
 * @param url
 * @param data
 * @returns {Promise<*|Error>}
 */
const patch = (url, data) => requester('PATCH', url, data);

/**
 * 서버에서 데이터를 비동기적으로 DELETE 방식으로 삭제하는 함수.
 * 'DELETE'는 JavaScript에서 예약어이기 때문에 함수 이름으로 사용할 수 없으므로 'remove'를 사용.
 * 요청이 성공하면 응답 데이터를 파싱하여 반환하고, 실패하면 Error 객체를 반환한다.
 *
 * @param {string} url - DELETE 요청을 보낼 서버의 URL.
 * @param {Object|FormData} data - 서버에서 삭제할 데이터 객체 또는 FormData.
 * @returns {Promise<any|Error|undefined>} - 응답 데이터 또는 에러 객체의 프라미스.
 */
const remove = (url, data) => requester('DELETE', url, data);

const dataRequester = {
	get,
	post,
	put,
	patch,
	remove,
	requester
};

export default dataRequester;