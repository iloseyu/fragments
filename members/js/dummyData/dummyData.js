/**
 * @param {URL} url
 * @param {RequestInit} options
 */
export async function fetch(url, options) {
	debugger;
	if (url.pathname.startsWith('/api/body')) {
		return body(url);
	} else if (url.pathname.startsWith('/api/header')) {
		return header();
	}
}

function header() {
	return {
		ok: true,
		json: async () => {
			return {
				data: [
					{ name: '아이디', key: 'id' },
					{ name: '상점 아이디', key: 'shopId' },
					{ name: '타석 아이디', key: 'teeBoxId' },
					{ name: '유저 아이디', key: 'userId' },
					{ name: '시작일시', key: 'startDateTime' },
					{ name: '종료일시', key: 'endDateTime' },
					{ name: '상태', key: 'status' },
					{ name: '삭제여부', key: 'delYn' },
					{ name: '생성일시', key: 'creDate' },
					{ name: '생성유저', key: 'creUser' },
					{ name: '수정일시', key: 'updDate' },
					{ name: '수정유저', key: 'updUser' }
				]
			};
		}
	};
}

function body(url) {
	const pageNum = Number(url.searchParams.get('pageNum'));
	return {
		ok: true,
		status: 200,
		json: async () => {
			dummyBodyData.data.pageNum = pageNum === 0 ? 1 : pageNum;
			return dummyBodyData;
		}
	};
}

const dummyBodyData = {
	"meta": {
		"code": 200,
		"message": "OK",
		"reason": "정상 처리되었습니다."
	},
	"data": {
		"total": 30,
		"list": [
			{
				"userId": 1,
				"teeBoxId": 1,
				"startDateTime": "2024-03-01T09:00:00",
				"endDateTime": "2024-03-01T10:00:00",
				"id": 16,
				"shopId": 1,
				"status": "01",
				"delYn": false,
				"creDate": "2024-02-25T08:32:01",
				"creUser": 1,
				"updDate": "2024-02-25T08:32:01",
				"updUser": 1
			},
			{
				"userId": 1,
				"teeBoxId": 1,
				"startDateTime": "2024-03-01T09:00:00",
				"endDateTime": "2024-03-01T10:00:00",
				"id": 17,
				"shopId": 1,
				"status": "01",
				"delYn": false,
				"creDate": "2024-02-25T08:32:10",
				"creUser": 1,
				"updDate": "2024-02-25T08:32:10",
				"updUser": 1
			},
			{
				"userId": 1,
				"teeBoxId": 1,
				"startDateTime": "2024-03-01T09:00:00",
				"endDateTime": "2024-03-01T10:00:00",
				"id": 18,
				"shopId": 1,
				"status": "01",
				"delYn": false,
				"creDate": "2024-02-25T08:32:17",
				"creUser": 1,
				"updDate": "2024-02-25T08:32:17",
				"updUser": 1
			},
			{
				"userId": 1,
				"teeBoxId": 1,
				"startDateTime": "2024-03-01T09:00:00",
				"endDateTime": "2024-03-01T10:00:00",
				"id": 27,
				"shopId": 1,
				"status": "01",
				"delYn": false,
				"creDate": "2024-02-25T08:32:23",
				"creUser": 1,
				"updDate": "2024-02-25T08:32:23",
				"updUser": 1
			},
			{
				"userId": 1,
				"teeBoxId": 1,
				"startDateTime": "2024-03-01T09:00:00",
				"endDateTime": "2024-03-01T10:00:00",
				"id": 41,
				"shopId": 1,
				"status": "01",
				"delYn": false,
				"creDate": "2024-02-25T08:32:24",
				"creUser": 1,
				"updDate": "2024-02-25T08:32:24",
				"updUser": 1
			},
			{
				"userId": 1,
				"teeBoxId": 1,
				"startDateTime": "2024-03-01T09:00:00",
				"endDateTime": "2024-03-01T10:00:00",
				"id": 55,
				"shopId": 1,
				"status": "01",
				"delYn": false,
				"creDate": "2024-02-25T08:32:25",
				"creUser": 1,
				"updDate": "2024-02-25T08:32:25",
				"updUser": 1
			},
			{
				"userId": 1,
				"teeBoxId": 1,
				"startDateTime": "2024-03-01T09:00:00",
				"endDateTime": "2024-03-01T10:00:00",
				"id": 69,
				"shopId": 1,
				"status": "01",
				"delYn": false,
				"creDate": "2024-02-25T08:32:40",
				"creUser": 1,
				"updDate": "2024-02-25T08:32:40",
				"updUser": 1
			},
			{
				"userId": 1,
				"teeBoxId": 1,
				"startDateTime": "2024-03-01T09:00:00",
				"endDateTime": "2024-03-01T10:00:00",
				"id": 83,
				"shopId": 1,
				"status": "01",
				"delYn": false,
				"creDate": "2024-02-25T08:32:40",
				"creUser": 1,
				"updDate": "2024-02-25T08:32:40",
				"updUser": 1
			},
			{
				"userId": 1,
				"teeBoxId": 1,
				"startDateTime": "2024-03-01T09:00:00",
				"endDateTime": "2024-03-01T10:00:00",
				"id": 97,
				"shopId": 1,
				"status": "01",
				"delYn": false,
				"creDate": "2024-02-25T08:32:41",
				"creUser": 1,
				"updDate": "2024-02-25T08:32:41",
				"updUser": 1
			},
			{
				"userId": 1,
				"teeBoxId": 1,
				"startDateTime": "2024-03-01T09:00:00",
				"endDateTime": "2024-03-01T10:00:00",
				"id": 111,
				"shopId": 1,
				"status": "01",
				"delYn": false,
				"creDate": "2024-02-25T08:32:41",
				"creUser": 1,
				"updDate": "2024-02-25T08:32:41",
				"updUser": 1
			}
		],
		"pageNum": 2,
		"pageSize": 10,
		"size": 10,
		"startRow": 1,
		"endRow": 10,
		"pages": 3,
		"prePage": 0,
		"nextPage": 2,
		"isFirstPage": true,
		"isLastPage": false,
		"hasPreviousPage": false,
		"hasNextPage": true,
		"navigatePages": 8,
		"navigatepageNums": [
			1,
			2,
			3
		],
		"navigateFirstPage": 1,
		"navigateLastPage": 3
	}
};